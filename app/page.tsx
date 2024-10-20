import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';
import Chat from '@/components/chat';
import { createClient } from '@/prismicio';
import { components } from '@/slices';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('home');
  const isDev = process.env.NODE_ENV === 'development';

  return <SliceZone slices={page.data.slices} components={components} />;
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
