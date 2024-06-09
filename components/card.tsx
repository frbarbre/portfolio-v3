import { AnimatePresence, motion as m } from "framer-motion";
import React, { useState } from "react";
import { ImageField, LinkField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";
import { PrismicLink } from "@prismicio/react";

interface CardProps {
  link: LinkField;
  isInverted?: boolean;
  image: ImageField<never>;
}

export default function Card({ image, isInverted, link }: CardProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <m.div
      className="relative overflow-hidden h-[120px] w-[120px] lg:h-[140px] lg:w-[140px] bg-muted rounded-xl flex justify-center items-center"
      key={image.url}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* Hover overlay */}
      <AnimatePresence>
        {showOverlay && (
          <m.div
            className="absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-muted pointer-events-none h-full w-full" />
            <m.h3
              className="bg-foreground text-background font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75 transition-opacity cursor-pointer"
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
          "w-1/2 h-1/2 object-contain rounded-md",
          isInverted && "dark:invert"
        )}
      />
    </m.div>
  );
}
