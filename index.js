const Vector = require('./src/vector');
const Matrix = require('./src/matrix');


const vector1 = new Vector([2,3,1]);
const vector2 = new Vector([-1,2,-1]);

console.log(Vector.sum(vector1,vector2))