import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls } from '@react-three/drei'

import * as THREE from 'three'

import Sphere from "./geometry/Sphere"
import Quad from "./geometry/Quad"
import {newBody} from "./models/body"

import {Attraction} from './math/gravity'
import {update} from './math/physics'

const bodyA = newBody(new THREE.Vector3(100 ,-50,-150), 1,new THREE.Vector3(0,1,0))
const bodyB = newBody(new THREE.Vector3(0   ,-50,-100), 4,new THREE.Vector3(0,0,0))
const bodyC = newBody(new THREE.Vector3(-100,-50,-150), 1,new THREE.Vector3(0,-1,0))
// const bodyD = newBody(new THREE.Vector3(0,0,-50), 1000,new THREE.Vector3(0,0,0))

const bodies = [bodyA, bodyB, bodyC]

// disregard delta for now, this may be a flawed approach
function updateFrame(state, delta, ref, bodyIndex) {
  const fbodies = bodies.filter((a,index) => index != bodyIndex)
  const body = bodies[bodyIndex]

  const attractionVector = fbodies.reduce((vector, target) => {
    const v = Attraction(body, target)
    return v.add(vector)
  }, new THREE.Vector3())

  const position = update(body, attractionVector)

  ref.current.position.x = position.x
  ref.current.position.y = position.y
  ref.current.position.z = position.z
  // console.log(ref.current.position)
  // console.log("atraction vector", attractionVector)
  // console.log("position", position)
}

function updateShader(state, delta, ref) {
  ref.current.material.uniforms.bodyA.value = new THREE.Vector2(bodyA.position.x + 1750, bodyA.position.y + 1500)
  ref.current.material.uniforms.bodyB.value = new THREE.Vector2(bodyB.position.x + 1750, bodyB.position.y + 1500)
  ref.current.material.uniforms.bodyC.value = new THREE.Vector2(bodyC.position.x + 1750, bodyC.position.y + 1500)

  ref.current.material.uniforms.massA.value = bodyA.mass
  ref.current.material.uniforms.massB.value = bodyB.mass
  ref.current.material.uniforms.massC.value = bodyC.mass
}

export default function () {
  return (
    <Canvas orthographic height="100wh">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere mass={bodyA.mass} color="red" position={bodyA.position} animate={(s,d,r) => updateFrame(s,d,r,0)} />
      <Sphere mass={bodyB.mass} color= "pink" position={bodyB.position} animate={(s,d,r) => updateFrame(s,d,r,1)} />
      <Sphere mass={bodyC.mass} position={bodyB.position} animate={(s,d,r) => updateFrame(s,d,r,2)} />
      <Quad position={[0,0,-180]} animate={(s,d,r) => updateShader(s,d,r)} />
      <CameraControls/>
      {/* <CameraControls /> */}
    </Canvas>
  );
}
