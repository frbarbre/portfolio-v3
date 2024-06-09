"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import SliderComponent from "@/components/slider";
import { motion as m } from "framer-motion";

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

/**
 * Component for "Slider" Slices.
 */
const Slider = ({ slice }: SliderProps): JSX.Element => {
  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative grid lg:grid-cols-layout gap-6"
    >
      <h2 className="font-medium text-foreground/60 lg:text-foreground self-center">
        {slice.primary.title}
      </h2>
      <SliderComponent slice={slice} />
    </m.section>
  );
};

export default Slider;
