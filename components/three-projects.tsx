import { Simplify } from "@/prismicio-types";
import { Content, GroupField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import React from "react";

export default function ThreeProjects({
  setActiveMenu,
  projects,
}: {
  setActiveMenu: any;
  projects: GroupField<
    Simplify<Content.ProjectsSliceDefaultPrimaryProjectsItem>
  >;
}) {
  return (
    <div className="relative mix-blend-difference z-10 text-white w-full">
      <ul
        onMouseLeave={() => {
          setActiveMenu(null);
        }}
        className="border-b"
      >
        {projects.map((project, i) => {
          return (
            <li key={project.name}>
              <PrismicNextLink
                field={project.link}
                onMouseOver={() => {
                  setActiveMenu(i);
                }}
                className="p-5 border-t uppercase flex items-center justify-between"
              >
                <p className="text-[4vw]">{project.name}</p>
                <p>{project.type}</p>
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
