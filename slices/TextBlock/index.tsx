'use client';

import Button from '@/components/button';
import { cn } from '@/lib/utils';
import { Content } from '@prismicio/client';
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { motion as m } from 'framer-motion';

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'relative grid gap-6 lg:grid-cols-layout',
        !slice.primary.full_width && 'lg:mr-[238px]',
      )}
    >
      <h2 className="relative z-10 font-medium text-foreground/60 lg:text-foreground">
        {slice.primary.title}
      </h2>
      <div className="-mt-1.5">
        <PrismicRichText
          field={slice.primary.description}
          components={(type, node, content, children) => {
            if (type === 'paragraph') {
              return (
                <p className="relative z-10 text-[28px] font-medium lg:text-[35px]">
                  {children}
                </p>
              );
            }
          }}
        />
        {slice.variation === 'withStats' && (
          <div className="mt-[72px] flex w-full flex-col">
            {slice.primary.stats.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between border-b py-10 first:border-t"
                >
                  <h3 className="font-medium">{item.label}</h3>

                  {item.text_or_link === 'Text' ? (
                    <p>{item.value}</p>
                  ) : (
                    <PrismicLink
                      className="block underline hover:opacity-80"
                      field={item.link}
                    >
                      {item.value}
                    </PrismicLink>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {slice.variation === 'withButtons' && (
          <div className="mt-9 flex flex-wrap gap-3">
            {slice.primary.buttons.map((button, i) => {
              return (
                <PrismicLink field={button.link} key={i}>
                  <Button asChild hoverText={String(button.hover_text)}>
                    {button.text}
                  </Button>
                </PrismicLink>
              );
            })}
          </div>
        )}
      </div>
    </m.section>
  );
};

export default About;
