import { AnimatePresence, motion as m } from 'framer-motion';
import React, { useState } from 'react';
import { ImageField, LinkField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { cn } from '@/lib/utils';
import { PrismicLink } from '@prismicio/react';

interface CardProps {
  link: LinkField;
  isInverted?: boolean;
  image: ImageField<never>;
}

export default function Card({ image, isInverted, link }: CardProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <m.div
      className="relative flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-xl bg-muted lg:h-[140px] lg:w-[140px]"
      key={image.url}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* Hover overlay */}
      <AnimatePresence>
        {showOverlay && (
          <m.div
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pointer-events-none absolute h-full w-full bg-muted" />
            <m.h3
              className="z-10 flex cursor-pointer items-center gap-[0.5ch] rounded-full bg-foreground px-3 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <PrismicLink field={link}>Read more</PrismicLink>
            </m.h3>
          </m.div>
        )}
      </AnimatePresence>
      <PrismicNextImage
        field={image}
        className={cn(
          'h-1/2 w-1/2 rounded-md object-contain',
          isInverted && 'dark:invert',
        )}
      />
    </m.div>
  );
}
