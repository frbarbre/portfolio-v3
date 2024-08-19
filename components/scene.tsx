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
    <div className="fixed top-0 h-screen w-full">
      <Canvas>
        <Model projects={projects} activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
