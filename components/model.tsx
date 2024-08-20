import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { vertex, fragment } from "./shader";
import { useTexture, useAspect } from "@react-three/drei";
import useMouse from "@/hooks/useMouse";
import useDimension from "@/hooks/useDimension";
import { Content, GroupField } from "@prismicio/client";
import { Simplify } from "@/prismicio-types";

export default function Model({
  activeMenu,
  projects,
}: {
  activeMenu: any;
  projects: GroupField<
    Simplify<Content.ProjectsSliceDefaultPrimaryProjectsItem>
  >;
}) {
  const plane = useRef();
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  const textures = projects.map((project) =>
    useTexture(project.image.url || "")
  );
  const { width, height } = textures[0].image;
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const scale = useAspect(width, height, 0.225);
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  useEffect(() => {
    if (activeMenu != null) {
      //@ts-ignore
      plane.current.material.uniforms.uTexture.value = textures[activeMenu];
      animate(opacity, 1, {
        duration: 0.2,
        onUpdate: (latest) =>
          //@ts-ignore
          (plane.current.material.uniforms.uAlpha.value = latest),
      });
    } else {
      animate(opacity, 0, {
        duration: 0.2,
        onUpdate: (latest) =>
          //@ts-ignore
          (plane.current.material.uniforms.uAlpha.value = latest),
      });
    }
  }, [activeMenu]);

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] },
    uAlpha: { value: 0 },
  });

  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(x - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, x, 0.1));
      smoothMouse.y.set(lerp(smoothY, y, 0.1));
      //@ts-ignore
      plane.current.material.uniforms.uDelta.value = {
        x: x - smoothX,
        y: -1 * (y - smoothY),
      };
    }
  });

  const x = useTransform(
    smoothMouse.x,
    [0, dimension.width],
    [(-1 * viewport.width) / 2, viewport.width / 2]
  );
  const y = useTransform(
    smoothMouse.y,
    [0, dimension.height],
    [viewport.height / 2, (-1 * viewport.height) / 2]
  );

  return (
    //@ts-ignore
    <motion.mesh position-x={x} position-y={y} ref={plane} scale={scale}>
      <planeGeometry args={[1.25, 1.25, 15, 15]} />
      {/* <meshBasicMaterial wireframe={true} color="red"/> */}
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent={true}
        // wireframe={true}
      />
    </motion.mesh>
  );
}
