'use client';

import Card from '@/components/card';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { animate, motion as m, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

/**
 * Component for "Slider" Slices.
 */
const Slider = ({ slice }: SliderProps): JSX.Element => {
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width]);

  const items = slice.primary.items;

  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative grid gap-6 lg:grid-cols-layout"
    >
      <h2 className="relative z-20 flex h-full items-center self-center font-medium text-foreground/60 lg:-ml-8 lg:bg-background lg:pl-8 lg:text-foreground">
        {slice.primary.title}
      </h2>
      <div className="gradient pointer-events-none absolute -left-4 -right-4 bottom-0 top-6 z-10 h-full md:-left-6 md:-right-6 lg:-right-8 lg:left-[214px] lg:top-0" />

      <div className="relative h-[120px] lg:h-[140px]">
        <m.div
          className="left-0 lg:absolute"
          style={{ x: xTranslation }}
          ref={ref}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
        >
          <div className="relative flex gap-4">
            {[...items, ...items].map((item, idx) => (
              <Card
                link={item.link}
                isInverted={item.should_invert}
                image={item.logo}
                key={idx}
              />
            ))}
          </div>
        </m.div>
      </div>
    </m.section>
  );
};

export default Slider;
