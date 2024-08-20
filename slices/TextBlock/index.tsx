"use client";

import Button from "@/components/button";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { motion as m } from "framer-motion";

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
      className="relative grid lg:grid-cols-layout gap-6"
    >
      <h2 className="font-medium text-foreground/60 lg:text-foreground relative z-10">
        {slice.primary.title}
      </h2>
      <div className="-mt-1.5">
        <PrismicRichText
          field={slice.primary.description}
          components={(type, node, content, children) => {
            if (type === "paragraph") {
              return (
                <p className="text-[28px] lg:text-[35px] font-medium relative z-10">
                  {children}
                </p>
              );
            }
          }}
        />
        {slice.variation === "withButtons" && (
          <div className="flex flex-wrap gap-3 mt-9">
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
