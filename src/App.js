import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import * as THREE from 'three'

import Sphere from "./geometry/Sphere"
import {newBody} from "./models/body"

import {Attraction} from './math/gravity'
import {update} from './math/physics'

const bodyA = newBody(new THREE.Vector3(168,10,-150), 10,new THREE.Vector3(0,1,0))
const bodyB = newBody(new THREE.Vector3(190,-150,-120), 10,new THREE.Vector3(1,-1,-0.01))
const bodyC = newBody(new THREE.Vector3(-400,1,-150), 40,new THREE.Vector3(0,0,0))
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
  console.log(ref.current.position)
  console.log("atraction vector", attractionVector)
  console.log("position", position)
}

export default function () {
  return (
    <Canvas orthographic height="100wh">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere mass={bodyA.mass} color="red" position={bodyA.position} animate={(s,d,r) => updateFrame(s,d,r,0)} />
      <Sphere mass={bodyB.mass} position={bodyB.position} animate={(s,d,r) => updateFrame(s,d,r,1)} />
      <Sphere mass={bodyC.mass} position={bodyB.position} animate={(s,d,r) => updateFrame(s,d,r,2)} />
      {/* <Sphere position={bodyD.position} animate={(s,d,r) => updateFrame(s,d,r,3)} /> */}
    </Canvas>
  );
}
