const Vector = require('./src/vector');
const Matrix = require('./src/matrix');
const LinearTransformation = require('./src/linearTrasformation');

const matrix1 = [[2,4,5],[-1,2,1],[4,-1,3]];
const matrix2 = [[6,0,2],[4,-1,4],[3,4,1]];

const resMatrix = Matrix.strassenMultiplication(matrix1,matrix2,2);
const resMatrix2 = Matrix.ijkMultiplication(matrix1,matrix2);

Matrix.printMatrix(resMatrix);
console.log()
Matrix.printMatrix(resMatrix2)