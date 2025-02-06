import { Simplify } from '@/prismicio-types';
import { Content, GroupField } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import React from 'react';

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
    <div className="relative z-10 w-full text-foreground dark:mix-blend-difference">
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
                className="flex items-center justify-between border-t p-5 uppercase"
              >
                <p className="text-[64px]">{project.name}</p>
                <p>{project.type}</p>
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
