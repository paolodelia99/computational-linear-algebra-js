const Vector = require('./src/vector');
const Matrix = require('./src/matrix');


//Utilis Functions
const newArray = array => array.map( a => a.slice())

let mat1 = [[1,2,-1],[1,4,2],[2,6,5]];
let mat2 = newArray(mat1);

console.log(Matrix.getCol(mat1,0))

console.log(mat2)

