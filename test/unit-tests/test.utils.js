import { zipWith, dotProduct, sum, product, sumOfSquares } from '../../src/utils/functions'
import assert from 'assert'

describe('test product function', () => {
  it('should give the product of the givens number', function () {
    assert.deepStrictEqual(product(10, 5), 10 * 5)
  })
})

describe('test sum of the array', () => {
  it('should give total sum of the array', function () {
    assert.deepStrictEqual(sum([2, 1, 0]), 3)
  })
})

describe('Test zip with', () => {
  it('should apply the product ', function () {
    const arr = [2, 2, 2]
    const arr2 = [2, 2, 1]

    assert.deepStrictEqual(zipWith(product, arr, arr2), [4, 4, 2])
  })
})

describe('Test the dot product of the given arrays', () => {
  it('should give the dot product of the given arrays', function () {
    assert.deepStrictEqual(dotProduct([1, 1, 2], [0, 2, 1]), 4)
  })
})

describe('Test sum of squares high order function', () => {
  it('should give the sum of the quare of the given array', function () {
    const a = [1, 3, 12]

    assert.deepStrictEqual(sumOfSquares(a), 154)
  })
})
