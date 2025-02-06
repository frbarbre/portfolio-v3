import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAllPages(parentId = undefined) {
  let allPages = [];
  let cursor = undefined;

  while (true) {
    const response = parentId
      ? await notion.blocks.children.list({
          block_id: parentId,
          start_cursor: cursor,
        })
      : await notion.search({
          filter: { property: 'object', value: 'page' },
          start_cursor: cursor,
        });

    const { results, next_cursor } = response;

    for (const result of results) {
      if (result.type === 'child_page') {
        allPages.push(result);
        // Recursively get subpages
        const subpages = await getAllPages(result.id);
        allPages = allPages.concat(subpages);
      } else if (result.object === 'page') {
        allPages.push(result);
      }
    }

    if (!next_cursor) break;
    cursor = next_cursor;
  }

  return allPages;
}

async function getPageContent(pageId) {
  let allBlocks = [];
  let cursor = undefined;

  async function getBlockContent(blockId) {
    const { results } = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      version: 'latest',
    });

    let content = [];
    for (const block of results) {
      let blockContent = '';

      // Get nested content if it exists
      let hasChildren = block.has_children;
      let childContent = '';
      if (hasChildren) {
        childContent = await getBlockContent(block.id);
      }

      switch (block.type) {
        case 'paragraph':
          blockContent = block.paragraph.rich_text
            .map((text) => text.plain_text)
            .join('');
          break;
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
          blockContent = `${block[block.type].rich_text
            .map((text) => text.plain_text)
            .join('')}\n`;
          break;
        case 'bulleted_list_item':
        case 'numbered_list_item':
          blockContent = `- ${block[block.type].rich_text
            .map((text) => text.plain_text)
            .join('')}`;
          break;
        case 'to_do':
          blockContent = `${block.to_do.checked ? '[x]' : '[ ]'} ${block.to_do.rich_text
            .map((text) => text.plain_text)
            .join('')}`;
          break;
        case 'toggle':
          blockContent = block.toggle.rich_text
            .map((text) => text.plain_text)
            .join('');
          break;
        case 'code':
          blockContent = `\`\`\`${block.code.language}\n${block.code.rich_text
            .map((text) => text.plain_text)
            .join('')}\n\`\`\``;
          break;
        case 'quote':
          blockContent = `> ${block.quote.rich_text
            .map((text) => text.plain_text)
            .join('')}`;
          break;
        case 'divider':
          blockContent = '---';
          break;
        case 'child_page':
          blockContent = `[Subpage: ${block.child_page.title}]`;
          break;
        default:
          blockContent = '';
      }

      if (blockContent) {
        content.push(blockContent);
        if (hasChildren && childContent) {
          // Indent child content
          content.push(
            childContent
              .split('\n')
              .map((line) => `    ${line}`)
              .join('\n'),
          );
        }
      }
    }

    return content.join('\n');
  }

  // Start the recursive process from the main page
  const content = await getBlockContent(pageId);
  return content;
}

function preprocessContent(content) {
  return content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

async function generateEmbedding(text) {
  // Maximum tokens for text-embedding-ada-002 is 8191
  const MAX_TOKENS = 8000; // Using a slightly lower number to be safe
  const APPROX_CHARS_PER_TOKEN = 4; // Rough approximation
  const MAX_CHARS = MAX_TOKENS * APPROX_CHARS_PER_TOKEN;

  if (text.length > MAX_CHARS) {
    console.warn(
      `Content too long (${text.length} chars), truncating to ${MAX_CHARS} chars`,
    );
    text = text.slice(0, MAX_CHARS);
  }

  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

async function storeInSupabase(title, content, embedding) {
  // First check if document with this title exists
  const { data: existingDoc, error: searchError } = await supabase
    .from('documents')
    .select('id')
    .eq('title', title)
    .single();

  if (searchError && searchError.code !== 'PGRST116') {
    // PGRST116 is "not found" error
    console.error('Error searching for existing document:', searchError);
    return;
  }

  if (existingDoc) {
    // Update existing document
    const { error: updateError } = await supabase
      .from('documents')
      .update({ content, embedding })
      .eq('id', existingDoc.id);

    if (updateError) {
      console.error('Error updating document:', updateError);
    } else {
      console.log('Document updated successfully:', title);
    }
  } else {
    // Insert new document
    const { error: insertError } = await supabase
      .from('documents')
      .insert({ title, content, embedding });

    if (insertError) {
      console.error('Error inserting document:', insertError);
    } else {
      console.log('Document added successfully:', title);
    }
  }
}

async function main() {
  try {
    const pages = await getAllPages();
    console.log(`Found ${pages.length} pages (including subpages)`);

    for (const page of pages) {
      const title =
        page.type === 'child_page'
          ? page.child_page.title
          : page.properties.title?.title[0]?.plain_text || 'Untitled';

      // Skip the Portfolio Bot folder
      if (title === 'Portfolio Bot') {
        console.log('\nSkipping Portfolio Bot folder');
        continue;
      }

      console.log(`\nProcessing: ${title}`);

      const rawContent = await getPageContent(page.id);
      const content = preprocessContent(rawContent);
      console.log('Content length:', content.length);

      const embedding = await generateEmbedding(content);
      console.log('Embedding generated');

      await storeInSupabase(title, content, embedding);
    }

    console.log('\nAll pages and subpages processed and stored in Supabase');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
