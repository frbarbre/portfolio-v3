import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { supabase } from '@/lib/supabase';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('home');

  let { data: hello, error } = await supabase.from('hello').select('*');

  return (
    <>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <pre>{JSON.stringify(hello, null, 2)}</pre>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('home');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [page.data.meta_image.url || ''],
    },
    icons: {
      icon: [
        {
          media: '(prefers-color-scheme: light)',
          url: '/images/icon-light.png',
          href: '/images/icon-light.png',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/images/icon.png',
          href: '/images/icon-dark.png',
        },
      ],
    },
  };
}
