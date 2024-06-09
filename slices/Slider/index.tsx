"use client";

import Card from "@/components/card";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { animate, motion as m, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

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
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
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
      className="grid relative lg:grid-cols-layout gap-6"
    >
      <h2 className="lg:-ml-8 font-medium text-foreground/60 lg:text-foreground self-center bg-background z-20 relative h-full flex items-center lg:pl-8">
        {slice.primary.title}
      </h2>
      <div className="pointer-events-none gradient z-10 absolute -left-4 md:-left-6 lg:left-[214px] top-6 lg:top-0 -right-4 md:-right-6 lg:-right-8 bottom-0 h-full" />

      <div className="lg:h-[140px] h-[120px] relative">
        <m.div
          className="lg:absolute left-0"
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
