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
      this._matrix = Array.isArray(matrix) && Array.isArray(matrix[0]) ? matrix : Array.from(arguments)
      this.isSquare = this.isMatrixSquare()
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
    static createEmptyMatrix = (row, col) => Array(row).fill().map(() => Array(col).fill(0));

    /**
     * Create an empty square matrix of the given dimension
     * @param {number} dim  : dimension of the matrix
     * @returns {number[][]} empty square matrix of the given dimension
     */
    static createEmptySquareMatrix = (dim) => Array(dim).fill().map(() => Array(dim).fill(0));

    /**
     * Create a matrix of the given dimension, filling it with random numbers of the
     * given range
     * @param {number} rows rows of the matrix
     * @param {number} cols cols of the matrix
     * @param {number} min min number of the range
     * @param {number} max max number of the range
     * @returns {number[][]} random of the given dimension
     */
    static createRandomMatrix = (rows, cols, min, max) => {
      const matrix = Matrix.createEmptyMatrix(rows, cols)

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
     * Return the identity matrix of the given dimension
     * @param {number} dim
     * @returns {number[][]} Return the identity matrix of the given dimension
     */
    static createIdentityMatrix = (dim) => {
      const idMatrix = Matrix.createEmptySquareMatrix(dim)

      for (let i = 0; i < dim; i++) { idMatrix[i][i] = 1 }

      return idMatrix
    };

    /**
     * Method that return the two dimensional array that represent the matrix
     * no matter if it passed a matrix object or a two dimensional array
     * @param {number[][] | Matrix} matrix
     * @returns {number[][]} the two dimensional array thar represent the matrix
     */
    static checkMatrixType = matrix => Array.isArray(matrix) ? matrix : matrix.matrix;

    /**
     * Method that return the two dimensional array that represent the matrix
     * no matter if it passed a matrix object or a two dimensional array
     * @param {number[][] | Matrix} matrix
     * @returns {number[][]} the two dimensional array thar represent the matrix
     */
    checkMatrixType = matrix => Matrix.checkMatrixType(matrix);

    /**
     * Clone the matrix
     * @returns {number[][]}
     */
    static cloneMatrix = (matrix) => Array.isArray(matrix) ? matrix.map(a => a.slice()) : matrix._matrix.map(a => a.slice());

    /**
     * Get a copy of the matrix
     * @returns {number[][]}
     */
    getCopy = () => Matrix.cloneMatrix(this.matrix);

    /**
     * static method that checks if a matrix is square
     * @param {number[][] | Matrix} matrix
     * @returns {boolean} true if is square otherwise false
     */
    static isMatrixSquare = (matrix) => {
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
    isMatrixSquare = () => Matrix.isMatrixSquare(this._matrix);

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
    getTrace = () => Matrix.trace(this.matrix);

    /**
     * Static function the return the transpose of the given matrix
     * @param {number[][] | Matrix} matrix
     * @returns {number[][]}
     */
    static getTranspose = matrix =>
      Array.isArray(matrix) ? matrix[0].map((_, iCol) => matrix.map(row => row[iCol])) : matrix.matrix[0].map((_, iCol) => matrix.map(row => row[iCol]));

    /**
     * Get the transpose of the matrix
     * @returns {*[][]} the transpose matrix
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
     * @param { number[][] }matrix
     */
    static printMatrix = (matrix) => Array.isArray(matrix) ? matrix.map(x => console.log(x)) : matrix.matrix.map(x => console.log(x));

    /**
     * Print the matrix
     */
    printMatrix = () => Matrix.printMatrix(this._matrix);

    /**
     * Static method that compute the inverse of the give matrix
     * @param {number[][] | Matrix} matrix
     * @returns {number[][]} Return the inverse of the given matrix
     */
    static getInverse = matrix => {
      // todo: check if the determinant is different than zero
      if (!Matrix.isMatrixSquare(matrix)) {
        throw new Error("You can't get the inverse of a non square matrix")
      } else {
        matrix = Array.isArray(matrix) ? matrix : matrix.matrix

        const identityMatrix = Matrix.createIdentityMatrix(matrix.length)
        const inverse = []
        const { L, U } = Matrix.luDecomposition(matrix)

        for (let j = 0; j < matrix.length; j++) { inverse.push(Matrix.solveUsingLU(L, U, Matrix.getCol(identityMatrix, j))) }

        // Transpose the inverse before returning
        return Matrix.getTranspose(inverse)
      }
    };

    /**
     * Compute the inverse of a matrix
     * @returns {Uint8Array|BigInt64Array|*[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array}
     */
    getInverse = () => {
      if (!this.isSquare) {
        throw new Error("You can't get the inverse of a non square matrix")
      }

      if (this.determinant === 0) {
        throw new Error('The determinant is 0! The inverse does not exist!')
      } else {
        const identityMatrix = Matrix.createIdentityMatrix(this.rows)
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
    inverse = () => {
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
     * Static method that compute sum sum of the given matrices
     * @param {number[][] | Matrix} matrix1
     * @param {number[][] | Matrix} matrix2
     * @returns {number[][]}
     */
    static sumMatrices = (matrix1, matrix2) => {
      // Check matrices types
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)

      if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Cannot sum two matrices with different dimension')
      } else {
        const resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix1[0].length)

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
      this._matrix = Matrix.sumMatrices(this._matrix, matrix)
      return this
    }

    /**
     * Static method that compute the subtraction of two matrices
     * @param matrix1
     * @param matrix2
     * @returns {*[][]} the substract matrix
     */
    static subtractMatrices = (matrix1, matrix2) => {
      // Check matrices types
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)

      if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Cannot subtract two matrices with different dimension')
      } else {
        const resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix1[0].length)

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
      this._matrix = Matrix.subtractMatrices(this._matrix, !Array.isArray(matrix) ? matrix.matrix : matrix)
      return this
    }

    /**
   * Check if the give matrix is orthogonal
   * @param {number[][] | Matrix} matrix
   * @returns {boolean} true if is orthogonal otherwise false
   */
    static isMatrixOrthogonal = matrix => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)

      const inverse = Matrix.getInverse(matrix)
      const transpose = Matrix.getTranspose(matrix)

      return JSON.stringify(inverse) === JSON.stringify(transpose)
    }

    /**
     * Return true if the matrix is orthogonal otherwise false
     * @returns {boolean}
     */
    isMatrixOrthogonal = () => Matrix.isMatrixOrthogonal(this.matrix)

    /**
     * Get a subMatrix of the given matrix
     * @param {*[][]} matrix
     * @param {number} rowStart
     * @param {number} rowEnd
     * @param {number} colStart
     * @param {number} colEnd
     * @returns {*[][]}
     */
    static getSubMatrix = (matrix, rowStart, rowEnd, colStart, colEnd) => {
      const subMatrix = Matrix.createEmptyMatrix((rowEnd - rowStart) + 1, (colEnd - colStart) + 1)

      for (let i = 0; i < subMatrix.length; i++) {
        for (let j = 0; j < subMatrix[i].length; j++) { subMatrix[i][j] = matrix[rowStart + i][colStart + j] }
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
   * @returns {number[][]}
   */
    static gaussianElimination = (matrix) => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)

      if (matrix[0].length !== matrix.length + 1) {
        throw new Error('Cannot perform the gaussian elimination of this matrix')
      } else {
        // Copy the matrix
        const matrixCopy = Matrix.cloneMatrix(matrix)

        let i, j, k
        const n = matrixCopy.length

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
          for (k = i; k < n + 1; k++) {
            const tmp = matrixCopy[maxRow][k]
            matrixCopy[maxRow][k] = matrixCopy[i][k]
            matrixCopy[i][k] = tmp
          }

          // Make all rows below this one 0 in current column
          for (k = i + 1; k < n; k++) {
            const c = -matrixCopy[k][i] / matrixCopy[i][i]
            for (j = i; j < n + 1; j++) {
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
        let matrixCopy = Matrix.cloneMatrix(matrix)

        // Unify the matrix and the vector
        for (i = 0; i < matrix.length; i++) {
          matrixCopy[i].push(vector[i])
        }
        const n = matrixCopy.length

        matrixCopy = Matrix.gaussianElimination(matrixCopy)

        // Solve equation Ax=b for an upper triangular matrix A
        const resVector = Matrix.createEmptyMatrix(1, n)
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
     * @returns {{U: *[][], L: *[][]}} object containing the L and the U matrix
     */
    static luDecomposition = matrix => {
      // Check matrix type
      matrix = Matrix.checkMatrixType(matrix)
      // throw an error is the matrix is not square
      if (!Matrix.isMatrixSquare(matrix)) {
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
     * @returns {{U: *[][], L: *[][]}} Object that contain U matrix and L matrix
     */
    static getLUDecomposition = (matrix) => {
      // throw an error is the matrix is not square
      if (!Matrix.isMatrixSquare(matrix)) {
        throw new Error('Cannot decompose with LU two non square matrices')
      } else {
        const mat = Matrix.cloneMatrix(matrix)
        const n = matrix.length
        const lower = Matrix.createEmptySquareMatrix(n); const upper = Matrix.createEmptySquareMatrix(n)

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
      if (!Matrix.isMatrixSquare(lower) && !Matrix.isMatrixSquare(upper)) {
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
     * @param {number[][]| Matrix} matrix2
     * @returns {number[][]} the result of the product of the matrix1 and the matrix2
     */
    static ijkMultiplication = (matrix1, matrix2) => {
      // Check  the inputs types
      matrix1 = Matrix.checkMatrixType(matrix1)
      matrix2 = Matrix.checkMatrixType(matrix2)
      // check if the input matrix has the right dimension
      if (matrix1[0].length !== matrix2.length) {
        throw new Error('Cannot do the multiplication')
      } else {
        const resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix2[0].length)

        // Compute the calculation
        for (let i = 0; i < matrix1.length; i++) {
          for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix1[0].length; k++) { resMatrix[i][j] += (matrix1[i][k] * matrix2[k][j]) }
          }
        }

        return resMatrix
      }
    };

  /**
   * Instance method that return thr multiplication of matrix
   * @param {number[][]| Matrix} matrix
   * @return {Matrix}
   */
  ijkMultiplication = (matrix) => {
    this._matrix = Matrix.ijkMultiplication(this._matrix, !Array.isArray(matrix) ? matrix.matrix : matrix)
    return this
  }

    /**
   * Efficient Multiplication run on the gpu with a parallel algorithm
   * @param {number[][] | Matrix} matrix1
   * @param {number[][] | Matrix} matrix2
   * @returns {number[][]} the result of the multiplication
   */
    static multiplication = (matrix1, matrix2) => {
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
  multiplication = (matrix) => {
    this._matrix = Matrix.multiplication(this.matrix, matrix)
    return this
  }

    /**
     * Strassen multiplication method that calls the strassen algorithm
     * @param {number[][] | Matrix } A
     * @param {number[][] | Matrix } B
     * @param {number} leafSize
     * @returns {number[][]} the multiplication of the two matrices
     */
    static strassenMultiplication = (A, B, leafSize = 8) => {
      // Check  the inputs types
      A = Matrix.checkMatrixType(A)
      B = Matrix.checkMatrixType(B)

      // Check the input type
      if (!(Array.isArray(A) && Array.isArray(B))) {
        throw new Error('Type Error')
      }

      // Check if matrices are square matrices
      if (!(A.length === A[0].length && B.length === B[0].length && A.length === B[0].length)) {
        throw new Error("The matrices aren't square matrices")
      }

      const nextPowerOfTow = n => Math.pow(2, Math.ceil(Math.log2(n)))
      const n = A.length
      const m = nextPowerOfTow(n)

      const ACopy = Matrix.createEmptySquareMatrix(m)
      const BCopy = Matrix.createEmptySquareMatrix(m)

      // Copy the the matrices
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          ACopy[i][j] = A[i][j]
          BCopy[i][j] = B[i][j]
        }
      }

      const CCopy = Matrix.strassenAlgorithm(ACopy, BCopy, leafSize)
      const C = Matrix.createEmptySquareMatrix(n)

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
    strassenMultiplication = (matrix, leafsize) => {
      this._matrix = Matrix.strassenMultiplication(this.matrix, matrix, leafsize)
      return this
    }

    /**
     * Implementation of the Strassen algorithm
     * @param {number[][]} A
     * @param {number[][]} B
     * @param {number} leafSize
     * @returns {number[][]}
     */
    static strassenAlgorithm = function (A, B, leafSize = 8) {
      const n = A.length
      if (n <= leafSize) { return Matrix.ijkMultiplication(A, B) } else {
        const newSize = Math.floor(n / 2)

        // Create the A and B subMatrices
        const A11 = Matrix.getSubMatrix(A, 0, newSize - 1, 0, newSize - 1)
        const A12 = Matrix.getSubMatrix(A, 0, newSize - 1, newSize, n - 1)
        const A21 = Matrix.getSubMatrix(A, newSize, n - 1, 0, Math.floor(newSize) - 1)
        const A22 = Matrix.getSubMatrix(A, newSize, n - 1, newSize, n - 1)

        const B11 = Matrix.getSubMatrix(B, 0, newSize - 1, 0, newSize - 1)
        const B12 = Matrix.getSubMatrix(B, 0, newSize - 1, newSize, n - 1)
        const B21 = Matrix.getSubMatrix(B, newSize, n - 1, 0, newSize - 1)
        const B22 = Matrix.getSubMatrix(B, newSize, n - 1, newSize, n - 1)

        // Seven matrices for the final result
        const M1 = Matrix.strassenAlgorithm(Matrix.sumMatrices(A11, A22), Matrix.sumMatrices(B11, B22), leafSize)
        const M2 = Matrix.strassenAlgorithm(Matrix.sumMatrices(A21, A22), B11, leafSize)
        const M3 = Matrix.strassenAlgorithm(A11, Matrix.subtractMatrices(B12, B22), leafSize)
        const M4 = Matrix.strassenAlgorithm(A22, Matrix.subtractMatrices(B21, B11), leafSize)
        const M5 = Matrix.strassenAlgorithm(Matrix.sumMatrices(A11, A12), B22, leafSize)
        const M6 = Matrix.strassenAlgorithm(Matrix.subtractMatrices(A21, A11), Matrix.sumMatrices(B11, B12), leafSize)
        const M7 = Matrix.strassenAlgorithm(Matrix.subtractMatrices(A12, A22), Matrix.sumMatrices(B21, B22), leafSize)

        const C11 = Matrix.sumMatrices(Matrix.subtractMatrices(Matrix.sumMatrices(M1, M4), M5), M7) // C11 = M1 + M4 - M5 + M7
        const C12 = Matrix.sumMatrices(M3, M5) // C12 = M3 + M5
        const C21 = Matrix.sumMatrices(M2, M4) // C21 = M2 + M4
        const C22 = Matrix.sumMatrices(Matrix.sumMatrices(Matrix.subtractMatrices(M1, M2), M3), M6) // C22 = M1 - M2 + M3 + M6

        const C = Matrix.createEmptySquareMatrix(n)

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
     * matrix attribute getter
     * @returns {number[][]}
     */
    get matrix () {
      return this._matrix
    }
}
