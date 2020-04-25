import assert from 'assert'
import { LinearTransformation } from '../../src/linearTrasformation'
import { Matrix } from '../../src/matrix'
import { Vector } from '../../src/vector'

describe('Test creation of linear transformation', () => {
  it('should create properly a linear transformation', function () {
    const t = new LinearTransformation([[1, 0, 1], [2, 0, -1], [1, 1, 1]]) // Using the bidemisonal array
    const t1 = new LinearTransformation(new Matrix([[1, 0, 1], [2, 0, -1], [1, 1, 1]])) // Using the matrix Object

    assert.deepStrictEqual(t.transformationMatrix, [[1, 0, 1], [2, 0, -1], [1, 1, 1]])
    assert.deepStrictEqual(t1.transformationMatrix, [[1, 0, 1], [2, 0, -1], [1, 1, 1]])
  })
})

describe('Test the application of the linear Transformation', () => {
  it('should work for the vectors', function () {
    const matrix = new Matrix([[1, 0, 1], [2, 1, 2], [1, -1, 1]])
    const vector = new Vector([1, 2, 0])
    const t = new LinearTransformation(matrix)
    const resVector = t.apply(vector)
    const matrix2 = [[1, 1, 2, 0], [1, 0, 2, -1], [2, 3, 0, -1]]
    const vector2 = [2, 3, 1, -1]

    assert.deepStrictEqual(resVector, [1, 4, -1]) // Test instance method
    assert.deepStrictEqual(LinearTransformation.apply(matrix2, vector2), [7, 5, 14]) // Test the static method
  })

  it('should throw an exception if the vector size don\'t match with the matrix', function () {
    const matrix = new Matrix([[1, 0, 1], [2, 1, 2], [1, -1, 1]])
    const vector = new Vector([1, 2, 0, 3])
    const t = new LinearTransformation(matrix)

    try {
      t.apply(vector)
      assert.fail('should throw an error')
    } catch (e) {
      if (e instanceof Error) {
        assert.deepStrictEqual(e.message, 'Cannot apply the linear Transformation')
      }
    }
  })

  // fixme: gotta find a way to implement this in the coverage, becase nyc doesn't include the dependencies
  if (process.env.NODE_ENV === 'test') {
    it('should work with the matrices', function () {
      const t = new LinearTransformation(Matrix.randMat(4, 3, -2, 2))
      const matrix = Matrix.randMat(3, 4, -2, 2)

      assert.deepEqual(t.apply(matrix), Matrix.mul(t._transformationMatrix, matrix))
    })

    it('should throw an error if the two matrices aren\'t incompatible for the multiplication', function () {
      const t = new LinearTransformation(Matrix.randMat(4, 3, -2, 2))
      const matrix = Matrix.randMat(4, 4, -2, 2)

      try {
        t.apply(matrix)
        assert.fail('Should throw an error')
      } catch (e) {
        assert.deepStrictEqual(e.message, 'Cannot apply the linear transformation to the matrix')
      }
    })
  }
})

describe('test apply inverse', () => {
  it('should give the inverse', function () {
    const matrix = new Matrix([[1, 2, 3], [-1, 2, 0], [0, -4, 1]])
    const vector = new Vector([1, 1, 1])
    const t = new LinearTransformation(matrix.matrix)

    // Test static method
    assert.deepStrictEqual(LinearTransformation.applyInverse(matrix, vector), [-9 / 8, -1 / 16, 3 / 4])
    // Test instance Method
    assert.deepStrictEqual(t.applyInverse(vector), [-9 / 8, -1 / 16, 3 / 4])
  })
})
