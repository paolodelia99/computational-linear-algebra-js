import Matrix from './matrix'
import { zip } from './utils/functions'

class LinearTransformation {
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
     * @param {number[][] | Matrix}matrix
     * @param {number[] | Vector} vector
     * @returns {number[]} the transformed vector
     */
    static apply = (matrix, vector) => {
      // fixme: implement also for the matrix

      // Check matrix vector compatibility
      const refVector = Array.isArray(vector) ? vector : vector.getCopy()
      const refMatrix = Array.isArray(matrix) ? matrix : matrix.getCopy()
      if (refVector.length !== refMatrix[0].length) {
        throw new Error('Cannot apply the linear Transformation')
      } else {
        const resVector = Array(refMatrix.length)

        for (let i = 0; i < matrix.length; i++) {
          resVector[i] = (zip(refMatrix[i], refVector).map(x => x.reduce((a, b) => a * b, 1))).reduce((a, b) => a + b, 0)
        }

        return resVector
      }
    };

    /**
     * Apply the linear Transformation to the give vector
     * @param {number[]} vector
     * @returns {number[]} the transformed vector
     */
    apply = vector => LinearTransformation.apply(this._transformationMatrix, vector);

    // todo: to test
    /**
     * Apply the inverse mapping of the given transformation
     * @param {number[][] | Matrix} transformation
     * @param {number[] | Vector | number[][] | Matrix} x
     * @returns {number[] | number[][]}
     */
    static applyInverse = (transformation, x) => {
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

module.exports = LinearTransformation
