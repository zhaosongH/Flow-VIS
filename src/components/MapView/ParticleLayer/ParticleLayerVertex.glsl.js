// uniform: bbox, boundx, boundy, data, pixelRatio
// attribute: position, posFrom
// varying: vColor
// gl_Positon gl_PointSize

export default `\
#define SHADER_NAME particle-layer-vertex-shader

#define HEIGHT_FACTOR 25.
#define ELEVATION_SCALE 100.

uniform sampler2D data;
uniform float pixelRatio;

uniform vec4 bbox;
uniform vec2 boundx;
uniform vec2 boundy;

attribute vec3 positions;
attribute vec4 posFrom;
// attribute vec3 vertices;

varying vec4 vColor;
// varying float vAltitude;

// float getAltitude(vec2 lngLat) {
//   vec2 texCoords = (lngLat - elevationBounds.xy) / (elevationBounds.zw - elevationBounds.xy);
//   vec4 elevation = texture2D(elevationTexture, texCoords);

//   return mix(elevationRange.x, elevationRange.y, elevation.r);
// }

void main(void) {
  // position in texture coords
  float x = (posFrom.x - bbox.x) / (bbox.y - bbox.x);
  float y = (posFrom.y - bbox.z) / (bbox.w - bbox.z);
  vec2 coord = vec2(x, 1. - y);
  vec4 texel = texture2D(data, coord);

  // vAltitude = getAltitude(posFrom.xy);
  // float wind = (texel.y - bounds1.x) / (bounds1.y - bounds1.x);
  float vx = 0.05 + (texel.x - boundx.x) / (boundx.y - boundx.x) * 0.9;
  float vy = 0.05 + (texel.y - boundy.x) / (boundy.y - boundx.x) * 0.9;
  float v = length(vec2(vx, vy));

  vec2 pos = project_position(posFrom.xy);
  // float elevation = project_scale((texel.w) * ELEVATION_SCALE);

  vec3 extrudedPosition = vec3(pos.xy, 1.0) + positions;
  vec4 position_worldspace = vec4(extrudedPosition, 1.0);
  gl_Position = project_to_clipspace(position_worldspace);
  gl_PointSize = 3.5 * pixelRatio / 2.0;

  // OLD
  // float alpha = mix(0., 0.8, pow(v, .5));

  // NEW
  float alpha = mix(0., .8, pow(v, .6));

  if (texel.x == 0. && texel.y == 0. && texel.z == 0.) {
    alpha = 0.;
  }
  // temperature in 0-1
  // float temp = (texel.z - boundy.x) / (bounds2.y - bounds2.x);
  vColor = vec4(vec3(0.8), alpha);
  // vColor = vec4(vec3(29./255., 176./255., 184./255.), alpha);
}
`
