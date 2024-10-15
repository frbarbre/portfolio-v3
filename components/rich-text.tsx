import { customTheme } from '@/utils/prism-theme';
import { ImageFieldImage, RichTextField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { Highlight, HighlightProps } from 'prism-react-renderer';
import {
  JSXMapSerializer,
  PrismicLink,
  PrismicRichText,
} from '@prismicio/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const HighlightWrapper = (props: HighlightProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="relative">
      <Highlight {...props}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} relative overflow-auto rounded-lg border p-4`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}

            {/* Copy button */}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleCopy}
                    variant={'outline'}
                    size={'icon'}
                    className="absolute right-4 top-4"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans">
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </pre>
        )}
      </Highlight>
    </div>
  );
};

const CodeBlock = ({ node }: { node: any }) => {
  const code = node.text || '';
  const language = node.spans[0]?.data?.label || 'typescript';

  return (
    <HighlightWrapper theme={customTheme} code={code} language={language}>
      {code}
    </HighlightWrapper>
  );
};

export const richTextComponents: JSXMapSerializer = {
  // Headings
  heading2: ({ children }) => (
    <h2 className="text-4xl font-bold">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="text-3xl font-bold">{children}</h3>
  ),
  heading4: ({ children }) => (
    <h4 className="text-2xl font-bold">{children}</h4>
  ),

  // Paragraph
  paragraph: ({ children }) => (
    <p className="whitespace-pre-line text-lg leading-loose text-foreground/90">
      {children}
    </p>
  ),

  // Unordered List
  list: ({ children }) => (
    <ul className="flex list-disc flex-col gap-4 pl-4 text-lg text-foreground/90">
      {children}
    </ul>
  ),
  listItem: ({ children }) => <li className="leading-loose">{children}</li>,

  // Ordered List
  oList: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-4 pl-4 text-lg text-foreground/90">
      {children}
    </ol>
  ),
  oListItem: ({ children }) => <li className="leading-loose">{children}</li>,

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
