import { Simplify } from "@/prismicio-types";
import { Content, GroupField } from "@prismicio/client";
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
            <li
              onMouseOver={() => {
                setActiveMenu(i);
              }}
              key={project.name}
              className="text-[4vw] uppercase p-5 border-t"
            >
              <p>{project.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
