'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { motion as m } from 'framer-motion';

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero = ({ slice }: ProjectHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mb-12 mt-6 flex flex-col-reverse justify-between gap-2 text-[36px] font-bold uppercase leading-none tracking-tight xs:flex-row xs:items-end xs:text-[42px] sm:gap-4 sm:text-[56px] md:flex-row md:gap-6 md:text-[72px] lg:text-[92px]">
        <div className="overflow-hidden">
          <m.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 70,
            }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {slice.primary.title}
          </m.h2>
        </div>

        <div className="overflow-hidden">
          <m.h3
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 70,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {slice.primary.year}
          </m.h3>
        </div>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-md border border-border">
        <video
          autoPlay
          muted
          loop
          //@ts-ignore
          src={slice.primary.content.url}
        />
      </div>
    </section>
  );
};

export default ProjectHero;
