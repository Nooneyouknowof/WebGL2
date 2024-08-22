const canvas = document.getElementById("screen");
const gl = canvas.getContext("webgl2");

import { readFile } from "./utils";

if (gl == null) {
    alert("There was an error initializing WebGL, your Browser or Machine may not support it");
}

