'use client';

import { RichText } from '@/components/rich-text';
import { Content as ContentT } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { motion as m } from 'framer-motion';

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<ContentT.ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative grid grid-cols-1 gap-6 lg:mr-[238px] lg:grid-cols-layout"
    >
      <h2 className="relative z-10 font-medium text-foreground/60 lg:text-foreground">
        {slice.primary.title}
      </h2>
      <div className="-mt-1.5">
        <RichText field={slice.primary.content} />
      </div>
    </m.section>
  );
};

export default Content;
