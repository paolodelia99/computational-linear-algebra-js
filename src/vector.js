import { product, sum, zip, zipWith } from './utils/general_purpose_util_function'
import { Matrix } from './matrix'

/**
 * Class representing the vector
 */
export class Vector {
  /**
     * Constructor of the vector Object
     * @param {number[]}vector can be an array of a list of integers
     * @param {string} vType the type of vector that you wanna initialize (row vector or col vector)
     */
  constructor (vector, vType = 'row') {
    this._vector = Array.isArray(vector) ? vector : Array.from(arguments)
    this.type = vType === 'col' ? 'col' : 'row'
    this.dim = this._vector.length
  }

    /**
    * Print the given vector
    * @param {number[] | Vector} vector
    */
    static print = (vector) => {
      vector = Vector.checkVectorType(vector)
      console.log(vector)
    }

    /**
     *  return a new col vector
     * @param {number[]} vector
     * @returns {Vector} the new col vector
     */
    static colVect (vector) { return new Vector(Array.isArray(vector) ? vector : Array.from(arguments), 'col') }

    /**
     * return a new row vector
     * @param {number[]} vector
     * @returns {Vector} the new row vector
     */
    static rowVect (vector) { return new Vector(Array.isArray(vector) ? vector : Array.from(arguments), 'row') }

    /**
     * Check if the given parameter is vector or not
     * @param {number[] | Vector } vector
     * @returns {boolean} true if vector is an array or a Vector obj otherwise false
     */
      static isVector = vector => (Array.isArray(vector) && typeof vector[0] === 'number') || vector instanceof Vector

    /**
     * Print the vector
     */
    print = () => Vector.print(this._vector)

    changeType = () => {
      if (this.type === 'col') { this.type = 'row' } else { this.type = 'col' }
    }

    /**
     * Static method the give a copy of the given vector
     * @param {number[]} vector1
     * @returns {number[]} copy of the given vector
     */
    static clone = (vector1) => vector1.slice();

    /**
     * Return a copy of the vector
     * @returns {number[]} copy the vector
     */
    copy = () => Vector.clone(this.vector);

    /**
     * Create a empty array of the given dimension
     * @param {number} dim
     * @returns {number[]} empty array of the given dimension
     */
    static zerosArr = dim => Array(dim).fill(0)

    /**
     * Create a empty Vector of the given dimension
     * @param {number} dim
     * @returns {Vector} empty Vector object of the given dimension
     */
      static zeros = dim => new Vector(Vector.zerosArr(dim))

    /**
     * Create a random vector of the given dimension, filling it with number of the given range
     * @param  {number} dim vector dimension
     * @param {number} min min number of the random range
     * @param {number} max max number of the given range
     * @returns {number[]} random vector of the given dimension
     */
    static randIntArr = (dim, min, max) => {
      const vector = Vector.zerosArr(dim)

      for (let i = 0; i < dim; i++) {
        let num = parseInt(Math.random() * (max - min) + min)
        // for deepAssertEqual() problem
        if (num === 0) {
          num = Math.abs(num)
        }
        vector[i] = num
      }

      return vector
    }

    // fixme to test
    static randArr = (dim) => {
      const vector = Vector.zerosArr(dim)

      for (let i = 0; i < dim; i++) {
        vector[i] = Math.random()
      }

      return vector
    }

    /**
     *
     * @param dim
     * @param min
     * @param max
     * @returns {Vector}
     */
      static randInt = (dim, min, max) => new Vector(Vector.randIntArr(dim, min, max))

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
     * Multiply the vector by a scalar
     * @param {number} scalar
     * @returns {Vector}
     */
      scalarProduct = (scalar) => {
        this._vector = Vector.scalarProduct(this._vector, scalar)
        return this
      }

    /**
     * Compute the product column vector for row vector (static method)
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number} the product of the row vector and the col vector
     */
    static dotProduct = (vector1, vector2) => {
      // fixme: redo with new types of vectors
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
     * @returns {Vector}
     */
    crossProduct = (vector) => {
      this._vector = Vector.crossProduct(this._vector, vector)
      return this
    }

    /**
     * Compute the sum of the two vectors (static method)
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number[]} The sum of the two vectors
     */
    static sum (vector1, vector2) {
      // Check the input types
      vector1 = Vector.checkVectorType(vector1)
      vector2 = Vector.checkVectorType(vector2)

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
     * @returns {Vector} the sum of the two vectors
     */
    sum = (vector) => {
      this._vector = Vector.sum(this._vector, vector)
      return this
    }

    /**
     * Compute the subtraction of the two vectors (static method)
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number[]} vector1 - vector2
     */
    static sub (vector1, vector2) {
      // Check the input types
      vector1 = Vector.checkVectorType(vector1)
      vector2 = Vector.checkVectorType(vector2)

      if (vector1.length !== vector2.length) {
        throw new Error("The two vectors haven't the same Length")
      } else {
        const sumVector = []

        for (let i = 0; i < vector1.length; i++) { sumVector.push(vector1[i] - vector2[i]) }

        return sumVector
      }
    }

    /**
     * Subtract the give vector to the vector
     * @param {number[] | Vector} vector
     * @returns {Vector}
     */
    sub = (vector) => {
      this._vector = Vector.sub(this._vector, vector)
      return this
    }

    /**
     * Vector matrix product or vector vector product
     * @param {number[] | Vector} vector
     * @param {number[] | Vector | number[][] | Matrix} matrix
     * @returns {Vector|number[][]}
     */
      static mul = (vector, matrix) => {
        if (vector.type === 'row') {
          // Check vector type
          vector = Vector.checkVectorType(vector)
          // Check matrix type
          matrix = Matrix.checkMatrixType(matrix)

          if (vector.length !== matrix.length) {
            throw new Error('Cannot perform the vector matrix multiplication, because of incompatible dimension')
          } else {
            const resVector = Vector.rowVect(Vector.zerosArr(vector.length))

            for (let i = 0; i < vector.length; i++) {
              resVector.vector[i] = sum(zipWith(product, vector, Matrix.getCol(matrix, i)))
            }

            return resVector
          }
        } else {
          // Check vector type
          vector = Vector.checkVectorType(vector)
          // the second argument must be vector so we gotta to check is the matrix arg is a vector
          if (!Vector.isVector(matrix)) {
            throw new Error('cannot multiply a col vector with a col vector or a matrix that is incompatible')
          }
          // Check if the vector is not a col vector
          if (matrix instanceof Vector && matrix.type === 'col') {
            throw new Error('Cannot multiply a col vector with a col vector')
          }
          // Check vector type
          matrix = Vector.checkVectorType(matrix)

          if (vector.length !== matrix.length) {
            throw new Error('Dimension are incompatible')
          } else {
            const matrix = Matrix.zeros2dSq(vector.length)

            for (let i = 0; i < vector.length; i++) {
              matrix[i] = matrix.map(x => x * vector[i])
            }

            return matrix
          }
        }
      }

    mul = matrix => {
      const resVector = Vector.mul(this, matrix)
      // if the resVector is Vector fixme
      if (resVector instanceof Vector) {
        this._vector = resVector.vector
        return this
      } else {
        throw new Error('Cannot store a matrix in the vector object')
      }
    }

    /**
     * Compute the euclidean distance of the given vectors
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @returns {number} the euclidean distance between the two vectors
     */
      static distance = (vector1, vector2) => {
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
      distance = (vector) => Vector.distance(this.vector, vector)

      /**
     * Get the angle between two vectors
     * @param {number[] | Vector} vector1
     * @param {number[] | Vector} vector2
     * @param {string} angleType the type of angle to return: radians = "rad", degree ="deg", by default is "deg"
     * @returns {number | {deg: number, arcmin: number, arcsec: number}} angle between the given two vectors
     */
      static angle = (vector1, vector2, angleType = 'deg') => {
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
     * Returns the angle between the vector and the given vector
     * @param {number[] | Vector} vector
     * @param {string} angleType the type of angle to return: radians = "rad", degree ="deg", by default is "deg"
     * @returns {number | {deg: number, arcmin: number, arcsec: number}} angle between the vector and the given vector
     */
      angle = (vector, angleType = 'deg') => Vector.angle(this.vector, vector, angleType)

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
    isOrthogonal = vector => Vector.areVectorsOrthogonal(this.vector, vector)

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
    isOrthonormal = vector => Vector.areVectorOrthonormal(this.vector, vector)

    /**
   * The textual representation of the vector
   * @returns {number[]}
   */
    toString = () => this.vector

    /**
       * vector field getter
       * @returns {number[] }
       */
    get vector () {
      return this._vector
    }
}
