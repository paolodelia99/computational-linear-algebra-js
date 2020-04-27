import { Vector } from '../../src/vector'
import assert from 'assert'
import { Matrix } from '../../src/entry'

describe('test vector creation', () => {
  it('should create the vector in both ways', function () {
    const vector = new Vector([1, 2, 1], 'row')
    const vector1 = new Vector([-1, 0, 1], 'col')

    assert.deepStrictEqual(vector.vector, [1, 2, 1])
    assert.deepStrictEqual(vector.type, 'row')
    assert.deepStrictEqual(vector1.vector, [-1, 0, 1])
    assert.deepStrictEqual(vector1.type, 'col')
  })
})

describe('Test change type function', () => {
  it('should change a row vector to a col vector', function () {
    const v = new Vector([1, 1, 1], 'row')

    v.changeType()
    assert.deepStrictEqual(v.type, 'col')
  })

  it('should change a col vector to a row vector', function () {
    const v = new Vector([1, 1, 1], 'col')

    v.changeType()
    assert.deepStrictEqual(v.type, 'row')
  })
})

describe('Test row and col vector creation', () => {
  it('should give the row vector', function () {
    const v = Vector.rowVect(1, 2, 3)

    assert.deepStrictEqual(v.vector, [1, 2, 3])
    assert.deepStrictEqual(v.type, 'row')
  })

  it('should give the col vector', function () {
    const v = Vector.colVect(1, 2, 3)

    assert.deepStrictEqual(v.vector, [1, 2, 3])
    assert.deepStrictEqual(v.type, 'col')
  })
})

describe('Test is vector function', () => {
  it('should be true for a vector obj', function () {
    const v = new Vector([1, 2, 3], 'col')

    assert.deepStrictEqual(Vector.isVector(v), true)
  })

  it('should be true for an array', function () {
    const v = [1, 2, 3]

    assert.deepStrictEqual(Vector.isVector(v), true)
  })

  it('should be false for an matrix', function () {
    const v = new Matrix([1, 2, 3], [1, 2, 3])

    assert.deepStrictEqual(Vector.isVector(v), false)
  })

  it('should be false for an 2d array', function () {
    const v = [[1, 2, 3], [1, 2, 3]]

    assert.deepStrictEqual(Vector.isVector(v), false)
  })
})

describe('Test vector printing', () => {
  it('should print the vector', function () {
    const vector = [1, 2, 1]

    // Test static method
    console.assert(Vector.print(vector), console.log(vector))
  })
})

describe('Test array and vector creation', () => {
  describe('Test creation of an empty array', () => {
    it('should give an empty array', function () {
      const vector = Vector.zerosArr(3)

      assert.deepStrictEqual(vector, [0, 0, 0])
    })
  })

  describe('Test creation of a array filled with random integers', () => {
    it('should give a random vector of the given dimension', function () {
      const vector = Vector.randIntArr(4, -10, 10)

      assert.deepStrictEqual(vector.length, 4)
      for (let i = 0; i < vector.length; i++) {
        assert.deepStrictEqual(typeof vector[i] === 'number', true)
      }
    })
  })

  describe('Test zeros vector creation', () => {
    it('should give the vector obj filled with zeros', function () {
      const v = Vector.zeros(3)

      assert.deepStrictEqual(v instanceof Vector, true)
      assert.deepStrictEqual(v.vector, [0, 0, 0])
      assert.deepStrictEqual(v.dim, 3)
    })
  })

  describe('Test rand vector creation', () => {
    it('should give the vector obj filled with random integers', function () {
      const v = Vector.randInt(3, 0, 5)

      assert.deepStrictEqual(v instanceof Vector, true)
      assert.deepStrictEqual(v.dim, 3)
    })
  })
})

describe('Test check vector type function', () => {
  it('should give the array no matter what', function () {
    const vector1 = new Vector([1, 2, 0])
    const vector2 = [1, 2, 0]

    assert.deepStrictEqual(Vector.checkVectorType(vector1), [1, 2, 0])
    assert.deepStrictEqual(Vector.checkVectorType(vector2), [1, 2, 0])
  })
})

describe('test the get norm function', () => {
  it('should give the norm of the vector', () => {
    const vector1 = new Vector([1, 2, 1])
    const vector2 = new Vector([45, 6, 7])
    const vector3 = [1, 3, 2]

    assert.deepStrictEqual(vector1.getNorm(), Math.sqrt(6))
    assert.deepStrictEqual(vector2.getNorm(), Math.sqrt((45 * 45) + (6 * 6) + (7 * 7)))
    assert.deepStrictEqual(Vector.getNorm(vector3), Math.sqrt(14))
  })
})

describe('test scalar product', () => {
  it('should multiply the vector by the given scalar', function () {
    const vector = new Vector([1, 2, 1])

    assert.deepStrictEqual(vector.scalarProduct(5).vector, [5, 10, 5])
  })
})

describe('test sum of vectors', () => {
  it('should give the sum of the vectors', function () {
    const vector1 = new Vector([2, 3, 1])
    const vector2 = new Vector([-1, 2, -1])

    assert.deepStrictEqual(Vector.sum(vector1, vector2), [1, 5, 0])
    assert.deepStrictEqual(vector1.sum(vector2).vector, [1, 5, 0])
  })

  it('should throw an error if the vectors haven\'t the same dimension', function () {
    const vector1 = new Vector([2, 3, 1, 4])
    const vector2 = new Vector([-1, 2])

    try {
      Vector.sum(vector1, vector2)
    } catch (e) {
      if (e instanceof Error) {
        assert.deepStrictEqual(e.message, 'The two vectors haven\'t the same Length')
      }
    }
  })
})

describe('test subtraction of two vectors', () => {
  it('should give the subtraction of two vectors', function () {
    const vector1 = [2, 1, 1]
    const vector2 = [1, 0, 1]

    assert.deepStrictEqual(Vector.sub(vector1, vector2), [1, 1, 0])
  })

  it('should substract the second vector', function () {
    const vector1 = new Vector([2, 1, 1])
    const vector2 = new Vector([1, 0, 1])

    assert.deepStrictEqual(vector1.sub(vector2).vector, [1, 1, 0])
  })

  it('should throw an error if the vectors haven\'t the same dimension', function () {
    const vector1 = new Vector([2, 3, 0, 4])
    const vector2 = new Vector([-1, 2])

    try {
      Vector.sub(vector1, vector2)
    } catch (e) {
      if (e instanceof Error) {
        assert.deepStrictEqual(e.message, 'The two vectors haven\'t the same Length')
      }
    }
  })
})

describe('test zip function', () => {
  it('should give the zip of two arrays', function () {
    // zip function
    const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]])
    const arr1 = [1, 2, 1]
    const arr2 = [2, 6, -5]

    assert.deepStrictEqual(zip(arr1, arr2), [[1, 2], [2, 6], [1, -5]])
  })
})

describe('test the product between the column vector and the row vector', () => {
  it('should give the vector col multiply for the the row vector', function () {
    const vector1 = new Vector([1, 2, 1])
    const vector2 = new Vector([3, 2, 6])

    assert.deepStrictEqual(vector1.dotProduct(vector2), 13)
    assert.deepStrictEqual(Vector.dotProduct(vector1, vector2), 13)
  })
})

describe('test the cross product between two vectors', () => {
  it('should give a 3d vector that is the res ', function () {
    const vector1 = new Vector([1, 2, 1])
    const vector2 = new Vector([3, 2, 6])

    assert.deepStrictEqual(Vector.crossProduct(vector1, vector2), [10, -3, -4])
    assert.deepStrictEqual(vector1.crossProduct(vector2).vector, [10, -3, -4])
  })

  // Test Static method
  it('should throw an error if the one of the vector isn\'t a 3d vector', function () {
    const vector1 = new Vector([12, 2, 3, 4])
    const vector2 = new Vector([2, 3, 4, 5])

    try {
      Vector.crossProduct(vector1, vector2)
    } catch (e) {
      if (e instanceof Error) {
        assert.deepStrictEqual(e.message, 'crossProduct is defined only for 3d vectors')
      }
    }
  })

  // Test instance method
  it('should throw an error if the one of the vector isn\'t a 3d vector', function () {
    const vector1 = new Vector([12, 2, 3])
    const vector2 = new Vector([2, 3, 4, 5])

    try {
      vector1.crossProduct(vector2)
    } catch (e) {
      if (e instanceof Error) {
        assert.deepStrictEqual(e.message, 'crossProduct is defined only for 3d vectors')
      }
    }
  })
})

describe('Test euclidian distance', () => {
  it('should give the right result', function () {
    const vector1 = new Vector([1, 1, 1])
    const vector2 = new Vector([2, 0, 1])

    assert.deepStrictEqual(Vector.distance(vector1, vector2), Math.sqrt(2))
  })

  // Test instance method
  it('should throw an error if the one of the vector isn\'t a 3d vector', function () {
    const vector1 = new Vector([12, 2, 3])
    const vector2 = new Vector([2, 3, 4, 5])

    try {
      vector1.distance(vector2)
    } catch (e) {
      if (e instanceof Error) {
        assert.deepStrictEqual(e.message, 'Cannot compute the euclidean distance of two vectors with different dimensions')
      }
    }
  })
})

describe('Test the getAngle function', () => {
  it('should give the angle between the two vectors in radians', function () {
    const vector1 = new Vector([2, 3, 1])
    const vector2 = new Vector([1, 1, 2])

    assert.deepStrictEqual(Vector.angle(vector1, vector2, 'rad'), 0.7016741237876036)
  })

  it('should give the angle between the two vectors in degree', function () {
    const vector1 = new Vector([2, 3, 1])
    const vector2 = new Vector([1, 1, 2])

    assert.deepStrictEqual(vector1.angle(vector2, 'deg'), { deg: 40, arcmin: 12, arcsec: 10 })
  })

  it('should throw an exception', function () {
    const vector1 = new Vector([2, 3, 1])
    const vector2 = new Vector([1, 1, 2])

    try {
      vector1.angle(vector2, 'sos')
      assert.fail('should throw an error')
    } catch (e) {
      assert.deepStrictEqual(e.message, 'angleType invalid')
    }
  })
})

describe('test vector orthogonality and orthonormality', () => {
  // Test static method
  it('should give true because the vectors are orthogonal', function () {
    const vector1 = new Vector([2, 0, 3, 0])
    const vector2 = new Vector([0, 2, 0, 12])

    assert.deepStrictEqual(Vector.areVectorsOrthogonal(vector1, vector2), true)
  })

  // Test instance method
  it('should give false because the vectors aren\'t orthogonal', function () {
    const vector1 = new Vector([2, 0, 3, 1])
    const vector2 = new Vector([0, 2, 0, 12])

    assert.deepStrictEqual(vector1.isOrthogonal(vector2), false)
  })

  // Test vector orthonormality
  // Test static method
  it('should give true because the vectors are orthonormal', function () {
    const vector1 = new Vector([0, 0, 1, 0])
    const vector2 = new Vector([0, 1, 0, 0])

    assert.deepStrictEqual(Vector.areVectorOrthonormal(vector1, vector2), true)
  })

  // Test instance method
  it('should give false because the vectors aren\'t orthonormal', function () {
    const vector1 = new Vector([1, 0, 1, 1])
    const vector2 = new Vector([0, 1, 0, 1])

    assert.deepStrictEqual(vector1.isOrthonormal(vector2), false)
  })
})

describe('test Vector matrix multiplication', () => {
  it('should work with right vector and matrix', function () {
    const v = new Vector([0.85, 0.10, 0.05, 0], 'row')
    const stoMat = new Matrix([[0.90, 0.07, 0.02, 0.01], [0, 0.93, 0.05, 0.01], [0, 0, 0.85, 0.15], [0, 0, 0, 1.00]])

    assert.deepStrictEqual(Vector.mul(v, stoMat).vector, [0.765, 0.15250000000000002, 0.0645, 0.017])
  })

  it('should not work with col vector', function () {
    const v = new Vector([0.85, 0.10, 0.05, 0], 'col')
    const stoMat = new Matrix([[0.90, 0.07, 0.02, 0.01], [0, 0.93, 0.05, 0.01], [0, 0, 0.85, 0.15], [0, 0, 0, 1.00]])

    try {
      Vector.mul(v, stoMat)
      assert.fail('Should throw an exception')
    } catch (e) {
      assert.deepStrictEqual(e.message, 'cannot multiply a col vector with a col vector or a matrix that is incompatible')
    }
  })

  it('should not work with row vector with incompatible dimension', function () {
    const v = new Vector([0.85, 0.10, 0.05, 0, 0], 'row')
    const stoMat = new Matrix([[0.90, 0.07, 0.02, 0.01], [0, 0.93, 0.05, 0.01], [0, 0, 0.85, 0.15], [0, 0, 0, 1.00]])

    try {
      Vector.mul(v, stoMat)
      assert.fail('Should throw an exception')
    } catch (e) {
      assert.deepStrictEqual(e.message, 'Cannot perform the vector matrix multiplication, because of incompatible dimension')
    }
  })

  it('should not work with two col vectors', function () {
    const v1 = new Vector([0.85, 0.10, 0.05, 0, 0], 'col')
    const v2 = new Vector([0.85, 0.10, 0.05, 0, 0], 'col')

    try {
      Vector.mul(v1, v2)
      assert.fail('Should throw an exception')
    } catch (e) {
      assert.deepStrictEqual(e.message, 'Cannot multiply a col vector with a col vector')
    }
  })
})

describe('Test to string', () => {
  it('should give the textual representation of the vector', function () {
    const v = new Vector([1, 2, 3])

    assert.deepStrictEqual(v.toString(), [1, 2, 3])
  })
})
