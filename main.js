const canvas = document.getElementById("screen");
const gl = canvas.getContext("webgl2");

import { readFile } from "./utils.js";

if (gl == null) {
    alert("There was an error initializing WebGL, your Browser or Machine may not support it");
}

// 1. Create Shader Objects
const vertCode = await readFile("shader.vert");
const fragCode = await readFile("shader.frag");
console.log(vertCode);
console.log(fragCode);
// 2. Attach Shader Source Code
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vertexShader, vertCode);
gl.shaderSource(fragmentShader, fragCode);
// 3. Compile the Shaders
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);
// Error logging
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("An error occurred compiling the vertex shader: " + gl.getShaderInfoLog(vertexShader));
}
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("An error occurred compiling the fragment shader: " + gl.getShaderInfoLog(fragmentShader));
}
// 4. Create and Link the Shader Program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
// 5. Use the Shader Program
gl.useProgram(shaderProgram);
// Error Logging
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
}
// 6. Link vertex data to shader attributes
const position = gl.getAttribLocation(shaderProgram, "position");

const vertices = new Float32Array([
    0.0, 1.0,
    -1.0, -1.0,
    1.0, -1.0
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(position);

// Draw the triangle
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
