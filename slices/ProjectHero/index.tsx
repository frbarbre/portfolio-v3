'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { motion as m } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero = ({ slice }: ProjectHeroProps): JSX.Element => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mb-12 mt-6 flex flex-col-reverse justify-between gap-2 text-[36px] font-bold uppercase leading-none tracking-tight xs:flex-row xs:items-end xs:text-[42px] sm:gap-4 sm:text-[56px] md:flex-row md:gap-6 md:text-[72px] lg:text-[92px]">
        <div className="overflow-hidden">
          <m.h1
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
          </m.h1>
        </div>

        <div className="overflow-hidden">
          <m.h2
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
          </m.h2>
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
        {/* Loading image - shown while video loads */}
        <Image
          src="https://images.prismic.io/frederikbarbre/Z6CE65bqstJ9-JZj_loading.png?auto=format,compress"
          alt="Loading..."
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          width={1920}
          height={1080}
        />

        {/* Video with fade in effect */}
        <video
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          //@ts-ignore
          src={slice.primary.content.url}
        />
      </div>
    </section>
  );
};

export default ProjectHero;
