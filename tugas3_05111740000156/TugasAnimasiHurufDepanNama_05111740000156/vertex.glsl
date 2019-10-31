precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scaleX;
uniform float scaleY;
uniform float translasi;

void main() {
  fColor = vColor;
  //vec2 translate = vec2(0.5,0.5);
  mat4 translate = mat4(
    1.0, 0.0, 0.0, translasi,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translateminus = mat4(
    1.0, 0.0, 0.0, -translasi,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rotationMatrix = mat4(
    cos(theta),sin(theta), 0.0, 0.0,
    -sin(theta),cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 skalasiMatrix = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  gl_Position = vec4(vPosition, 0.0, 1.0) * translate * rotationMatrix * skalasiMatrix * translateminus;
}
