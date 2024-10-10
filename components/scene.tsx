'use client';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import Model from './model';
import { Content, GroupField } from '@prismicio/client';
import { Simplify } from '@/prismicio-types';

export default function Scene({
  activeMenu,
  projects,
}: {
  activeMenu: any;
  projects: GroupField<
    Simplify<Content.ProjectsSliceDefaultPrimaryProjectsItem>
  >;
}) {
  return (
    <div
      id="canvas-wrapper"
      className="pointer-events-none fixed left-0 top-0 z-0 h-screen w-screen"
    >
      <Canvas className="pointer-events-none">
        <Model projects={projects} activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
