import * as THREE from 'three'

const gravityConstant = 0.001

export function Attraction(bodyA, bodyB) {
    const attractionVector = new THREE.Vector3()
    const r = bodyA.position.distanceTo(bodyB.position)
    const force = gravityConstant * ((bodyA.mass * bodyB.mass) / r*r)

    return attractionVector.subVectors(bodyB.position, bodyA.position).normalize().multiplyScalar(force)
}