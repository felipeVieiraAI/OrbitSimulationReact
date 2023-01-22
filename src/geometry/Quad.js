import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import fieldShaderGsls from "../shaders/fieldShader.gsls";

const DefaultVertexShader = `void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
  }`

export default function Quad(props) {
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
      <planeGeometry args={[5000, 5000, 1]} />
      <shaderMaterial fragmentShader={fieldShaderGsls} vertexShader={DefaultVertexShader} uniforms={{
        massA:{value: 0},
        massB:{value: 0},
        massC:{value: 0},

        bodyA:{value: [0,0]},
        bodyB:{value: [0,0]},
        bodyC:{value: [0,0]},
      }}/>
    </mesh>
  );
}