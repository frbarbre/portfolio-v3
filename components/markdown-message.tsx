import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // for GitHub-flavored markdown (tables, strikethrough, etc.)
import { Highlight, HighlightProps } from 'prism-react-renderer';
import { customTheme } from '@/utils/prism-theme';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// HighlightWrapper Component to handle code blocks with copy-to-clipboard
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
            className={`${className} overflow-auto rounded-lg border p-4`}
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

// CodeBlock component to use HighlightWrapper for handling markdown code blocks
const CodeBlock = ({ language, code }: { language: string; code: any }) => {
  return (
    <HighlightWrapper theme={customTheme} code={code} language={language}>
      {code}
    </HighlightWrapper>
  );
};

interface MarkdownMessageProps {
  content: string;
}

export default function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-sm dark:prose-dark max-w-none"
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-xl font-bold" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-lg font-semibold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-base font-medium" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-sm font-medium" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-2 leading-relaxed first:mt-0 last:mb-0" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline" {...props} />
        ),
        li: ({ node, ...props }) => <li className="list-disc" {...props} />,
        ul: ({ node, ...props }) => (
          <ul className="flex flex-col gap-3 pl-4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="flex flex-col gap-3 pl-4" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
            {...props}
          />
        ),
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const code = String(children).replace(/\n$/, '');

          // Use CodeBlock for block-level code
          return match ? (
            <CodeBlock language={match[1]} code={code} />
          ) : (
            <code className="rounded bg-foreground/10 px-1 py-0.5" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
