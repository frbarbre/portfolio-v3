"use client";

import { FooterDocument } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";
import { motion as m } from "framer-motion";

export default function Footer({ footer }: { footer: FooterDocument<string> }) {
  return (
    <m.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between flex-col xs:flex-row xs:items-end gap-6 pb-8"
    >
      <div>
        <h3 className="font-bold lg:text-[72px] text-[32px] sm:text-[48px] md:text-[56px] uppercase leading-none tracking-tight mb-4 relative z-10">
          {footer.data.name}
        </h3>
        <h2 className="font-bold lg:text-[72px] text-[32px] sm:text-[48px] md:text-[56px] uppercase leading-none tracking-tight relative z-10">
          {footer.data.role}
        </h2>
        <ul className="flex gap-6 pt-8">
          {footer.data.links.map((link) => {
            return (
              <li key={link.name}>
                <PrismicLink
                  className="font-medium hover:border-b-foreground border-b-2 border-b-background relative z-10"
                  field={link.link}
                >
                  {link.name}
                </PrismicLink>
              </li>
            );
          })}
        </ul>
      </div>
      <PrismicNextImage
        className="w-[108px] h-[29px] dark:invert object-contain relative z-10"
        field={footer.data.logo}
      />
    </m.footer>
  );
}
