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
     * @param {number[] | Vector} vector
     * @returns {number} the norm of a vector
     */
    static getNorm = (vector) => {
      // Check vector type
      vector = Vector.checkVectorType(vector)

      return Math.sqrt(vector.map(x => x * x).reduce((a, b) => a + b, 0))
    }

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
        throw new Error('crossProduct is defined only for 3d vectors')
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
     * Compute the euclidean distance of the given vectors
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number} the euclidean distance between the two vectors
     */
      static euclideanDistance = (vector1, vector2) => {
        // Check vector vector type
        vector1 = Vector.checkVectorType(vector1)
        vector2 = Vector.checkVectorType(vector2)

        if (vector1.length !== vector2.length) {
          throw new Error('Cannot compute the euclidean distance of two vectors with different dimensions')
        } else {
          let distance = 0
          const zipVector = zip(vector1, vector2)

          for (let i = 0; i < zipVector.length; i++) {
            distance += Math.pow(zipVector[i].reduce((a, b) => -a + b, 0), 2)
          }

          return Math.sqrt(distance)
        }
      }

    /**
     * Compute the euclidean distance between the vector and the give vector
     * @param {number[] | Vector} vector
     * @returns {number} the euclidean distance between the two vectors
     */
    euclideanDistance = (vector) => Vector.euclideanDistance(this.vector, vector)

    /**
   * Get the angle between two vectors
   * @param {number[] | Vector} vector1
   * @param {number[] | Vector} vector2
   * @param {string} angleType the type of angle to return: radians = "rad", degree ="deg", by default is "deg"
   * @returns {number} angle between the given two vectors
   */
    static getAngle = (vector1, vector2, angleType = 'deg') => {
      if (angleType === 'rad' || angleType === 'deg') {
        let res = Math.acos((Vector.dotProduct(vector1, vector2)) / (Vector.getNorm(vector1) * Vector.getNorm(vector2)))
        let angleObj

        if (angleType === 'deg') {
          res = res * (180 / Math.PI)
          angleObj = {
            deg: null,
            arcmin: null,
            arcsec: null
          }
          angleObj.deg = Math.floor(res)
          const arcmin = (res % 1) * 60
          angleObj.arcmin = Math.floor(arcmin)
          const arcsec = (arcmin % 1) * 60
          angleObj.arcsec = Math.floor(arcsec)
        }

        return angleType === 'deg' ? angleObj : res
      } else {
        throw new Error('angleType invalid')
      }
    }

    /**
   * Get the angle between the vector and the  given vector
   * @param {number[] | Vector} vector
   * @param {string} angleType angleType the type of angle to return: radians = "rad", degree ="deg", by default is "deg"
   * @returns {number} angle between the vector and the given vector
   */
    getAngle = (vector, angleType = 'deg') => Vector.getAngle(this.vector, vector, angleType)

    /**
   * Check if the given vectors are orthogonal
   * @param {number[] | Vector} vector1
   * @param {number[] | Vector} vector2
   * @returns {boolean} true if they are orthogonal otherwise false
   */
    static areVectorsOrthogonal = (vector1, vector2) => {
      // Check vectors type
      vector1 = Vector.checkVectorType(vector1)
      vector2 = Vector.checkVectorType(vector2)

      return Vector.dotProduct(vector1, vector2) === 0
    }

  /**
   * Check if the given vector is orthogonal ot the vector
   * @param {number[] | Vector} vector
   * @returns {boolean} true if they are orthogonal otherwise false
   */
  isVectorOrthogonal = vector => Vector.areVectorsOrthogonal(this.vector, vector)

  /**
   * Check if the given vectors are orthonormal
   * @param {number[] | Vector} vector1
   * @param {number[] | Vector} vector2
   * @returns {boolean} true if they are orthonormal otherwise false
   */
    static areVectorOrthonormal = (vector1, vector2) => Vector.areVectorsOrthogonal(vector1, vector2) && Vector.getNorm(vector1) === 1 && Vector.getNorm(vector2) === 1

  /**
   * Check if the given vector is orthonormal ot the vector
   * @param {number[] | Vector} vector
   * @returns {boolean} true if they are orthonormal otherwise false
   */
  isVectorOrthonormal = vector => Vector.areVectorOrthonormal(this.vector, vector)

  /**
     * vector field getter
     * @returns {number[] }
     */
  get vector () {
    return this._vector
  }
}
