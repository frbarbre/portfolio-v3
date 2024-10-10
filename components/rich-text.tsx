import { ImageFieldImage, RichTextField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicLink,
} from '@prismicio/react';

export const richTextComponents: JSXMapSerializer = {
  // Headings
  heading1: ({ children }) => (
    <h1 className="text-4xl font-bold">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mt-8 text-xl font-bold">{children}</h2>
  ),
  heading3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
  heading4: ({ children }) => <h4 className="text-md font-bold">{children}</h4>,
  heading5: ({ children }) => <h5 className="text-sm font-bold">{children}</h5>,
  heading6: ({ children }) => <h6 className="text-xs font-bold">{children}</h6>,

  // Paragraph
  paragraph: ({ children }) => (
    <p className="whitespace-pre-line">{children}</p>
  ),

  // Unordered List
  list: ({ children }) => <ul className="list-inside list-disc">{children}</ul>,
  listItem: ({ children }) => <li>{children}</li>,

  // Ordered List
  oList: ({ children }) => (
    <ol className="list-inside list-decimal">{children}</ol>
  ),
  oListItem: ({ children }) => <li>{children}</li>,

  // Code
  preformatted: ({ children }) => <pre>{children}</pre>,

  // Link
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="underline">
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
  },

  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code className="bg-red-600">{children}</code>;
    }
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
      <PrismicNextImage
        field={imageField}
        className="w-full rounded-md border"
      />
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
