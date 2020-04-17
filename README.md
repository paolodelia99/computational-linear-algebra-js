# Computational Linear Algebra

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/paolodelia99/computational-linear-algebra.js.svg?branch=master)](https://travis-ci.org/paolodelia99/computational-linear-algebra.js)
<a href='https://coveralls.io/github/paolodelia99/computational-linear-algebra.js'><img src='https://coveralls.io/repos/github/paolodelia99/computational-linear-algebra.js/badge.svg' alt='Coverage Status' /></a>

Computational Linear algebra is an extensive Javascript library for linear algebra.

## Features 
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

```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( [[1,2,-1],[1,4,2],[2,6,5]] );
const matrix2 = new Matrix( [[1,2,-1],[0,2,3],[0,0,4]] );

//Transpose a matrix
console.log(matrix1.getTranspose());//[[1,1,2],[2,4,6],[-1,2,5]]
//Sum two matrices
console.log(matrix1.sum(matrix2));  //[[2,4,-2],[1,6,5],[2,6,9]]
//Subtract two matrices
console.log(matrix1.sub(matrix2)); // [[0,0,0],[1,2,-1],[2,6,1]]
//Multiply two matrices
console.log(matrix1.ijkMultiplication(matrix2)); // [[1,6,1],[1,10,19],[2,16,36]]
//Get the inverse of a matrix
console.log(matrix.getInverse()) //[[1,-2,1],[-0.125, 0.875, -0.375],[-0.25, -0.25, 0.25]]

```

Dealing with big matrices? You can use the *multipication()* function that run a parallel algorithm on the GPU:

```javascript
const { Matrix } =  require('computational-linear-algebra-js')

const matrix1 = new Matrix( Matrix.createRandomMatrix(512, 512, 1, 100) );
const matrix2 = new Matrix( Matrix.createRandomMatrix(512, 512, 1, 100) );

console.log( matrix1.multiplication(matrix2));

```

### Vectors

```javascript
const { Vector } =  require('computational-linear-algebra-js')

const vector1 = new Vector([1,2,1]);
const vector2 = new Vector(-1,0,1);

//Get the norm of a vector
console.log(vector1.getNorm()); // 6
//Multiply a vector by a scalar
console.log(vector1.scalarProduct(5));//[5,10,5]
//Sum two vectors 
console.log(vector1.sum(vector2));  //[1,5,0]
//Subtract two vectors
console.log(vector1.sub(vector2)); // [[0,0,0],[1,2,-1],[2,6,1]]
//Dot product between two vectors
console.log(vector1.dotProduct(vector2)) //0
//Cross product between two vectors
console.log(vector1.crossProduct(vector2))// [2, -2, 2]
```

### Linear Transformations

```javascript
const { LinearTransformation } =  require('computational-linear-algebra-js')

// You can instantiate a linear tranformation using a bidimensional array
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
    
//todo: finisci

## Test

To execute tests for the library, install the project dependencies once:

    npm install

Then, the tests can be executed:

    npm test

## Todos

- Matrix
    - [ ] Precision 
    - [ ] matrix validity method (check if the input matrix is valid)
    - [ ] check if the matrix is upper triangular, lower triangular, symmetric, positive definite, orthogonal  
    - [ ] rank of the matrix
    - [ ] determinant without LU
    - [ ] determinant of the inverse
    - [ ] Hadamard product
    - [ ] Kronecker product
    - [x] Implement a more efficient multiplication
        -[x] gpu.js 
    - [ ] Implement other decomposition
        - [ ] QR
        - [ ] Cholesky
        - [ ] Singular Value Decomposition
    - [ ] eigenvalues and eigenvectors
    
- Vector 
    - [ ] Euclidean distance between two vectors
    - [ ] Check Linear Dependency

- Linear Transformation
    - [ ] Injective, Surjective => Bijective
    - [ ] Linear Transformation applyed to matrices
    - [ ] kernel
    - [ ] image
    - [ ] injectvity and surjectivity

- Tensors
  
- class Vector Spaces ?? (see if it does make sense)

- Analytical Geometry ??
    - [ ] inner products
    - [ ] length and distances
    - [ ] Angles and orthogonality
    - [ ] rotations
    
- Code Stuff
    - [x] compile js in prev version using babel
    - [ ] build npm package
    - [ ] better documentation
    - [x] maximise the coverage
    - [ ] Compatible with Typescript
    

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
