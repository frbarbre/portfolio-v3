"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Scene from "@/components/scene";
import ThreeProjects from "@/components/three-projects";

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
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative grid lg:grid-cols-layout gap-6"
    >
      <h2 className="font-medium text-foreground/60 lg:text-foreground">
        {slice.primary.title}
      </h2>
      <div>
        <ThreeProjects
          setActiveMenu={setActiveMenu}
          projects={slice.primary.projects}
        />
        <Scene projects={slice.primary.projects} activeMenu={activeMenu} />
      </div>
    </m.section>
  );
};

export default Projects;
