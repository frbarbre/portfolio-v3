import { ImageFieldImage, RichTextField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicLink,
  PrismicRichText,
} from '@prismicio/react';
import CodeBlock from './code-block';

export const richTextComponents: JSXMapSerializer = {
  // Headings
  heading2: ({ children }) => (
    <h2 className="text-4xl font-semibold">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="text-3xl font-semibold">{children}</h3>
  ),
  heading4: ({ children }) => (
    <h4 className="text-2xl font-semibold">{children}</h4>
  ),

  // Paragraph
  paragraph: ({ children }) => (
    <p className="whitespace-pre-line text-lg leading-loose text-foreground/90">
      {children}
    </p>
  ),

  // Unordered List
  list: ({ children }) => (
    <ul className="flex list-disc flex-col gap-4 pl-6 text-lg text-foreground/90">
      {children}
    </ul>
  ),
  listItem: ({ children }) => (
    <li className="pl-1 leading-loose">{children}</li>
  ),

  // Ordered List
  oList: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-4 pl-7 text-lg text-foreground/90">
      {children}
    </ol>
  ),
  oListItem: ({ children }) => (
    <li className="pl-1 leading-loose">{children}</li>
  ),

  // Code
  preformatted: ({ node }) => <CodeBlock node={node} />,

  // Link
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="text-foreground underline">
      {children}
    </PrismicLink>
  ),

  // Emphasis
  em: ({ children }) => <em>{children}</em>,

  // Embeds
  embed: ({ node }) => {
    if (node.oembed.type === 'link') {
      return <iframe src={node.oembed.embed_url} />;
    }

    if (node.oembed.type === 'video') {
      if (node.oembed.provider_name === 'YouTube') {
        const src = `https://www.youtube.com/embed/${node.oembed.embed_url.split('?v=')[1]}?feature=oembed`;
        return (
          <iframe src={src} className="aspect-video w-full rounded-md border" />
        );
      }
    }
    return null;
  },

  strong: ({ children }) => <strong>{children}</strong>,

  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code className="bg-red-600">{children}</code>;
    }
    return null;
  },

  // Image
  image: ({ node }) => {
    const imageField: ImageFieldImage = {
      ...node,
      id: crypto.randomUUID(),
      edit: {
        x: 0,
        y: 0,
        zoom: 0,
        background: 'transparent',
      },
    };

    return (
      <PrismicNextImage field={imageField} className="w-full rounded-xl" />
    );
  },
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return (
    <div className="rte flex flex-col gap-8 leading-loose">
      <PrismicRichText field={field} components={richTextComponents} />
    </div>
  );
};
