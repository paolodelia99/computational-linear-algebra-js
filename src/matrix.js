import { zip, dotProduct, zipWith, product } from './utils/functions'

const { GPU } = require('gpu.js')
const { Vector } = require('./vector')

export class Matrix {
    lower // The lower decomposition of the matrix using LU decomp
    upper // The Upper decomposition of the matrix using LU decomp

    /**
     * Constructor of the matrix class
     * @param {number[][]} matrix :  can be a bidimensional array or a list of
     *                arrays
     */
    constructor (matrix) {
      this._matrix = matrix
      this.isSquare = this.isSquare()
      this.rows = matrix.length
      this.cols = this.isSquare ? this.rows : matrix[0].length
      if (this.rows === this.cols) {
        this.luDecomposition()
      }
      this.determinant = this.isSquare ? this.getDeterminant() : null
    }

    /**
     * Create an empty matrix of the given dimension
     * @param {number} row
     * @param {number} col
     * @returns {number[][]} return a empty matrix of the give dimension
     */
    static zeros2dArr = (row, col) => Array(row).fill().map(() => Array(col).fill(0));

    /**
     *
     * @param {number} row the number of rows
     * @param {number} col the number of cols
     * @returns {Matrix} Matrix obj of the given dimension fill with zeros
     */
      static zeros = (row, col) => new Matrix(Matrix.zeros2dArr(row, col))

    /**
     * Create an empty square matrix of the given dimension
     * @param {number} dim  : dimension of the matrix
     * @returns {number[][]} empty square matrix of the given dimension
     */
    static zeros2dSq = (dim) => Array(dim).fill().map(() => Array(dim).fill(0));

    /**
     *
     * @param {number} dim the dimension of the square matrix
     * @returns {Matrix} a square Matrix obj of the given dimension fill with zeros
     */
      static zeroSq = dim => new Matrix(Matrix.zeros2dSq(dim))

    /**
     * Create a matrix of the given dimension, filling it with random numbers of the
     * given range
     * @param {number} rows rows of the matrix
     * @param {number} cols cols of the matrix
     * @param {number} min min number of the range
     * @param {number} max max number of the range
     * @returns {number[][]} random of the given dimension
     */
    static randInt2d = (rows, cols, min, max) => {
      const matrix = Matrix.zeros2dArr(rows, cols)

      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          let num = parseInt(Math.random() * (max - min) + min)
          if (num === 0) { num = Math.abs(num) }
          matrix[i][j] = num
        }
      }

      return matrix
    };

    /**
     *
     * @param {number} rows the rows of the matrix
     * @param {number} cols the cols of the matrix
     * @param {number} min the minimum integer of the range
     * @param {number} max the maximum integer of the range
     * @returns {Matrix} matrix obj of the given dimension fill with numbers of the given range
     */
      static randInt = (rows, cols, min, max) => new Matrix(Matrix.randInt2d(rows, cols, min, max))

    /**
     * Return the identity matrix of the given dimension
     * @param {number} dim
     * @returns {number[][]} Return the identity matrix of the given dimension
     */
    static identity2d = (dim) => {
      const idMatrix = Matrix.zeros2dSq(dim)

      for (let i = 0; i < dim; i++) { idMatrix[i][i] = 1 }

      return idMatrix
    };

    /**
     *
     * @param {number} dim
     * @returns {Matrix} the matrix obj representing the identity matrix
     */
      static identity = dim => new Matrix(Matrix.identity2d(dim))

      /**
     *
     * @param {number} dim the dimension of the 2d array that represent the rotMatrix
     * @param {number} angle the rotation angle
     * @param {string} angleType the type of angle passed which can be rad or deg
     * @param {number} i // fixme da scrivere qualcosa
     * @param {number} j // fixme da scrivere qualcosa
     * @returns { number[][] } the n dimensional rotation matrix of the given dimension and angle
     */
      static rot2d = (dim, angle, angleType = 'deg', i = 1, j = 2) => {
        angle = angleType === 'deg' ? (angle * Math.PI) / 180 : angle
        const c = Math.cos(angle)
        const s = Math.sin(angle)
        if (dim === 2) {
          return [[c, -s], [s, c]]
        } else if (dim === 3) {
          if (i === 1) {
            return [[1, 0, 0], [0, c, -s], [0, s, c]]
          } else if (i === 2) {
            return [[c, 0, s], [0, 1, 0], [-s, 0, c]]
          } else {
            return [[c, -s, 0], [s, c, 0], [0, 0, 1]]
          }
        } else {
          const idMatrix = Matrix.identity2d(dim)
          idMatrix[i - 1][i - 1] = c
          idMatrix[i - 1][j - 1] = -s
          idMatrix[j - 1][i - 1] = s
          idMatrix[j - 1][j - 1] = c
          return idMatrix
        }
      }

      /**
     *
     * @param {number} dim
     * @param {number} angle
     * @param {string} angleType
     * @param {number} i
     * @param {number} j
     * @returns {Matrix} the matrix object representing the given rotation
     */
      static rot = (dim, angle, angleType = 'deg', i = 1, j = 2) => new Matrix(Matrix.rot2d(dim, angle, angleType, i, j))

    /**
     * Method that return the two dimensional array that represent the matrix
     * no matter if it passed a matrix object or a two dimensional array
     * @param {number[][] | Matrix | number[] | Vector} matrix
     * @returns {number[][]} the two dimensional array thar represent the matrix
     */
    static checkMatrixType = matrix => {
      if (matrix instanceof Vector || (Array.isArray(matrix) && typeof matrix[0] === 'number')) { return Array.isArray(matrix) ? matrix : matrix.vector } else { return Array.isArray(matrix) ? matrix : matrix.matrix }
    };

    /**
     * Method that return the two dimensional array that represent the matrix
     * no matter if it passed a matrix object or a two dimensional array
     * @param {number[][] | Matrix | number[] | Vector} matrix
     * @returns {number[][]} the two dimensional array thar represent the matrix
     */
    checkMatrixType = matrix => Matrix.checkMatrixType(matrix);

    /**
     * Clone the matrix
     * @returns {number[][] | Matrix}
     */
    static clone = (matrix) => Array.isArray(matrix) ? matrix.map(a => a.slice()) : matrix._matrix.map(a => a.slice());

    /**
     * Get a copy of the matrix
     * @returns {number[][]} the bi-dimensional array that represent the matrix
     */
    copy = () => Matrix.clone(this.matrix);

    /**
     *  Squeeze the matrix into an array
     * @param {number[][] | Matrix} matrix
     * @returns {number[]} the array representing the matrix
     */
      static squeeze = matrix => {
        // Check matrix type
        matrix = Matrix.checkMatrixType(matrix)

        let arr = []

        for (let i = 0; i < matrix.length; i++) {
          arr = arr.concat(matrix[i])
        }

        return arr
      }

    /**
     * static method that checks if a matrix is square
     * @param {number[][] | Matrix} matrix
     * @returns {boolean} true if is square otherwise false
     */
    static isSquare = (matrix) => {
      // Check the matrix type
      matrix = Array.isArray(matrix) ? matrix : matrix.matrix

      let isSquare = true
      const n = matrix.length // dimension of the matrix

      for (let i = 0; i < n; i++) {
        if (matrix[i].length !== n) {
          isSquare = false
          break
        }
      }

      return isSquare
    };

    /**
     * Check if a matrix is square
     * @returns {boolean} true if is square otherwise false
     */
    isSquare = () => Matrix.isSquare(this._matrix);

    /**
     * If the passed matrix is square it return the trace of the given matrix
     * @param {number[][] | Matrix} matrix
     * @returns {number} the trace of the give matrix
     */
    static trace = matrix => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)
      // Initialize the trace
      let trace = 0

      for (let i = 0; i < matrix.length; i++) { trace += matrix[i][i] }

      return trace
    };

    /**
     * Return the matrix trace, if the matrix is square
     * @returns {number} the trace of the matrix
     */
    trace = () => Matrix.trace(this.matrix);

    /**
     * Static function the return the transpose of the given matrix
     * @param {number[][] | Matrix} matrix
     * @returns {number[][]}
     */
    static getTranspose = matrix =>
      Array.isArray(matrix) ? matrix[0].map((_, iCol) => matrix.map(row => row[iCol])) : matrix.matrix[0].map((_, iCol) => matrix.map(row => row[iCol]));

    /**
     * Get the transpose of the matrix
     * @returns {number[][]} the transpose matrix
     */
    getTranspose = () =>
      Matrix.getTranspose(this._matrix);

    /**
     * Transpose the matrix
     * @returns {Matrix}
     */
    transpose = () => {
      this._matrix = Matrix.getTranspose(this._matrix)
      return this
    }

    /**
     * Static method for printing matrix
     * @param { number[][] | Matrix}matrix
     */
    static print = (matrix) => Array.isArray(matrix) ? matrix.map(x => console.log(x)) : matrix.matrix.map(x => console.log(x));

    /**
     * Print the matrix
     */
    print = () => Matrix.print(this._matrix);

    // fixme: redo
    /**
     * Static method that compute the inverse of the give matrix
     * @param {number[][] | Matrix} matrix
     * @returns {number[][]} Return the inverse of the given matrix
     */
    static getInverse = matrix => {
      // todo: check if the determinant is different than zero
      if (!Matrix.isSquare(matrix)) {
        throw new Error("You can't get the inverse of a non square matrix")
      } else {
        matrix = Array.isArray(matrix) ? matrix : matrix.matrix

        const identityMatrix = Matrix.identity2d(matrix.length)
        const inverse = []
        const { L, U } = Matrix.luDecomposition(matrix)

        for (let j = 0; j < matrix.length; j++) { inverse.push(Matrix.solveUsingLU(L, U, Matrix.getCol(identityMatrix, j))) }

        // Transpose the inverse before returning
        return Matrix.getTranspose(inverse)
      }
    };

    /**
     * Compute the inverse of a matrix
     * @returns {number[][]}
     */
    getInverse = () => {
      if (!this.isSquare) {
        throw new Error("You can't get the inverse of a non square matrix")
      }

      if (this.determinant === 0) {
        throw new Error('The determinant is 0! The inverse does not exist!')
      } else {
        const identityMatrix = Matrix.identity2d(this.rows)
        const inverse = []

        for (let j = 0; j < this.rows; j++) {
          inverse.push(this.solveUsingLU(Matrix.getCol(identityMatrix, j)))
        }

        // Transpose the inverse before returning
        return Matrix.getTranspose(inverse)
      }
    };

    /**
     * Inverse the matrix
     * @returns {Matrix}
     */
    inverts = () => {
      this._matrix = Matrix.getInverse(this._matrix)
      return this
    }

    /**
     * Compute the determinant of a matrix
     * @returns {number}
     */
    getDeterminant = () => {
      if (this.rows !== this.cols) {
        throw new Error('Non square matrix has no determinant')
      } else {
        let det = 1
        // the determinant it's just the product of the U diagonal
        for (let i = 0; i < this.rows; i++) { det *= this.upper[i][i] }

        return det
      }
    };

    /**
     * Static method that return the input column of the given matrix
     * @param {number[][] | Matrix} matrix
     * @param {number} col the requested column
     * @returns {number[]}  requested column in form of the col
     */
    static getCol = (matrix, col) => {
      matrix = Matrix.checkMatrixType(matrix)

      const column = []

      for (let i = 0; i < matrix.length; i++) { column.push(matrix[i][col]) }

      return column
    };

    /**
     * return the given column of the matrix
     * @param {number} col
     * @returns {number[]} the request column of the matrix
     */
    getCol = col => Matrix.getCol(this.matrix, col);

    /**
     * Return the requested column of the given matrix
     * @param {number[][] | Matrix} matrix
     * @param {number} i the i-th col of the matrix
     * @returns {number[]} an array representing the i-th col of the matrix
     */
      static getRow = (matrix, i) => {
        matrix = Matrix.checkMatrixType(matrix)
        return matrix[i]
      }

      /**
     * Return the requested column of the matrix
     * @param {number} i the ith col of the matrix
     * @returns {number[]} an array representing the i-th col of the matrix
     */
      getRow = i => Matrix.getRow(this._matrix, i)

    /**
     * Static method that compute sum sum of the given matrices
     * @param {number[][] | Matrix} matrix1
     * @param {number[][] | Matrix} matrix2
     * @returns {number[][]}
     */
    static sum = (matrix1, matrix2) => {
      // Check matrices types
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)

      if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Cannot sum two matrices with different dimension')
      } else {
        const resMatrix = Matrix.zeros2dArr(matrix1.length, matrix1[0].length)

        for (let i = 0; i < matrix1.length; i++) {
          for (let j = 0; j < matrix2.length; j++) { resMatrix[i][j] = matrix1[i][j] + matrix2[i][j] }
        }

        return resMatrix
      }
    };

    /**
     * Instance method the compute the sum of two matrices calling the static method
     * @param {number[][] | Matrix} matrix
     * @returns {Matrix} the sum of the two matrices
     */
    sum = matrix => {
      this._matrix = Matrix.sum(this._matrix, matrix)
      return this
    }

    /**
     * Static method that compute the subtraction of two matrices
     * @param {number[][] | Matrix} matrix1
     * @param {number[][] | Matrix} matrix2
     * @returns {number[][]} the subtract matrix
     */
    static sub = (matrix1, matrix2) => {
      // Check matrices types
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)

      if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Cannot subtract two matrices with different dimension')
      } else {
        const resMatrix = Matrix.zeros2dArr(matrix1.length, matrix1[0].length)

        for (let i = 0; i < matrix1.length; i++) {
          for (let j = 0; j < matrix2.length; j++) { resMatrix[i][j] = matrix1[i][j] - matrix2[i][j] }
        }

        return resMatrix
      }
    };

    /**
     * Subtract the given matrix to the matrix object
     * @param {number[][] | Matrix} matrix
     * @returns {Matrix}
     */
    sub = matrix => {
      this._matrix = Matrix.sub(this._matrix, !Array.isArray(matrix) ? matrix.matrix : matrix)
      return this
    }

    /**
   * Check if the give matrix is orthogonal
   * @param {number[][] | Matrix} matrix
   * @returns {boolean} true if is orthogonal otherwise false
   */
    static isOrthogonal = matrix => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)

      const inverse = Matrix.getInverse(matrix)
      const transpose = Matrix.getTranspose(matrix)

      return JSON.stringify(inverse) === JSON.stringify(transpose)
    }

    /**
     * Return true if the matrix is orthogonal otherwise false
     * @returns {boolean} true if is it orthogonal otherwise false
     */
    isOrthogonal = () => Matrix.isOrthogonal(this.matrix)

    /**
     * Get a subMatrix of the given matrix
     * @param {number[][] | Matrix} matrix
     * @param {number} startRow
     * @param {number} endRow
     * @param {number} startCol
     * @param {number} endCol
     * @returns {number[][] | number[]}
     */
    static getSubMatrix = (matrix, startRow, endRow, startCol, endCol) => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)

      const subMatrix = Matrix.zeros2dArr((endRow - startRow) + 1, (endCol - startCol) + 1)

      for (let i = 0; i < subMatrix.length; i++) {
        for (let j = 0; j < subMatrix[i].length; j++) { subMatrix[i][j] = matrix[startRow + i][startCol + j] }
      }

      return subMatrix
    };

    /**
     * Get the sub matrix
     * @param {number} rowStart
     * @param {number} rowEnd
     * @param {number} colStart
     * @param {number} colEnd
     * @returns {number[][] | number[]} sub matrix
     */
    getSubMatrix = (rowStart, rowEnd, colStart, colEnd) => Matrix.getSubMatrix(this._matrix, rowStart, rowEnd, colStart, colEnd);

    /**
   * Static method that compute the gaussian elimination of the given matrix
   * @param {number[][] | Matrix} matrix
   * @returns {number[][]} the matrix reduced in the row echelon form
   */
    static gaussianElimination = (matrix) => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)

      // Copy the matrix
      const matrixCopy = Matrix.clone(matrix)

      let i, j, k
      const n = matrixCopy.length
      const offset = matrixCopy[0].length - matrixCopy.length

      for (i = 0; i < n; i++) {
        // Search for maximum in this column
        let maxEl = Math.abs(matrixCopy[i][i])
        let maxRow = i
        for (k = i + 1; k < n; k++) {
          if (Math.abs(matrixCopy[k][i]) > maxEl) {
            maxEl = Math.abs(matrixCopy[k][i])
            maxRow = k
          }
        }

        // Swap maximum row with current row (column by column)
        for (k = i; k < n + offset; k++) {
          const tmp = matrixCopy[maxRow][k]
          matrixCopy[maxRow][k] = matrixCopy[i][k]
          matrixCopy[i][k] = tmp
        }

        // Make all rows below this one 0 in current column
        for (k = i + 1; k < n; k++) {
          const c = -matrixCopy[k][i] / matrixCopy[i][i]
          for (j = i; j < n + offset; j++) {
            if (i === j) {
              matrixCopy[k][j] = 0
            } else {
              matrixCopy[k][j] += c * matrixCopy[i][j]
            }
          }
        }
      }

      return matrixCopy
    }

    /**
   * Static method that solve linear system with the gaussian elimination
   * @param {number[][] | Matrix}matrix
   * @param {number[] | Vector}vector
   * @returns {number[][]} the solution of the linear system
   */
    static gaussSolve = (matrix, vector) => {
      // Check matrix and vector type
      matrix = Matrix.checkMatrixType(matrix)
      vector = Vector.checkVectorType(vector)

      if (matrix.length !== vector.length) {
        throw new Error('The matrix and the vector give are incompatible!')
      } else {
        let i, k

        // Make a copy of the matrix
        let matrixCopy = Matrix.clone(matrix)

        // Unify the matrix and the vector
        for (i = 0; i < matrix.length; i++) {
          matrixCopy[i].push(vector[i])
        }
        const n = matrixCopy.length

        matrixCopy = Matrix.gaussianElimination(matrixCopy)

        // Solve equation Ax=b for an upper triangular matrix A
        const resVector = Matrix.zeros2dArr(1, n)
        for (i = n - 1; i > -1; i--) {
          resVector[i] = matrixCopy[i][n] / matrixCopy[i][i]
          for (k = i - 1; k > -1; k--) {
            matrixCopy[k][n] -= matrixCopy[k][i] * resVector[i]
          }
        }

        return resVector
      }
    }

    /**
     * static method for the LU Decomposition of the given matrix
     * @param {number[][] | Matrix } matrix
     * @returns {{U: number[][], L: number[][]}} object containing the L and the U matrix
     */
    static luDecomposition = matrix => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)
      // throw an error is the matrix is not square
      if (!Matrix.isSquare(matrix)) {
        throw new Error('Cannot decompose with LU two non square matrices')
      } else {
        return Matrix.getLUDecomposition(matrix)
      }
    };

    /**
     * The LU Decomposition function that decompose the matrix in L and U
     */
    luDecomposition = () => {
      // throw an error is the matrix is not square
      if (!this.isSquare) {
        throw new Error('Cannot decompose with LU two non square matrices')
      } else {
        const res = Matrix.getLUDecomposition(this._matrix)

        this.lower = res.L
        this.upper = res.U
      }
    };

    /**
     * Compute the LU decomposition of the given matrix
     * @param {number[][] | Matrix} matrix
     * @returns {{U: number[][], L: number[][]}} Object that contain U matrix and L matrix
     */
    static getLUDecomposition = (matrix) => {
      // throw an error is the matrix is not square
      if (!Matrix.isSquare(matrix)) {
        throw new Error('Cannot decompose with LU two non square matrices')
      } else {
        const mat = Matrix.clone(matrix)
        const n = matrix.length
        const lower = Matrix.zeros2dSq(n); const upper = Matrix.zeros2dSq(n)

        for (let k = 0; k < n; k++) {
          lower[k][k] = 1
          upper[k][k] = mat[k][k]

          for (let i = k + 1; i < n; i++) {
            lower[i][k] = (mat[i][k] / upper[k][k])
            upper[k][i] = mat[k][i]
          }

          for (let i = k + 1; i < n; i++) {
            for (let j = k + 1; j < n; j++) { mat[i][j] -= (lower[i][k] * upper[k][j]) }
          }
        }

        return {
          L: lower,
          U: upper
        }
      }
    };

    /**
     * Static method that solves the linear system using lu decomposition
     * @param {number[][]} lower
     * @param {number[][]} upper
     * @param {number[]} rightPart
     * @returns { number[] }
     */
    static solveUsingLU = (lower, upper, rightPart) => {
      // throw an error is the matrix is not square
      if (!Matrix.isSquare(lower) && !Matrix.isSquare(upper)) {
        throw new Error('Cannot solve the linear system')
      } else {
        const n = rightPart.length

        // Calculate the solutions of Ly = b using forward substitution
        const y = Array(n).fill(0)
        for (let i = 0; i < n; i++) {
          let sum = 0

          for (let k = 0; k < i; k++) { sum += lower[i][k] * y[k] }

          y[i] = (rightPart[i] - sum) / lower[i][i]
        }

        // Calculate the solution of Ux = y using back substitution
        const x = Array(n).fill(0)
        for (let i = n - 1; i >= 0; i--) {
          let sum = 0

          for (let k = i + 1; k < n; k++) { sum += upper[i][k] * x[k] }

          x[i] = (1 / upper[i][i]) * (y[i] - sum)
        }

        return x
      }
    };

    /**
     * Solve the linear system using lu decomposition
     * @param rightPart
     * @returns {number[]} solution of the linear system
     */
    solveUsingLU = (rightPart) => {
      // throw an error is the matrix is not square
      if (!this.isSquare) {
        throw new Error('Cannot solve linear system using LU')
      } else {
        return Matrix.solveUsingLU(this.lower, this.upper, rightPart)
      }
    };

    /**
     * Compute the matrix multiplication using the naive method
     * @param {number[][]| Matrix} matrix1
     * @param {number[][]| Matrix | number[] | Vector} matrix2
     * @returns {number[][]} the result of the product of the matrix1 and the matrix2
     */
    static mul = (matrix1, matrix2) => {
      // Check  the inputs types
      matrix1 = Matrix.checkMatrixType(matrix1)
      // Check if matrix is a vector
      if ((Array.isArray(matrix2) && !Array.isArray(matrix2[0])) || matrix2 instanceof Vector) {
        let vectorType = 'col'
        // if the vector is and instance of vector check weather is a row vector or a col vector
        if (matrix2 instanceof Vector) { vectorType = matrix2.type }
        matrix2 = Vector.checkVectorType(matrix2)

        // Check matrix vector compatibility
        const refVector = Array.isArray(matrix2) ? matrix2 : Vector.clone(matrix2)
        const refMatrix = Array.isArray(matrix1) ? matrix1 : Matrix.clone(matrix1)
        if (refVector.length !== refMatrix[0].length || vectorType !== 'col') {
          throw new Error('Cannot do the matrix vector multiplication')
        } else {
          const resVector = Array(refMatrix.length)

          for (let i = 0; i < refMatrix.length; i++) {
            resVector[i] = (zip(refMatrix[i], refVector).map(x => x.reduce((a, b) => a * b, 1))).reduce((a, b) => a + b, 0)
          }

          return resVector
        }
      } else {
        matrix2 = Matrix.checkMatrixType(matrix2)
        // check if the input matrix has the right dimension
        if (matrix1[0].length !== matrix2.length) {
          throw new Error('Cannot do the multiplication')
        } else {
          // if the matrix is too big run the pararlell algorithm on the gpu
          if (matrix1.length >= 1024 || matrix2.length >= 1024) { // fixme: find better condition
            return Matrix.multiply(matrix1, matrix2)
          } else {
            const m2Cols = Matrix.getTranspose(matrix2)
            return matrix1.map(aRow => m2Cols.map(bCol => dotProduct(aRow, bCol)))
          }
        }
      }
    };

    /**
     * Instance method that return thr multiplication of matrix
     * @param {number[][]| Matrix | number[] | Vector} matrix
     * @return {Matrix}
     */
    mul = (matrix) => {
      this._matrix = Matrix.mul(this._matrix, matrix)
      return this
    }

    /**
   * Efficient Multiplication run on the gpu with a parallel algorithm (only for big matrices, dimensions >= 1024 x 1024)
   * @param {number[][] | Matrix} matrix1
   * @param {number[][] | Matrix} matrix2
   * @returns {number[][]} the result of the multiplication
   */
    static multiply = (matrix1, matrix2) => {
      // Check matrices type
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)
      // Check matrix compatibility
      if (matrix1[0].length !== matrix2.length) {
        throw new Error('Matrices dimensions are incompatible! Cannot do the multiplication')
      } else {
        const dim1 = matrix1[0].length // the common dimension
        const dim2 = matrix1.length // rows of the first matrix
        const dim3 = matrix2[0].length // col of the second matrix
        const gpu = new GPU() // new GPU instance

        const computeMultiplication = gpu.createKernel(function (a, b) {
          let sum = 0
          for (let i = 0; i < this.constants.length; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x]
          }
          return sum
        }, { constants: { length: dim1 }, output: [dim2, dim3] })

        // from a string array to int array
        const resMatrix = computeMultiplication(matrix1, matrix2)

        for (let i = 0; i < resMatrix.length; i++) {
          resMatrix[i] = Array.from(resMatrix[i])
        }

        return resMatrix
      }
    };

    /**
     * Efficient Multiplication run on the gpu with a parallel algorithm
     * @param {number[][] | Matrix} matrix
     * @returns {Matrix} the result of the multiplication
     */
    multiply = (matrix) => {
      this._matrix = Matrix.multiply(this.matrix, matrix)
      return this
    }

    /**
     * Strassen multiplication method that calls the strassen algorithm
     * @param {number[][] | Matrix } matrix1
     * @param {number[][] | Matrix } matrix2
     * @param {number} leafSize
     * @returns {number[][]} the multiplication of the two matrices
     */
    static strassenMultiply = (matrix1, matrix2, leafSize = 8) => {
      // Check  the inputs types
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)

      // Check the input type
      if (!(Array.isArray(matrix1) && Array.isArray(matrix2))) {
        throw new Error('Type Error')
      }

      // Check if matrices are square matrices
      if (!(matrix1.length === matrix1[0].length && matrix2.length === matrix2[0].length && matrix1.length === matrix2[0].length)) {
        throw new Error("The matrices aren't square matrices")
      }

      const nextPowerOfTow = n => Math.pow(2, Math.ceil(Math.log2(n)))
      const n = matrix1.length
      const m = nextPowerOfTow(n)

      const ACopy = Matrix.zeros2dSq(m)
      const BCopy = Matrix.zeros2dSq(m)

      // Copy the the matrices
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          ACopy[i][j] = matrix1[i][j]
          BCopy[i][j] = matrix2[i][j]
        }
      }

      const CCopy = Matrix.strassenAlgorithm(ACopy, BCopy, leafSize)
      const C = Matrix.zeros2dSq(n)

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) { C[i][j] = CCopy[i][j] }
      }

      return C
    };

    /**
     * Strassen multiplication of the two given matrices
     * @param {number[][] | Matrix} matrix
     * @param {number} leafsize
     * @returns {Matrix}
     */
    strassenMultiply = (matrix, leafsize) => {
      this._matrix = Matrix.strassenMultiply(this.matrix, matrix, leafsize)
      return this
    }

    /**
     * Implementation of the Strassen algorithm
     * @param {number[][]} matrix1
     * @param {number[][]} matrix2
     * @param {number} leafSize
     * @returns {number[][]}
     */
    static strassenAlgorithm = function (matrix1, matrix2, leafSize = 8) {
      const n = matrix1.length
      if (n <= leafSize) { return Matrix.mul(matrix1, matrix2) } else {
        const newSize = Math.floor(n / 2)

        // Create the A and B subMatrices
        const A11 = Matrix.getSubMatrix(matrix1, 0, newSize - 1, 0, newSize - 1)
        const A12 = Matrix.getSubMatrix(matrix1, 0, newSize - 1, newSize, n - 1)
        const A21 = Matrix.getSubMatrix(matrix1, newSize, n - 1, 0, Math.floor(newSize) - 1)
        const A22 = Matrix.getSubMatrix(matrix1, newSize, n - 1, newSize, n - 1)

        const B11 = Matrix.getSubMatrix(matrix2, 0, newSize - 1, 0, newSize - 1)
        const B12 = Matrix.getSubMatrix(matrix2, 0, newSize - 1, newSize, n - 1)
        const B21 = Matrix.getSubMatrix(matrix2, newSize, n - 1, 0, newSize - 1)
        const B22 = Matrix.getSubMatrix(matrix2, newSize, n - 1, newSize, n - 1)

        // Seven matrices for the final result
        const M1 = Matrix.strassenAlgorithm(Matrix.sum(A11, A22), Matrix.sum(B11, B22), leafSize)
        const M2 = Matrix.strassenAlgorithm(Matrix.sum(A21, A22), B11, leafSize)
        const M3 = Matrix.strassenAlgorithm(A11, Matrix.sub(B12, B22), leafSize)
        const M4 = Matrix.strassenAlgorithm(A22, Matrix.sub(B21, B11), leafSize)
        const M5 = Matrix.strassenAlgorithm(Matrix.sum(A11, A12), B22, leafSize)
        const M6 = Matrix.strassenAlgorithm(Matrix.sub(A21, A11), Matrix.sum(B11, B12), leafSize)
        const M7 = Matrix.strassenAlgorithm(Matrix.sub(A12, A22), Matrix.sum(B21, B22), leafSize)

        const C11 = Matrix.sum(Matrix.sub(Matrix.sum(M1, M4), M5), M7) // C11 = M1 + M4 - M5 + M7
        const C12 = Matrix.sum(M3, M5) // C12 = M3 + M5
        const C21 = Matrix.sum(M2, M4) // C21 = M2 + M4
        const C22 = Matrix.sum(Matrix.sum(Matrix.sub(M1, M2), M3), M6) // C22 = M1 - M2 + M3 + M6

        const C = Matrix.zeros2dSq(n)

        // Calculate C
        for (let i = 0; i < newSize; i++) {
          for (let j = 0; j < newSize; j++) {
            C[i][j] = C11[i][j]
            C[i][j + newSize] = C12[i][j]
            C[i + newSize][j] = C21[i][j]
            C[i + newSize][j + newSize] = C22[i][j]
          }
        }

        return C
      }
    };

    /**
     *
     * @param matrix1
     * @param matrix2
     * @returns {number[][]}
     */
      static hammardProduct = (matrix1, matrix2) => {
        // Check matrices type
        matrix1 = Matrix.checkMatrixType(matrix1)
        matrix2 = Matrix.checkMatrixType(matrix2)

        if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
          throw new Error('Cannot compute hammard product with different matrices')
        } else {
          const resMatrix = Matrix.zeros2dArr(matrix1.length, matrix1[0].length)

          for (let i = 0; i < matrix1.length; i++) {
            resMatrix[i] = zipWith(product, matrix1[i], matrix2[i])
          }

          return resMatrix
        }
      }

      /**
     * The hammard product between tha matrix and the given matrix
     * @param {number[][] | Matrix} matrix
     * @returns {Matrix}
     */
      hammardProduct = matrix => {
        this._matrix = Matrix.hammardProduct(this._matrix, matrix)
        return this
      }

      /**
       *
       * @returns {number[][]} give the textual representation of the matrix
       */
      toString = () => this._matrix

      /**
     * matrix attribute getter
     * @returns {number[][]}
     */
      get matrix () {
        return this._matrix
      }
}
