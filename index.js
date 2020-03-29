const Vector = require('./vector');
const Matrix = require('./matrix');

a = [2,5,6];
b = [3,0,-1];

let vett1 = new Vector(a);

let sum = Vector.sum(a,b)

console.log(vett1.getNorm());

console.log(`sum ${sum}`)

console.log(vett1.scalarProduct(5))
console.log(vett1.vector)

console.log(vett1.product(b))

const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);
console.log(matrix.solveUsingLU([1,1,10]));
