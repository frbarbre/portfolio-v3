'use client';

import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { Fragment } from 'react';
import Button from './button';
import { motion as m } from 'framer-motion';
import { PrismicLink } from '@prismicio/react';
import { cn } from '@/lib/utils';

export default function Hero({
  slice,
  taglineArr,
}: {
  slice: Content.HeroSlice;
  taglineArr: string[];
}) {
  return (
    <>
      <div className="flex flex-col gap-2 text-[30px] font-bold uppercase leading-none tracking-tight xs:flex-row xs:items-end xs:text-[42px] sm:gap-4 sm:text-[56px] md:gap-6 md:text-[72px] lg:text-[92px]">
        <div className="relative z-10 mb-3 w-max xs:hidden">
          <m.div
            initial={{ scale: 0 }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              damping: 20,
              stiffness: 70,
              type: 'spring',
            }}
            viewport={{ once: true }}
          >
            <PrismicNextImage
              className="relative z-10 aspect-square min-w-[120px] max-w-[120px] rounded-full rounded-bl-none bg-[#EAEAEA] object-cover"
              field={slice.primary.avatar}
            />
          </m.div>
        </div>
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
            className="relative z-10 pr-2"
          >
            {slice.primary.firstname}{' '}
            <span className="relative z-10 xs:hidden">
              {slice.primary.lastname}
            </span>
          </m.h2>
        </div>
        <div className="hidden xs:mb-1 xs:block sm:mb-1.5 md:mb-2 lg:mb-3">
          <m.div
            initial={{ scale: 0, originY: 1 }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              damping: 20,
              stiffness: 70,
              type: 'spring',
            }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <PrismicNextImage
              className="aspect-square min-w-[55px] max-w-[55px] rounded-full rounded-bl-none bg-[#EAEAEA] object-cover xs:min-w-[65px] xs:max-w-[65px] sm:min-w-[80px] sm:max-w-[80px] md:min-w-[100px] md:max-w-[100px] lg:min-w-[115px] lg:max-w-[115px]"
              field={slice.primary.avatar}
            />
          </m.div>
        </div>
        <div className="hidden overflow-hidden xs:block">
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
            {slice.primary.lastname}
          </m.h2>
        </div>
      </div>
      <m.div className="my-6 overflow-hidden">
        <m.h1
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          transition={{
            delay: 0.1,
            type: 'spring',
            damping: 20,
            stiffness: 70,
          }}
          viewport={{ once: true }}
          className="relative z-10 text-[29px] font-bold uppercase leading-none tracking-tight xs:text-[42px] sm:text-[56px] md:text-[px] lg:text-[92px]"
        >
          {slice.primary.role}
        </m.h1>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          type: 'spring',
          damping: 20,
          stiffness: 70,
        }}
        viewport={{ once: true }}
      >
        <h3 className="relative z-10 text-balance text-[24px] font-medium leading-relaxed xs:max-w-[560px] sm:max-w-[680px] sm:tracking-tight md:max-w-[760px] md:text-[32px] lg:max-w-[940px] lg:text-[40px]">
          {taglineArr.map((tagline, i) => {
            const icon = slice.primary.icons[i - 1];

            if (!icon) return <Fragment key={i}>{tagline}</Fragment>;

            const line = tagline
              .replace(String(icon.split_word), '')
              .replace(' ,', ',');

            return (
              <Fragment key={i}>
                <PrismicNextImage
                  field={icon.image}
                  width={32}
                  height={32}
                  className={cn(
                    'mx-1.5 inline h-[24px] w-[24px] -translate-y-1 xs:mx-3 xs:h-[32px] xs:w-[32px]',
                    icon.should_invert && 'dark:invert',
                  )}
                />
                {icon.split_word}
                {line}
              </Fragment>
            );
          })}
        </h3>
        <PrismicLink
          field={slice.primary.link}
          className="relative z-10 block w-max"
        >
          <Button
            asChild
            className="mt-9"
            hoverText={String(slice.primary.button_hover_text)}
          >
            {slice.primary.button_text}
          </Button>
        </PrismicLink>
      </m.div>
    </>
  );
}
