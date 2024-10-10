'use client';

import Scene from '@/components/scene';
import ThreeProjects from '@/components/three-projects';
import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';
import { motion as m } from 'framer-motion';
import { useState } from 'react';

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

/**
 * Component for "Projects" Slices.
 */
const Projects = ({ slice }: ProjectsProps): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <>
      <m.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative grid gap-6 lg:grid-cols-layout"
      >
        <h2 className="relative z-10 font-medium text-foreground/60 lg:text-foreground">
          {slice.primary.title}
        </h2>
        <div className="hidden lg:block">
          <ThreeProjects
            setActiveMenu={setActiveMenu}
            projects={slice.primary.projects}
          />
          <Scene projects={slice.primary.projects} activeMenu={activeMenu} />
        </div>

        <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:hidden">
          {slice.primary.projects.map((project, i) => {
            return (
              <li
                key={i}
                className="w-full transition-transform md:hover:scale-[103%]"
              >
                <PrismicNextLink field={project.link}>
                  <PrismicNextImage
                    field={project.image}
                    className="rounded-md"
                  />
                  <article className="mt-3 flex flex-wrap justify-between gap-4 uppercase">
                    <h2 className="font-medium">{project.name}</h2>
                    <p className="text-foreground/80">{project.type}</p>
                  </article>
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </m.section>
    </>
  );
};

export default Projects;
