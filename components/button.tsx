'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { ReactNode, useState } from 'react';
import { motion as m } from 'framer-motion';

type Props = {
  children: ReactNode;
  hoverText: string;
  className?: string;
  asChild?: boolean;
};

export default function Button({
  children,
  hoverText,
  className,
  asChild,
  ...props
}: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const Comp = asChild ? Slot : 'button';

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
      className={cn(
        'relative w-max overflow-hidden rounded-full border border-foreground bg-background px-9 py-4 font-semibold',
        className,
      )}
    >
      <Comp>
        <>
          {children}

          <m.span
            initial={{ y: '100%' }}
            animate={{ y: isHovering ? '0%' : '100%' }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 100,
              duration: 0.3,
            }}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground text-background"
          >
            <m.strong
              initial={{ y: '100%' }}
              animate={{ y: isHovering ? '0%' : '100%' }}
              transition={{
                delay: 0.1,
                type: 'spring',
                damping: 12,
                stiffness: 100,
                duration: 0.3,
              }}
              className="font-semibold"
            >
              {hoverText}
            </m.strong>
          </m.span>
        </>
      </Comp>
    </div>
  );
}
