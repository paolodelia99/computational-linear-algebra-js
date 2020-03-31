const Vector = require('./src/vector');
const Matrix = require('./src/matrix');


const vector1 = new Vector([2,3,1]);
const vector2 = new Vector([-1,2,-1]);

const zip = (arr1,arr2) => arr1.map((k,i) => [k,arr2[i]]);

const arr = zip(vector1.vector,vector2.vector).map(x => x.reduce((a,b)=> a*b,1));
console.log(arr)