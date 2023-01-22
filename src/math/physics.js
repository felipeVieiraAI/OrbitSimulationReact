// maybe this approach is flawed as you need to add all the different attractions from each body
export function update(body, attractionForce) {
    body.acceleration = (attractionForce.divideScalar(body.mass))
    body.velocity.add(body.acceleration)
    body.position.add(body.velocity)
    return body.position
}