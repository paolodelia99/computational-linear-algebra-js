import assert from 'assert'
import { getCosSin, maxNoDiag, jacobiRotate, givensRot, givens } from '../../src/utils/matrix_utils_functions'

describe('Test get cos sin for jacobi algo', () => {
  it('should give the right cos ans sin', function () {
    const m = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]

    assert.deepEqual(getCosSin(1, 2, m), [1 / Math.sqrt(2), 1 / Math.sqrt(2)])
  })

  it('should give 1 and 0', function () {
    const m = [[1, 1, 1], [1, 1, 0], [1, 1, 1]]

    assert.deepStrictEqual(getCosSin(1, 2, m), [1.0, 0.0])
  })
})

describe('Test max no Diag', () => {
  it('should give the max number not on the diagonal', function () {
    const m = [[1, 1, 1], [1, 1, 2], [1, 1, 1]]

    assert.deepStrictEqual(maxNoDiag(m), [1, 2])
  })
})

describe('Test jacobiRotate', () => {
  it('should give the matrix rotated', function () {
    assert.deepStrictEqual(jacobiRotate(1, 1, 0, 1, 3), [[1, 1, 0], [-1, 1, 0], [0, 0, 1]])
  })
})

describe('Test givenRot for qr decomposition', function () {
  it('should give the right given rot matrix', function () {
    assert.deepStrictEqual(givensRot(3, 1, 1, 1), [[1, -1, 0], [1, 1, 0], [0, 0, 1]])
  })
})

describe('Test givens method for qr decomposition', () => {
  it('should give the rigth theta and gamma', function () {
    assert.deepStrictEqual(givens(1, 1), [1 / Math.sqrt(2), 1 / Math.sqrt(2)])
  })
})
