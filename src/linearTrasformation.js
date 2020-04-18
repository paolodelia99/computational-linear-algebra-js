import { Matrix } from './matrix'
import { zip } from './utils/functions'
import { Vector } from './vector'

export class LinearTransformation {
    _transformationMatrix

    /**
     * Constructor for the linearTransformation
     * @param {number[][]| Matrix} matTransformation
     */
    constructor (matTransformation) {
      this._transformationMatrix = !Array.isArray(matTransformation) ? matTransformation.matrix : matTransformation
      this.domainDim = this.transformationMatrix.length // row of the associated matrix
      this.imageDim = this.transformationMatrix[0].length // col of the associated matrix
    }

    /**
     * Apply the give linear transformation
     * @param {number[][] | Matrix}trMatrix
     * @param {number[] | Vector | number[][] | Matrix} matrix/vector
     * @returns {number[] | number[][] } the transformed matrix/vector
     */
    static apply = (trMatrix, matrix) => {
      // Check weather the matrix passed is a matrix or a vector, and based on that arsing to matrix
      // the corresponding array representation
      if ((Array.isArray(matrix) && Array.isArray(matrix[0])) || matrix instanceof Matrix) {
        matrix = Matrix.checkMatrixType(matrix)
      } else {
        matrix = Vector.checkVectorType(matrix)
      }
      // Check if the passed matrix is a matrix or a vector
      if (matrix.every(Array.isArray)) {
        Matrix.checkMatrixType(trMatrix)
        Matrix.checkMatrixType(matrix)

        if (trMatrix[0].length !== matrix.length) {
          throw new Error('Cannot apply the linear transformation to the matrix')
        } else {
          return Matrix.multiplication(trMatrix, matrix)
        }
      } else {
        // Check matrix vector compatibility
        const refVector = Array.isArray(matrix) ? matrix : matrix.getCopy()
        const refMatrix = Array.isArray(trMatrix) ? trMatrix : trMatrix.getCopy()
        if (refVector.length !== refMatrix[0].length) {
          throw new Error('Cannot apply the linear Transformation')
        } else {
          const resVector = Array(refMatrix.length)

          for (let i = 0; i < trMatrix.length; i++) {
            resVector[i] = (zip(refMatrix[i], refVector).map(x => x.reduce((a, b) => a * b, 1))).reduce((a, b) => a + b, 0)
          }

          return resVector
        }
      }
    };

    /**
     * Apply the linear Transformation to the give vector
     * @param {number[] | Vector | number[][] | Matrix} vector
     * @returns {number[] | number[][]} the transformed vector
     */
    apply = vector => LinearTransformation.apply(this._transformationMatrix, vector);

    /**
     * Apply the inverse mapping of the given transformation
     * @param {number[][] | Matrix} transformation
     * @param {number[] | Vector | number[][] | Matrix} x
     * @returns {number[] | number[][]}
     */
    static applyInverse = (transformation, x) => {
      transformation = Array.isArray(transformation) ? transformation : transformation.matrix
      const inverseMat = Matrix.getInverse(transformation)
      return LinearTransformation.apply(inverseMat, x)
    };

    /**
     * Instance method that apply the inverse mapping
     * @param {number[] | Vector | number[][] | Matrix} x
     * @returns {number[]|number[][]}
     */
    applyInverse = x => LinearTransformation.applyInverse(this.transformationMatrix, x);

    /**
     * @returns {number[][]} the matrix transformation
     */
    get transformationMatrix () {
      return this._transformationMatrix
    }
}
