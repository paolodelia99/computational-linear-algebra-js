# Computational Linear Algebra

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/paolodelia99/computational-linear-algebra-js.svg?branch=master)](https://travis-ci.org/paolodelia99/computational-linear-algebra-js)
[![Coverage Status](https://coveralls.io/repos/github/paolodelia99/computational-linear-algebra.js/badge.svg?branch=master)](https://coveralls.io/github/paolodelia99/computational-linear-algebra.js?branch=master)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](./license)
[![Docs](https://img.shields.io/badge/docs-in%20progress-orange)](https://paolodelia99.github.io/computational-linear-algebra-js/#/)

Computational Linear algebra is a Js library build just for fun and is aiming to be comprehensive Javascript library for linear algebra.

## Features 

- Efficient 
- Runs on any JavaScript engine
- flexible
- open source

## Table of contents

- [Usage](#usage)
- [Build](#build)
- [Test](#test)
- [Todos](#todos)
- [License](#license)

## Usage

Computational-linear-algebra.js can be used in both node.js and in the browser.

Install computational-linear-algebra.js using npm

    npm install computational-linear-algebra-js
    
### Node

```javascript
const { Matrix } =  require('computational-linear-algebra-js')
```

### Es6

```javascript
import { Matrix } from 'computational-linear-algebra-js'
```

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


Dealing with big matrices? You can use the *multiply()* function that run a parallel algorithm on the GPU:


```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( Matrix.randInt2d(1024, 1024, 1, 1000) );
const matrix2 = new Matrix( Matrix.randInt2d(1024, 1024, 1, 1000) );

Matrix.print(matrix1.multiply(matrix2).matrix)

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

For more info check out the [documentation](https://paolodelia99.github.io/computational-linear-algebra-js/#/).

## Build 

First clone the project from github:
    
    git clone git://https://github.com/paolodelia99/linear-algebra.js
    
    cd computational-linear-algebra-js

Install the project dependencies:

    npm install
    
Then, the project can be build by executing the build script via npm:

    npm run build

This will build the library linear.algebra.js and linear.algebra.min.js from the source files and
put them in the folder dist.

## Test

To execute tests for the library, install the project dependencies once:

    npm install

Then, the tests can be executed:

    npm test
    
### Continuous Integration testing 

Continuous integration tests are run on [Travis CI](https://travis-ci.org/) and [BrowserStack](https://www.browserstack.com/) every time a commit is pushed to github. The test coverage is shown is [Coveralls](https://coveralls.io/).
The test results can be checked on https://travis-ci.org/github/paolodelia99/computational-linear-algebra.js. Travis CI runs the tests for different versions of node.js., and BrowserStack runs the tests are run on all major browsers.

[![Travis CI](./misc/Travis-CI-logo.png)](https://github.com/paolodelia99/computational-linear-algebra.js/blob/master/misc/Travis-CI-logo.png) &nbsp;&nbsp;&nbsp;
[![Coveralls](./misc/coveralls-logo-177x55.png)](https://coveralls.io/github/paolodelia99/computational-linear-algebra.js) &nbsp;&nbsp;&nbsp;
![BrowserStack](./misc/browserstack.png)

Thanks Travis CI and BrowserStack for the generous free hosting of this open source project!

## Todos

Do you like math and are you looking forward to contribute to an open source project?? Contributors are welcome! But before starting check out the [Contributing.md](./CONTRIBUTING.MD) 

For those that wanna contribute to the project here's a todoList! Enjoy!

- Matrix
    - [x] sum, subtraction
    - [x] transpose
    - [x] Orthogonality and orthonormality
    - [x] multiplication
        - [x] ijkMultiplication
        - [x] Strassen algorithm
        - [x] parallel multiplication using gpu.js 
        - [x] remove ijkMul in favour of the funcional way, more faster
    - [x] Gaussian elimination
    - [ ] Matrix decompositions
        - [x] LU
        - [x] QR
        - [ ] Cholesky
        - [ ] Singular Value Decomposition
    - [ ] eigenvalues and eigenvectors
        - [x] Jacobi algo for eigenvalues
        - [ ] algo to find the eigenvectors
    - [ ] Improve precision (floating point numbers) 
    - [ ] matrix check
        - [x] orthogonal
        - [x] symmetric
        - [ ] positive definite
        - [ ] upper triangular
        - [ ] lower triangular
    - [ ] rank of the matrix
    - [ ] Determinant
        - [ ] rewrite the algo to compute the determinant
    - [x] Hadamard product
    - [ ] Kronecker product
    - [x] Rotation matrix (Given rotation matrix)
    - [ ] Matrix norm 
        - [x] Frobenius norm
        - [ ] L1 norm
        - [ ] L2 norm
        - [ ] L-Infinity norm 
    - [ ] Pseudo-Inverse
    - [ ] reshape function
    - [ ] redo the Inverse of a Matrix
    - [ ] Add resize function 
    
- Vector 
    - [x] sum, subtraction
    - [x] dot product
    - [x] cross product
    - [x] norm
    - [x] scalar product
    - [x] Euclidean distance between two vectors
    - [x] Orthogonality and orthonormality
    - [x] Angle between two vectors
    - [ ] redefine the difference between row an col vector and see if does make sense
    - [ ] Check Linear Dependency of the given vectors
    - [ ] Test post it orthonormality
    - [ ] Projection of a vector on another vector
    - [ ] outer product

- Linear Transformation
    - [x] Linear Transformation applied to vectors
    - [x] Linear Transformation applied to matrices
    - [ ] Injective, Surjective and Bijective
    - [ ] kernel
    - [ ] image
    
- Tensors
    - [ ] super class of Vector and Matrix
    - [ ] generic n-d array
    - [ ] Tensor algebra computations
      
- Code Stuff
    - [ ] C++ addons for improve the performance
        - [ ] more used fuction (matrix multiplication,...)
    - [x] compile js in prev version using babel
    - [x] build npm package
    - [ ] better documentation
        - [ ] add squeeze function to the matrix class
        - [x] add rotations
        - [ ] add new types of vector and matrix creation
    - [ ] include in the coverage the methods that uses dependencies methods (parallel multiplication)
    - [ ] Compatible with Typescript
    - [ ] Browser cdn
    - [x] Test with Browser stack

## License

Copyright 2020 Paolo D'Elia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
