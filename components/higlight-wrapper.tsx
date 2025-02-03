import { useState } from 'react';
import { Highlight, HighlightProps } from 'prism-react-renderer';
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
            className={`${className} overflow-auto rounded-lg border p-4 lg:max-w-[900px]`}
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

export default HighlightWrapper;
