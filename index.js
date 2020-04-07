/**
 * In this file I only test stuff
 */

const Vector = require('./src/vector');
const Matrix = require('./src/matrix');
const LinearTransformation = require('./src/linearTrasformation');
const { performance } = require('perf_hooks');

const matrix1 = Matrix.createRandomMatrix(1024,1024, 0, 10000);
const matrix2 = Matrix.createRandomMatrix(1024,1024, 0, 10000);
let t0 = performance.now();

const matrix3 = Matrix.ijkMultiplication(matrix1,matrix2);  // <---- The function you're measuring time for

let t1 = performance.now();
console.log("Call to ijkMultiplication took " + (t1 - t0) + " milliseconds.");

let t2 = performance.now();

const matrix4 = Matrix.strassenMultiplication(matrix1,matrix2);  // <---- The function you're measuring time for

let t3 = performance.now();
console.log("Call to strassenMultiplication took " + (t3 - t1) + " milliseconds.");

