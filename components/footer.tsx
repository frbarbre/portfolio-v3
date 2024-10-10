'use client';

import { FooterDocument } from '@/prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink } from '@prismicio/react';
import { motion as m } from 'framer-motion';

export default function Footer({ footer }: { footer: FooterDocument<string> }) {
  return (
    <m.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-between gap-6 pb-8 xs:flex-row xs:items-end"
    >
      <div>
        <h3 className="relative z-10 mb-4 text-[32px] font-bold uppercase leading-none tracking-tight sm:text-[48px] md:text-[56px] lg:text-[72px]">
          {footer.data.name}
        </h3>
        <h2 className="relative z-10 text-[32px] font-bold uppercase leading-none tracking-tight sm:text-[48px] md:text-[56px] lg:text-[72px]">
          {footer.data.role}
        </h2>
        <ul className="flex gap-6 pt-8">
          {footer.data.links.map((link) => {
            return (
              <li key={link.name}>
                <PrismicLink
                  className="relative z-10 border-b-2 border-b-background font-medium hover:border-b-foreground"
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
        className="relative z-10 h-[29px] w-[108px] object-contain dark:invert"
        field={footer.data.logo}
      />
    </m.footer>
  );
}
