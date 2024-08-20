"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Fragment } from "react";
import Button from "../button";
import { motion as m } from "framer-motion";
import { PrismicLink } from "@prismicio/react";
import { cn } from "@/lib/utils";

export default function Hero({
  slice,
  taglineArr,
}: {
  slice: Content.HeroSlice;
  taglineArr: string[];
}) {
  return (
    <>
      <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 md:gap-6 xs:items-end text-[30px] xs:text-[42px] sm:text-[56px] md:text-[72px] lg:text-[92px] tracking-tight font-bold uppercase leading-none">
        <div className="mb-3 xs:hidden w-max relative z-10">
          <m.div
            initial={{ scale: 0 }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              damping: 20,
              stiffness: 70,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            <PrismicNextImage
              className="rounded-full rounded-bl-none min-w-[100px] max-w-[100px] aspect-square object-cover relative z-10"
              field={slice.primary.avatar}
            />
          </m.div>
        </div>
        <div className="overflow-hidden">
          <m.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 70,
            }}
            viewport={{ once: true }}
            className="pr-2 relative z-10"
          >
            {slice.primary.firstname}{" "}
            <span className="xs:hidden relative z-10">
              {slice.primary.lastname}
            </span>
          </m.h2>
        </div>
        <div className="xs:mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 hidden xs:block">
          <m.div
            initial={{ scale: 0, originY: 1 }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              damping: 20,
              stiffness: 70,
              type: "spring",
            }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <PrismicNextImage
              className="rounded-full rounded-bl-none lg:min-w-[115px] lg:max-w-[115px] md:max-w-[100px] md:min-w-[100px] sm:min-w-[80px] sm:max-w-[80px] xs:min-w-[65px] xs:max-w-[65px] min-w-[55px] max-w-[55px] aspect-square object-cover"
              field={slice.primary.avatar}
            />
          </m.div>
        </div>
        <div className="overflow-hidden hidden xs:block">
          <m.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{
              type: "spring",
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
      <m.div className="overflow-hidden my-6">
        <m.h1
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{
            delay: 0.1,
            type: "spring",
            damping: 20,
            stiffness: 70,
          }}
          viewport={{ once: true }}
          className="relative z-10 text-[29px] xs:text-[42px] sm:text-[56px] md:text-[px] lg:text-[92px] font-bold uppercase tracking-tight leading-none"
        >
          {slice.primary.role}
        </m.h1>
      </m.div>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          type: "spring",
          damping: 20,
          stiffness: 70,
        }}
        viewport={{ once: true }}
      >
        <h3 className="leading-relaxed text-[28px] md:text-[32px] lg:text-[40px] font-medium lg:max-w-[940px] md:max-w-[760px] sm:max-w-[680px] xs:max-w-[560px] sm:tracking-tight relative z-10">
          {taglineArr.map((tagline, i) => {
            const icon = slice.primary.icons[i - 1];

            if (!icon) return <Fragment key={i}>{tagline}</Fragment>;

            const line = tagline
              .replace(String(icon.split_word), "")
              .replace(" ,", ",");

            return (
              <Fragment key={i}>
                <PrismicNextImage
                  field={icon.image}
                  width={32}
                  height={32}
                  className={cn(
                    "inline -translate-y-1 mx-1.5 xs:mx-3 h-[24px] w-[24px] xs:h-[32px] xs:w-[32px]",
                    icon.should_invert && "dark:invert"
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
          className="w-max block z-10 relative"
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
