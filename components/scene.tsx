"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./model";
import { Content, GroupField } from "@prismicio/client";
import { Simplify } from "@/prismicio-types";

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
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
    >
      <Canvas className="pointer-events-none">
        <Model projects={projects} activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
