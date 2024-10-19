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

  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    allBlocks = allBlocks.concat(results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }

  return allBlocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return block.paragraph.rich_text
            .map((text) => text.plain_text)
            .join('');
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
          return `${block[block.type].rich_text
            .map((text) => text.plain_text)
            .join('')}\n`;
        case 'bulleted_list_item':
        case 'numbered_list_item':
          return `- ${block[block.type].rich_text
            .map((text) => text.plain_text)
            .join('')}`;
        case 'to_do':
          return `${block.to_do.checked ? '[x]' : '[ ]'} ${block.to_do.rich_text
            .map((text) => text.plain_text)
            .join('')}`;
        case 'toggle':
          return block.toggle.rich_text.map((text) => text.plain_text).join('');
        case 'code':
          return `\`\`\`${block.code.language}\n${block.code.rich_text
            .map((text) => text.plain_text)
            .join('')}\n\`\`\``;
        case 'quote':
          return `> ${block.quote.rich_text
            .map((text) => text.plain_text)
            .join('')}`;
        case 'divider':
          return '---';
        case 'child_page':
          return `[Subpage: ${block.child_page.title}]`;
        default:
          return '';
      }
    })
    .join('\n');
}

function preprocessContent(content) {
  return content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

async function storeInSupabase(title, content, embedding) {
  const { error } = await supabase
    .from('documents')
    .insert({ title, content, embedding });

  if (error) {
    console.error('Error inserting document:', error);
  } else {
    console.log('Document added successfully:', title);
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
