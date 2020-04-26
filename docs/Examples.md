# Examples

### Matrices

All the methods can accept both Matrix object and a bidimensional array, so you don't have to worry about 
of what kind of object you've passed to a method


```javascript
const { Matrix:m } =  require('computational-linear-algebra-js')

const matrix1 = new m( [[1,2,-1],[1,4,2],[2,6,5]] );
const matrix2 = [[1,2,-1],[0,2,3],[0,0,4]]

// Static Methods
//Transpose a matrix
console.log(m.getTranspose(matrix1)) //[[1,1,2],[2,4,6],[-1,2,5]]
//Sum two matrices
console.log(m.sum(matrix1, matrix2)) //[[2,4,-2],[1,6,5],[2,6,9]]
//Subtract two matrices
console.log(m.sub(matrix1, matrix2)) // [[0,0,0],[1,2,-1],[2,6,1]]
//Multiply two matrices
console.log(m.mul(matrix1, matrix2)) // [[1,6,1],[1,10,19],[2,16,36]]
//Get the inverse of a matrix
console.log(m.getInverse(matrix)) //[[1,-2,1],[-0.125, 0.875, -0.375],[-0.25, -0.25, 0.25]]

```


If you wanna keep the changes inside the matrix object you can use the instance methods


```javascript
const { Matrix:m } =  require('computational-linear-algebra-js')

const matrix1 = new m( [[1,2,-1],[1,4,2],[2,6,5]] )
const matrix2 = new m( [[1,2,-1],[0,2,3],[0,0,4]])
const matrix3 = new m( [[1, 1, 0], [2, -1, 0], [2, 3, 4]])

console.log(matrix1.mul(matrix2).matrix) // [[1,6,1],[1,10,19],[2,16,36]]

// You can also chaining methods 
console.log(matrix1.sum(matrix2).sub(matrix3).matrix)
console.log(matrix1.transpose().matrix)
console.log(matrix1.inverse().matrix)

```


Dealing with big matrices? You can use the *multiply()* function that run a parallel algorithm on the GPU:


```javascript
const { Matrix:m } =  require('computational-linear-algebra-js')

const matrix1 = new m( m.randMat(512, 512, 1, 100) );
const matrix2 = new m( m.randMat(512, 512, 1, 100) );

Matrix.print(matrix1.multiply(matrix2).matrix)

```


### Vectors


```javascript
const { Vector:v } =  require('computational-linear-algebra-js')

const vector1 = new v([1,2,1]);
const vector2 = new v(-1,0,1);

// Static methods
//Get the norm of a vector
console.log(vector1.getNorm()); // 6
//Multiply a vector by a scalar
console.log(v.scalarProduct(vector1,5));//[5,10,5]
//Sum two vectors 
console.log(v.sum(vector1, vector2));  //[1,5,0]
//Subtract two vectors
console.log(v.sub(vector1, vector2)); // [[0,0,0],[1,2,-1],[2,6,1]]
//Dot product between two vectors
console.log(v.dotProduct(vector1, vector2)) //0
//Cross product between two vectors
console.log(v.crossProduct(vector1, vector2))// [2, -2, 2]


//Instance methods
const vector3 = new v([1,2,3])
const vector4 = new v([-1, 0 ,3])
const vector5 = new v([2, 4, -1])

console.log(vector3.sum(vector4).sub(vector5)) 
console.log(vector3.crossProduct(vector4))
console.log(vector4.scalarProduct(2))

```

### Linear Transformations


```javascript
const { LinearTransformation:tr } =  require('computational-linear-algebra-js')
const { Vector:v } =  require('computational-linear-algebra-js')
const { Matrix:m } =  require('computational-linear-algebra-js')


// You can instantiate a linear transformation using a bidimensional array
const t1 = new tr([[1,0,1],[2,0,-1],[1,1,1]]);  
// or you can also use the matrix object
const t2 = new tr(new m([[1,0,1],[2,0,-1],[1,1,1]])); 

//Apply the linear transformation to a vector
const vector = new v([1,2,0]);
console.log(t1.apply(vector)) //[1,4,-1]

```
