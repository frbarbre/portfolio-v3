'use server';

import { supabase } from '@/lib/supabase';
import { openai } from '@/lib/openai';

export async function createResource({ content }: { content: string }) {
  try {
    // Generate embedding for the content
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: content,
    });

    const embedding = embeddingResponse.data[0].embedding;

    console.log('Embedding:', embedding.length);

    // Insert the document with its embedding into Supabase
    const { error } = await supabase.from('documents').insert({
      content: content,
      embedding: embedding,
    });

    if (error) {
      console.error('Error inserting document:', error);
      throw new Error('Failed to create resource');
    }

    return 'Resource successfully created.';
  } catch (e) {
    if (e instanceof Error) {
      return e.message.length > 0 ? e.message : 'Error, please try again.';
    }
    return 'An unexpected error occurred';
  }
}
