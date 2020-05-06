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
Matrix(matrix)
```

#### Parameters
matrix : **number[ ][ ]** - the two dimensional array the represent the matrix

## Attributes

```javascript
.matrix : number[ ][ ]
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
Matrix.zeros2dArr(rows, cols)
```

#### Parameters

- rows : **number** - the rows of the empty matrix
- cols : **number** - the columns of the empty matrix

#### Returns

**number[ ][ ]** the empty matrix of the given dimension

---

```javascript
Matrix.zeros2dSq(dim)
```

#### Parameters

- dim : **number** - the dimension of the empty square matrix

#### Returns

**number[ ][ ]** the empty square matrix of the given dimension

---

```javascript
Matrix.randInt2d(rows, cols, min, max)
```
Return a 2D array of the given dimension filled with random integers in the given range
#### Parameters

- rows : **number** - the rows of the matrix
- cols : **number** - the columns of the matrix
- min : **number** - the minimun number of the random range 
- max : **number** - the maximun number of the random range

#### Returns

**number[ ][ ]** a 2D array of the given dimension filled with random integers in the given range

---

```javascript
Matrix.identity2d(dim)
```
Return the identity matrix of the  given dimension

#### Parameters

- dim : **number** - the dimension of the identity matrix

#### Returns

**number[ ][ ]** a 2D array representing the identity matrix of the given dimension


---

```javascript
Matrix.clone(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array of the matrix obj to clone

#### Returns

**number[ ][ ]** a two 2D array representing the given matrix

---

```javascript
Matrix.isSquare(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix**- the 2D array of the matrix obj to check 

#### Returns

**boolean** true if the given matrix is square otherwise false

---

```javascript
Matrix.isOrthogonal(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array of the matrix obj to check 

#### Returns

**boolean** true if the matrix is an orthogonal matrix otherwise return false

---

```javascript
Matrix.trace(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix**- the 2D array of the matrix obj

#### Returns

**number** the trace of the given matrix


---

```javascript
Matrix.getTranspose(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array of the matrix obj to transpose

#### Returns

**number[ ][ ]** the transpose of the given matrix


---

```javascript
Matrix.print(matrix)
```
Print on the screen the given matrix
 
#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array of the matrix obj to print

---

```javascript
Matrix.getCol(matrix, col)
```
 
#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array of the matrix obj
- col : **number** - the number of the column of the matrix (starting form 0)

#### Returns 

**number [ ]**  the requested column of the given matrix 

---

```javascript
Matrix.getRow(matrix, row)
```
 
#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array or the matrix obj
- row : **number** - the number of the row of the matrix (starting form 0)

#### Returns 

**number [ ]**  the requested row of the given matrix 

---

```javascript
Matrix.getSubMatrix(matrix, startRow, endRow, startCol, endCol)
```
 
#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2D array of the matrix obj
- startRow : **number** - 
- endRow : **number** - 
- startCol : **number** -
- endCol : **number** -

#### Returns 

**number [ ][ ] | number [ ]** a sum matrix of the given matrix, which has the matrix rows in the [startRow, endRow] range and the columns in the [startCol, endCol] range  

---

```javascript
Matrix.gaussianElimination(matrix)
```
Reduce the given matrix in the row echelon form

#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2d array or the matrix obj to reduce at the row echelon form

#### Returns

**number [ ][ ]**  the given matrix reduced in the row echelon form

---

```javascript
Matrix.gaussianElimination(matrix, vector)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2d array or the matrix obj that represent the right part of the linear system
- vector : **number[ ]** - the array the represent the right part of the linear system

#### Returns
**number[ ]** the solution of the linear system [matrix|vector] using gaussian elimination

---

```javascript
Matrix.getLUDecomposition(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix** - the 2d array or the matrix obj to decompose using the LU decomposition

#### Returns
**{U : number[ ][ ], L: number[ ][ ]}**  decompose the give matrix using the LU decomposition and the return an Object formed by the U matrix and L matrix

---

```javascript
Matrix.solveUsingLU(lower, upper, rightPart)
```

#### Parameters

- lower : **number[ ][ ] | Matrix** - the 2d array or the matrix obj to decompose using the LU decomposition
- upper : **number[ ][ ] | Matrix** - 
- rightPart : **number[ ]** -

#### Returns
**number[ ]** solution of the linear system [matrix|vector] using the lu decomposition <!--fixme: more explicative line --> 

---

#### Matrix Operation - Sum

```javascript
Matrix.sum(matrix1, matrix2)
``` 

#### Parameters

- matrix1 : **number[ ][ ] | Matrix** - the first 2d array or the matrix obj 
- matrix2 : **number[ ][ ] | Matrix** - the second 2d array or the matrix obj

#### Returns 
**number [ ][ ]** the sum of the two matrices

#### Matrix Operation - Substraction

```javascript
Matrix.sub(matrix1, matrix2)
```

#### Parameters

- matrix1 : **number[ ][ ] | Matrix** - the first 2d array or the matrix obj 
- matrix2 : **number[ ][ ] | Matrix** - the second 2d array or the matrix obj

#### Returns 
**number [ ][ ]** the subtraction of the two matrices

#### Matrix Operation - Multiplication

```javascript
Matrix.mul(matrix1, matrix2)
```

Compute the matrix multiplication matrix1 x matrix2 using the naive method <!--fixme -->

#### Parameters

- matrix1 : **number[ ][ ] | Matrix** - the first 2d array or the matrix obj of the multiplication
- matrix2 **number[ ][ ] | Matrix** -  the second 2d array or the matrix obj of the multiplication

#### Returns

**number[ ][ ]** the multiplication of matrix1 x matrix2 

---

```javascript
Matrix.strassenAlgorithm(matrix1, matrix2)
```

Compute the matrix multiplication using the strasen algorithms 

#### Parameters

- matrix1 : **number[ ][ ] | Matrix** - the first 2d array or the matrix obj of the multiplication
- matrix2 **number[ ][ ] | Matrix** - the second 2d array or the matrix obj of the multiplication

#### Returns

**number[ ][ ]** the multiplication of matrix1 x matrix2 

---

```javascript
Matrix.multiply(matrix1, matrix2)
```

Efficient matrices multiplication using a parallel algorithm 

#### Parameters

- matrix1 : **number[ ][ ] | Matrix** - the first 2d array or the matrix obj of the multiplication
- matrix2 **number[ ][ ] | Matrix**  - the second 2d array or the matrix obj of the multiplication

#### Returns

**number[ ][ ]** the multiplication of matrix1 x matrix2 

---

> **Note** : the methods ijkMultiply, strassenMultiplication and multiply they do the same thing, but multiply is much more efficient since run on the gpu using a parallel algorithm, while strassenMultiplication has time complexity of O(n<sup>2.8</sup>) and the ijkMultiply is the most inefficent since has a time complexity of O(n<sup>3</sup>). So it's up to you to decide what to use!
   
---                 
                    
#### Instance Methods

```javascript
.getCopy()
```

#### Returns

**number[ ][ ]** the copy of the matrix

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
**number [ ][ ]**  the transpose of the matrix

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
**number [ ][ ]**  the invert of the matrix

---

```javascript
.inverts()
```

inverts the matrix object. This method can be chained

---

```javascript
.getDeterminant()
```

#### Returns
**number**  the determinant of the matrix

---

```javascript
.getCol(col)
```
return the requested column of the matrix

#### Parameters

- col : **number** the requested column

#### Returns
**number[ ]**  the determinant of the matrix


---


```javascript
.getRow(row)
```
 
#### Parameters

- row : **number** - the number of the row of the matrix (starting form 0)

#### Returns 

**number [ ]**  the requested row of the matrix 

---


```javascript
.sum(matrix)
```
Add the given matrix to the matrix

> this method can be chained

#### Parameters

- matrix : **number[ ][ ] | Matrix** 

---

```javascript
.sub(matrix)
```
Subtract the given matrix to the matrix

> this method can be chained

#### Parameters

- matrix : **number[ ][ ] | Matrix** 

---

```javascript
.isMatrixOrthogonal(matrix)
```

#### Parameters

- matrix : **number[ ][ ] | Matrix** 

#### Returns 
**boolean** true if is it orthogonal otherwise false

---

```javascript
.getSubMatrix(rowStart, rowEnd, colStart, colEnd)
```

<!--fixme: add description --->

#### Parameters

- rowStart : **number** 
- rowEnd : **number** 
- colStart : **number** 
- colEnd : **number** 

#### Returns 
**number [ ][ ] | number [ ]** the submatrix 

---

```javascript
.luDecomposition()
```
The LU Decomposition function that decompose the matrix in L and U

> After the function has finished, the L and U matrices are accessible to the via attributes **lower** and **upper**
 
---

```javascript
.solveUsingLU(rightPart)
```
Solve the linear system using lu decomposition

#### Parameters

- rightPart : **number [ ]** the vector <!-- fixme more explicative -->

> if you called the luDecompositon() function you can use the L and U matrices to solve the linear system A|b where b in this case is the rightPart vector

---

```javascript
.mul(matrix)
```
multiply the matrix by the given matrix

> this method can be chained

#### Parameters

- matrix : **number [ ][ ] | Matrix** 

<!-- fixme: example needed-->

> when the matrices are too big the multiply() function is called, multiply() performs the matrix multiplication 
> on the GPU using a parallel algorithm 


---
 
 ```javascript
.strassenMultiply(matrix)
 ```
multiply the matrix by the given matrix using the Strassen algorithm

> this method can be chained
 
#### Parameters
 
 - matrix : **number [ ][ ] | Matrix** 
  
---
 
 ```javascript
.hammardProduct(matrix)
 ```
Performs the hammard product of the matrix by the given matrix


> this method can be chained 

#### Parameters
 
 - matrix : **number [ ][ ] | Matrix** 
