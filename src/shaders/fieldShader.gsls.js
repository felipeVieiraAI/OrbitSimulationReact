
const fieldShader = `
uniform vec2 bodyA;
uniform vec2 bodyB;
uniform vec2 bodyC;

uniform float massA;
uniform float massB;
uniform float massC;

vec2 attraction(vec2 pointA, vec2 pointB, float mass) {
    vec2 dist = pointB - pointA;
    vec2 norm = normalize(dist);
    float length = length(dist);
    return norm * (mass / (length * length));
}

void main(){
  // we need the positions of the bodies at each frame to calculate the overall 
  // gravitational force for each point

    vec2 attractionA = attraction(gl_FragCoord.xy, bodyA, massA);
    vec2 attractionB = attraction(gl_FragCoord.xy, bodyB, massB);
    vec2 attractionC = attraction(gl_FragCoord.xy, bodyC, massC);

    float totalGravity = length(attractionA + attractionB + attractionC);

    // get the "atraction vector" for each point



    float x = totalGravity * 1000.0;
    x = x >= 10.0 ? 0.0 : x;
    // vec3 color = vec3(x*100.0);

    gl_FragColor = vec4(2.0*sin(x),2.0*sin(x/2.),2.0*sin(x/4.),1.);
}`

export default fieldShader