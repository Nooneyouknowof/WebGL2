#version 300 es
precision mediump float;

in vec2 position;

out vec4 vColor;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);

    vColor = vec4(position.xy * 0.5 + 0.5, 0.0, 1.0);
}
