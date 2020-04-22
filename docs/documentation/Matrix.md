# Matrix

Class Representing the matrix 

## Table of contents

 - [Constructor](#Constructor)
 - [Attributes](#attributes)
 - [Methods](#methods)
    - [Static methods](#static-methods)
    - [Instance methods](#instance-methods)
    
## Constructor

```javascript
Matrix(matrix : number[][])
```

#### Parameters
matrix - the two dimensional array the represent the matrix

## Attributes

```javascript
.matrix : number[][]
```
the two dimensional
 array representing the matrix

```javascript
.isSquare : boolean
```

isSquare is true if the matrix is a square matrix otherwise is false

```javascript
.rows : number
```

the number of rows of the matrix

```javascript
.cols : number
```

the number of cols of the matrix

## Methods

### Static Methods

#### Matrix Creation

```javascript
Matrix.createEmptyMatrix(rows, cols)
```

#### Parameters

- rows **number** - the rows of the empty matrix
- cols **number** - the columns of the empty matrix

#### Returns

**number[][]** the empty matrix of the give dimension

---

```javascript
Matrix.createEmptySquareMatrix(dim: number) : number[][]
```
Return an empty Square 2D array of the given dimension
#### Parameters

- dim - the dimension of the empty square matrix

---

```javascript
Matrix.createRandomMatrix(rows: number, cols: number, min: number, max: number) : number[][]
```
Return a 2D array of the given dimension filled with random integers in the given range
#### Parameters

- rows - the rows of the matrix
- cols - the columns of the matrix
- min - the minimun number of the random range 
- max - the maximun number of the random range

---

```javascript
Matrix.createIdentityMatrix(dim : number) : number[][]
```
Return the identity matrix of the  given dimension

#### Parameters

- dim - the dimension of the identity matrix

---

```javascript
Matrix.cloneMatrix(matrix : number[][] | Matrix) : number[][]
```
Return a two 2D array representing the given matrix

#### Parameters

- matrix - the 2D array of the matrix obj to clone

---

```javascript
Matrix.isMatrixSquare(matrix : number[][] | Matrix) : number[][]
```
Return true if the given matrix is square otherwise false

#### Parameters

- matrix - the 2D array of the matrix obj to check 

---

```javascript
Matrix.isMatrixOrthogonal(matrix : number[][] | Matrix) : number[][]
```
Return the true if the matrix is an orthogonal matrix otherwise return false

#### Parameters

- matrix - the 2D array of the matrix obj to check 

---

```javascript
Matrix.trace(matrix : number[][] | Matrix) : number
```
Return the trace of the given matrix

#### Parameters

- matrix - the 2D array of the matrix obj

---

```javascript
Matrix.getTranspose(matrix : number[][] | Matrix) : number[][]
```
Return the transpose of the given matrix

#### Parameters

- matrix - the 2D array of the matrix obj to transpose

---

```javascript
Matrix.printMatrix(matrix : number[][] | Matrix)
```
Print on the screen the given matrix
 
#### Parameters

- matrix - the 2D array of the matrix obj to print

---

```javascript
Matrix.getCol(matrix : number[][] | Matrix, col: number) : number[]
```
return the requested column of the given matrix 
 
#### Parameters

- matrix - the 2D array of the matrix obj
- col - the number of the column of the matrix (starting form 0)

---


```javascript
Matrix.getSubMatrix(matrix : number[][] | Matrix, startRow: number, endRow: number, startCol: number, endCol: number) : number[][] | number[]
```
Return a sum matrix of the given matrix, which has the matrix rows in the [startRow, endRow] range and the columns in the [startCol, endCol] range  
 
#### Parameters

- matrix - the 2D array of the matrix obj
- startRow - 
- endRow - 
- startCol -
- endCol -

---

```javascript
Matrix.gaussianElimination(matrix: number[][] | Matrix) : number[][]
```
Reduce the given matrix in the row echelon form

#### Parameters

- matrix - the 2d array or the matrix obj to reduce at the row echelon form

---

```javascript
Matrix.gaussianElimination(matrix: number[][] | Matrix, vector: number[]) : number[]
```
Solve the linear system [matrix|vector] using gaussian elimination

#### Parameters

- matrix - the 2d array or the matrix obj that represent the right part of the linear system
- vector - the array the represent the right part of the linear system

---

```javascript
Matrix.getLUDecomposition(matrix: number[][] | Matrix) : {U : number[][], L: number[][]}
```
Decompose the give matrix using the LU decomposition and the return an Object formed by the U matrix and L matrix

#### Parameters

- matrix - the 2d array or the matrix obj to decompose using the LU decomposition

---

```javascript
Matrix.solveUsingLU(lower: number[][] | Matrix, upper: number[][] | Matrix, rightPart: number[] ): number[]
```
Solve the linear system [matrix|vector] using the lu decomposition {/*fixme: more explicative line*/}

#### Parameters

- lower - the 2d array or the matrix obj to decompose using the LU decomposition
- upper - 
- rightPart -

---

#### Matrix Operation - Sum

```javascript
Matrix.sum(matrix1: number[][] | Matrix, matrix2: number[][] | Matrix): number[][]
```
Return the sum of the two matrices 

#### Parameters

- matrix1 - the first 2d array or the matrix obj 
- matrix2 - the second 2d array or the matrix obj

#### Matrix Operation - Substraction

```javascript
Matrix.sub(matrix1: number[][] | Matrix, matrix2: number[][] | Matrix): number[][]
```
Return the subtraction of the two matrices

#### Parameters

- matrix1 - the first 2d array or the matrix obj 
- matrix2 - the second 2d array or the matrix obj

#### Matrix Operation - Multiplication

```javascript
Matrix.ijkMultiply(matrix1, matrix2)
```

Compute the matrix multiplication matrix1 x matrix2 using the naive method {/*fixme*/}

#### Parameters

- matrix1 : **number[][] | Matrix** - the first 2d array or the matrix obj of the multiplication
- matrix2 **number[][] | Matrix** -  the second 2d array or the matrix obj of the multiplication

#### Returns

**number[][]** the multiplication of matrix1 x matrix2 

---

```javascript
Matrix.strassenAlgorithm(matrix1, matrix2)
```

Compute the matrix multiplication using the strasen algorithms 

#### Parameters

- matrix1 : **number[][] | Matrix** - the first 2d array or the matrix obj of the multiplication
- matrix2 **number[][] | Matrix** - the second 2d array or the matrix obj of the multiplication

#### Returns

**number[][]** the multiplication of matrix1 x matrix2 

---

```javascript
Matrix.multiply(matrix1, matrix2)
```

Efficient matrices multiplication using a parallel algorithm 

#### Parameters

- matrix1 : **number[][] | Matrix** - the first 2d array or the matrix obj of the multiplication
- matrix2 **number[][] | Matrix**  - the second 2d array or the matrix obj of the multiplication

#### Returns

**number[][]** the multiplication of matrix1 x matrix2 

---

<p><b>Note</b>: the methods ijkMultiply, strassenMultiplication and multiply they do the same thing, but multiply is much more efficient since run on the gpu using a parallel algorithm,
                    while strassenMultiplication has time complexity of O(n<sup>2.8</sup>) and the ijkMultiply is the most inefficent since has a time complexity of O(n<sup>3</sup>).
                    So it's up to you to decide what to use!</p>
                    
                    
#### Instance Methods

```javascript
.getCopy()
```

#### Returns

**number[][]** the copy of the matrix

---

```javascript
.printMatrix()
```
Print the matrix on the screen

---

```javascript
.isMatrixSquare()
```

#### Returns
**boolean**  true if the matrix is square otherwise return false

---

```javascript
.getTrace()
```

#### Returns
**number**  the trace of the matrix

---

```javascript
.getTranspose()
```

#### Returns
**number [][]**  the transpose of the matrix

---

```javascript
.transpose()
```

transpose the matrix object. This method can be chained

#### example

```javascript
const matrix1 = new Matrix([[1, 0, 3], [0, 2, 1]])
const matrix2 = new Matrix([[1, 0, 3], [0, 2, 1]])

console.log(matrix1.transpose().matrix) // // [[1, 0], [0, 2], [3, 1]]
console.log(matrix1.transpose().transpose().matrix) // [[1, 0, 3], [0, 2, 1]]
```

---

```javascript
.getInverse()
```

#### Returns
**number [][]**  the invert of the matrix

---

```javascript
.inverts()
```

inverts the matrix object. This method can be chained
