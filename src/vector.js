import { zip } from './utils/functions'

export class Vector {
  /**
     * Constructor of the vector Object
     * @param vector can be an array of a list of integers
     */
  constructor (vector) {
    this._vector = Array.isArray(vector) ? vector : Array.from(arguments)
  }

    /**
     * Static method the give a copy of the given vector
     * @param {number[]} vector1
     * @returns {number[]} copy of the given vector
     */
    static getCopy = (vector1) => vector1.slice();

    /**
     * Return a copy of the vector
     * @returns {number[]} copy the vector
     */
    getCopy = () => Vector.getCopy(this.vector);

  /**
   * Create a empty vector of the given dimension
   * @param {number} dim
   * @returns {number[]} empty vector of the given dimension
   */
  static createEmptyVector = dim => Array(dim).fill(0)

  /**
   * Create a random vector of the given dimension, filling it with number of the given range
   * @param  {number} dim vector dimension
   * @param {number} min min number of the random range
   * @param {number} max max number of the given range
   * @returns {number[]} random vector of the given dimension
   */
  static createRandomVector = (dim, min, max) => {
    const vector = Vector.createEmptyVector(dim)

    for (let i = 0; i < dim; i++) {
      vector[i] = parseInt(Math.random() * (max - min) + min)
    }

    return vector
  }

  /**
   * Function that i use to return the array if i give a vector obj
   * @param {number[] | Vector} vector
   * @returns {number[]} the array representing the vector
   */
    static checkVectorType = (vector) => Array.isArray(vector) ? vector : vector.vector

    /**
     * Static method that compute the norm of a vector
     * @param {number[]} vector
     * @returns {number} the norm of a vector
     */
    static getNorm = (vector) => Math.sqrt(vector.map(x => x * x).reduce((a, b) => a + b, 0));

    /**
     * Compute the norm of a vector
     * @returns {number}: the norm of a vector
     */
    getNorm = () => Vector.getNorm(this._vector);

    /**
     * Static method compute the product between a vector and a scalar
     * @param {number[]} vector
     * @param {number} scalar
     * @returns {number[]} the vector multiplied by the scalar
     */
    static scalarProduct = (vector, scalar) => vector.map(x => x * scalar);

    /**
     * Compute the scalarProduct
     * @param {number} scalar
     * @returns {number[]}: the scalar product of the vector
     */
    scalarProduct = (scalar) => Vector.scalarProduct(this._vector, scalar);

    /**
     * Compute the product column vector for row vector (static method)
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number} the product of the row vector and the col vector
     */
    static dotProduct = (vector1, vector2) => {
      // Check vectors type
      vector1 = Vector.checkVectorType(vector1)
      vector2 = Vector.checkVectorType(vector2)

      return (zip(vector1, vector2).map(x => x.reduce((a, b) => a * b, 1))).reduce((a, b) => a + b, 0)
    }

    /**
     * Compute the product column vector for row vector
     * @param {number[] | Vector} vector2
     * @returns {number} the product of the row vector and the col vector
     */
    dotProduct = (vector2) => Vector.dotProduct(this._vector, vector2);

    /**
     * Compute the cross product between two 3D Vector
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number[]} the cross product between vector1 and vector2
     */
    static crossProduct = (vector1, vector2) => {
      // Check Vector Type
      const x1 = Array.isArray(vector1) ? vector1 : vector1.vector
      const x2 = Array.isArray(vector2) ? vector2 : vector2.vector
      // Cross product of two 3D vectors.
      if (x1.length !== 3 && x2.length !== 3) {
        throw new Error('crossProduct is defined only for 3d vectors.')
      } else {
        return [
          x1[1] * x2[2] - x1[2] * x2[1],
          x1[2] * x2[0] - x1[0] * x2[2],
          x1[0] * x2[1] - x1[1] * x2[0]
        ]
      }
    };

    /**
     * Compute the cross product with the give 3D Vector
     * @param {number[] | Vector} vector
     * @returns {number[]} the cross product between vector1 and vector2
     */
    crossProduct = (vector) => Vector.crossProduct(this.vector, vector);

    /**
     * Compute the sum of the two vectors (static method)
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number[]} The sum of the two vectors
     */
    static sum (vector1, vector2) {
      // Check the input types
      vector1 = Array.isArray(vector1) ? vector1 : vector1.vector
      vector2 = Array.isArray(vector2) ? vector2 : vector2.vector

      if (vector1.length !== vector2.length) {
        throw new Error("The two vectors haven't the same Length")
      } else {
        const sumVector = []

        for (let i = 0; i < vector1.length; i++) { sumVector.push(vector1[i] + vector2[i]) }

        return sumVector
      }
    }

    /**
     * Sum the vector with the given vector (instance method)
     * @param {number[] | Vector} vector
     * @returns {number[]} the sum of the two vectors
     */
    sum = (vector) => Vector.sum(this._vector, vector);

    /**
     * vector field getter
     * @returns {number[] }
     */
    get vector () {
      return this._vector
    }
}
