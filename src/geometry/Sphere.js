import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Sphere(props) {
    // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => props.animate && props.animate(state, delta, ref));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <sphereGeometry args={[props.mass + 5, 32,16]} />
      <meshStandardMaterial color={props.color ?? "orange"} />
    </mesh>
  );
}