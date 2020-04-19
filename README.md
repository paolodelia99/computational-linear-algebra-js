# Computational Linear Algebra

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/paolodelia99/computational-linear-algebra.js.svg?branch=master)](https://travis-ci.org/paolodelia99/computational-linear-algebra.js)
[![Coverage Status](https://coveralls.io/repos/github/paolodelia99/computational-linear-algebra.js/badge.svg?branch=master)](https://coveralls.io/github/paolodelia99/computational-linear-algebra.js?branch=master)
[![License](https://img.shields.io/github/license/josdejong/mathjs.svg)](./license)


Computational Linear algebra is an extensive Javascript library for linear algebra.

## Features 

- Efficent 
- Runs on any JavaScript engine.
- OOP oriented
- type flexible
- open source

## Table of contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Build](#build)
- [Test](#test)
- [Todos](#todos)
- [License](#license)

## Usage

Computational-linear-algebra.js can be used in both node.js and in the browser.

Install computational-linear-algebra.js using npm

    npm install computational-linear-algebra
    
Note: not yet available on npm, It will be soon

## Documentation

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
console.log(Matrix.ijkMultiplication(matrix1, matrix2)) // [[1,6,1],[1,10,19],[2,16,36]]
//Get the inverse of a matrix
console.log(Matrix.getInverse(matrix)) //[[1,-2,1],[-0.125, 0.875, -0.375],[-0.25, -0.25, 0.25]]

```

If you wanna keep the changes inside the matrix object you can use the instance methods

```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( [[1,2,-1],[1,4,2],[2,6,5]] )
const matrix2 = new Matrix( [[1,2,-1],[0,2,3],[0,0,4]])
const matrix3 = new Matrix( [[1, 1, 0], [2, -1, 0], [2, 3, 4]])

console.log(matrix1.ijkMultiplication(matrix2).matrix) // [[1,6,1],[1,10,19],[2,16,36]]

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

console.log(matrix1.multiplication(matrix2));

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


## Build 

First clone the project from github:
    
    git clone git://https://github.com/paolodelia99/linear-algebra.js
    
    cd computational-linear-algebra

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

Continuous integration tests are run on [Travis CI](https://travis-ci.org/) and the test coverage is shown is [Coveralls](https://coveralls.io/) every time a commit is pushed to github.
The test results can be checked on https://travis-ci.org/github/paolodelia99/computational-linear-algebra.js. Travis CI runs the tests for different versions of node.js.

[![Travis CI](./misc/Travis-CI-logo.png)](https://github.com/paolodelia99/computational-linear-algebra.js/blob/master/misc/Travis-CI-logo.png) &nbsp;&nbsp;&nbsp;
[![BrowserStack](./misc/coveralls-logo-177x55.png)](https://coveralls.io/github/paolodelia99/computational-linear-algebra.js)

Thanks Travis CI for the generous free hosting of this open source project!

## Todos

- Matrix
    - [x] sum, subtraction
    - [x] transpose
    - [x] Orthogonality and orthonormality
    - [x] multiplication
        - [x] ijkMultiplication
        - [x] Strassen algorithm
        - [x] parallel multiplication using gpu.js 
    - [ ] Matrix decompositions
        - [x] LU
        - [ ] QR
        - [ ] Cholesky
        - [ ] Singular Value Decomposition
    - [ ] eigenvalues and eigenvectors
    - [ ] Precision 
    - [ ] matrix validity method (check if the input matrix is valid)
    - [ ] check if the matrix is upper triangular, lower triangular, symmetric, positive definite, orthogonal  
    - [ ] rank of the matrix
    - [ ] determinant without LU
    - [ ] determinant of the inverse
    - [ ] Hadamard product
    - [ ] Kronecker product
    - [ ] Rotation matrix
    
- Vector 
    - [x] sum, subtraction
    - [x] dot product
    - [x] cross product
    - [x] norm
    - [x] scalar product
    - [x] Euclidean distance between two vectors
    - [x] Orthogonality and orthonormality
    - [x] Angle between two vectors
    - [ ] Check Linear Dependency
    - [ ] Test post it orthonormality
    - [ ] Projections

- Linear Transformation
    - [x] Linear Transformation applied to vectors
    - [x] Linear Transformation applied to matrices
    - [ ] Injective, Surjective and Bijective
    - [ ] kernel
    - [ ] image
    - [ ] Projections
    
- Tensors
  
- class Vector Spaces ?? (see if it does make sense)
    
- Code Stuff
    - [x] compile js in prev version using babel
    - [ ] build npm package
    - [ ] better documentation
    - [ ] include in the coverage the methods that uses dependencies methods (parallel multiplication)
    - [ ] Compatible with Typescript
    - [ ] Test with Browser stack
    

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
