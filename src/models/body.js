import * as THREE from 'three'

export function newBody(position, mass, velocity) {
    return ({
        position,
        mass,
        velocity,
        acceleration: new THREE.Vector3()
    })
}