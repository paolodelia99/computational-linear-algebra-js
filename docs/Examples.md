# Examples

### Matrices

All the methods can accept both Matrix object and a bidimensional array, so you don't have to worry about 
of what kind of object you've passed to a method


```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( [[1,2,-1],[1,4,2],[2,6,5]] );
const matrix2 = [[1,2,-1],[0,2,3],[0,0,4]]

// Static Methods
//Transpose a matrix
console.log(Matrix.getTranspose(matrix1)) //[[1,1,2],[2,4,6],[-1,2,5]]
//Sum two matrices
console.log(Matrix.sum(matrix1, matrix2)) //[[2,4,-2],[1,6,5],[2,6,9]]
//Subtract two matrices
console.log(Matrix.sub(matrix1, matrix2)) // [[0,0,0],[1,2,-1],[2,6,1]]
//Multiply two matrices
console.log(Matrix.mul(matrix1, matrix2)) // [[1,6,1],[1,10,19],[2,16,36]]
//Get the inverse of a matrix
console.log(Matrix.getInverse(matrix)) //[[1,-2,1],[-0.125, 0.875, -0.375],[-0.25, -0.25, 0.25]]

```


If you wanna keep the changes inside the matrix object you can use the instance methods


```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( [[1,2,-1],[1,4,2],[2,6,5]] )
const matrix2 = new Matrix( [[1,2,-1],[0,2,3],[0,0,4]])
const matrix3 = new Matrix( [[1, 1, 0], [2, -1, 0], [2, 3, 4]])

console.log(matrix1.mul(matrix2).matrix) // [[1,6,1],[1,10,19],[2,16,36]]

// You can also chaining methods 
console.log(matrix1.sum(matrix2).sub(matrix3).matrix)
console.log(matrix1.transpose().matrix)
console.log(matrix1.inverse().matrix)

```


Dealing with big matrices? You can use the *multipication()* function that run a parallel algorithm on the GPU:


```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( Matrix.createRandomMatrix(512, 512, 1, 100) );
const matrix2 = new Matrix( Matrix.createRandomMatrix(512, 512, 1, 100) );

Matrix.print(matrix1.multiplication(matrix2).matrix)

```


### Vectors


```javascript
const { Vector } =  require('computational-linear-algebra-js')

const vector1 = new Vector([1,2,1]);
const vector2 = new Vector(-1,0,1);

// Static methods
//Get the norm of a vector
console.log(vector1.getNorm()); // 6
//Multiply a vector by a scalar
console.log(Vector.scalarProduct(vector1,5));//[5,10,5]
//Sum two vectors 
console.log(Vector.sum(vector1, vector2));  //[1,5,0]
//Subtract two vectors
console.log(Vector.sub(vector1, vector2)); // [[0,0,0],[1,2,-1],[2,6,1]]
//Dot product between two vectors
console.log(Vector.dotProduct(vector1, vector2)) //0
//Cross product between two vectors
console.log(Vector.crossProduct(vector1, vector2))// [2, -2, 2]


//Instance methods
const vector3 = new Vector([1,2,3])
const vector4 = new Vector([-1, 0 ,3])
const vector5 = new Vector([2, 4, -1])

console.log(vector3.sum(vector4).sub(vector5)) 
console.log(vector3.crossProduct(vector4))
console.log(vector4.scalarProduct(2))

```

### Linear Transformations


```javascript
const { LinearTransformation } =  require('computational-linear-algebra-js')

// You can instantiate a linear transformation using a bidimensional array
const t1 = new LinearTransformation([[1,0,1],[2,0,-1],[1,1,1]]);  
// or you can also use the matrix object
const t2 = new LinearTransformation(new Matrix([[1,0,1],[2,0,-1],[1,1,1]])); 

//Apply the linear transformation to a vector
const vector = new Vector([1,2,0]);
console.log(t1.apply(vector)) //[1,4,-1]

```
