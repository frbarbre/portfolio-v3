import { supabase } from '@/lib/supabase';
import { openai } from '@/lib/openai';

export async function findRelevantContent(question: string) {
  try {
    // Generate embedding for the question
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: question,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Search for similar documents in Supabase
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: 0.78,
      match_count: 5,
    });

    if (error) {
      console.error('Error matching documents:', error);
      throw new Error('Failed to find relevant content');
    }

    // Prepare the context from similar documents, including titles
    const context = documents
      .map((doc: any) => {
        return `Title: ${doc.title}\n\nContent: ${doc.content}\n\n---\n\n`;
      })
      .join('');

    return context || 'No relevant information found.';
  } catch (e) {
    if (e instanceof Error) {
      return e.message.length > 0 ? e.message : 'Error, please try again.';
    }
    return 'An unexpected error occurred while searching for relevant content';
  }
}
