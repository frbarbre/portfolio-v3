import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { uid: string } }) {
  const client = createClient();

  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: {
    uid: string;
  };
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound());

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

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('project');

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
