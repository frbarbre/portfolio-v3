import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { Fragment, useMemo } from 'react';
import Button from './button';
import { PrismicLink } from '@prismicio/react';
import { cn } from '@/lib/utils';

export default function Hero({
  slice,
  taglineArr,
}: {
  slice: Content.HeroSlice;
  taglineArr: string[];
}) {
  // Memoized taglines to avoid unnecessary re-renders
  const memoizedTaglines = useMemo(
    () =>
      taglineArr.map((tagline, i) => {
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
      }),
    [taglineArr, slice.primary.icons],
  );

  return (
    <>
      <div className="flex flex-col gap-2 text-[30px] font-bold uppercase leading-none tracking-tight xs:flex-row xs:items-end xs:text-[42px] sm:gap-4 sm:text-[56px] md:gap-6 md:text-[72px] lg:text-[92px]">
        <div className="relative z-10 mb-3 w-max xs:hidden">
          <AnimatedAvatar avatar={slice.primary.avatar} size="small" />
        </div>
        <div className="overflow-hidden">
          <h2 className="animate-slide-up relative z-10 pr-2">
            {slice.primary.firstname}{' '}
            <span className="relative z-10 xs:hidden">
              {slice.primary.lastname}
            </span>
          </h2>
        </div>
        <div className="hidden xs:mb-1 xs:block sm:mb-1.5 md:mb-2 lg:mb-3">
          <AnimatedAvatar avatar={slice.primary.avatar} />
        </div>
        <div className="hidden overflow-hidden xs:block">
          <h2 className="animate-slide-up relative z-10">
            {slice.primary.lastname}
          </h2>
        </div>
      </div>
      <div className="my-6 overflow-hidden">
        <h1 className="animate-slide-up relative z-10 text-[29px] font-bold uppercase leading-none tracking-tight xs:text-[42px] sm:text-[56px] md:text-[px] lg:text-[92px]">
          {slice.primary.role}
        </h1>
      </div>
      <div className="animate-fade-in relative z-10">
        <h3 className="relative z-10 text-balance text-[24px] font-medium leading-relaxed xs:max-w-[560px] sm:max-w-[680px] sm:tracking-tight md:max-w-[760px] md:text-[32px] lg:max-w-[940px] lg:text-[40px]">
          {memoizedTaglines}
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
      </div>
    </>
  );
}

// Avatar Component with animation using CSS
function AnimatedAvatar({
  avatar,
  size = 'large',
}: {
  avatar: any;
  size?: string;
}) {
  const avatarClass =
    size === 'small'
      ? 'aspect-square min-w-[55px] max-w-[55px]'
      : 'aspect-square min-w-[120px] max-w-[120px]';

  return (
    <div
      className={`animate-scale ${avatarClass} overflow-hidden rounded-full rounded-bl-none bg-[#EAEAEA]`}
    >
      <PrismicNextImage
        loading="lazy"
        className="object-cover"
        field={avatar}
      />
    </div>
  );
}
