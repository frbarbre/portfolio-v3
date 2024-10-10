import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { uid: string } }) {
  const client = createClient();

  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('project');

  console.log(pages);

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
