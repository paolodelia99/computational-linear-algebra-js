import { Matrix } from '../matrix'

/**
 *
 * @param M
 * @returns {[number, number]}
 */
export const maxNoDiag = M => {
  let p = 0
  let q = 0
  let m = -1
  const n = M.length // Size of the matrix

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (m < Math.abs(M[i][j])) {
        m = Math.abs(M[i][j])
        p = i
        q = j
      }
    }
  }
  return [p, q]
}

/**
 *
 * @param p
 * @param q
 * @param M
 * @returns {[number, number]}
 */
export const getCosSin = (p, q, M) => {
  if (M[p][q] === 0.0) { return [1.0, 0.0] }

  const µ = (M[q][q] - M[p][p]) / (2 * M[p][q])
  let t

  if (µ >= 0) {
    t = 1.0 / (µ + Math.sqrt(1.0 + µ ** 2))
  } else {
    t = -1.0 / (-µ + Math.sqrt(1.0 + µ ** 2))
  }

  const c = 1 / Math.sqrt(1 + t ** 2)
  const s = t / Math.sqrt(1 + t ** 2)

  return [c, s]
}

/**
 *
 * @param a
 * @param b
 * @returns {[number, number]|[number, number]}
 */
export const givens = (a, b) => {
  if (b === 0) {
    return [1, 0]
  } else if (Math.abs(b) > Math.abs(a)) {
    const t = a / b
    const theta = 1 / Math.sqrt(1 + t ** 2)
    const gamma = theta * t
    return [gamma, theta]
  } else {
    const t = b / a
    const gamma = 1 / Math.sqrt(1 + t ** 2)
    const theta = gamma * t
    return [gamma, theta]
  }
}

/**
 *
 * @param dim
 * @param i
 * @param c
 * @param s
 * @returns {number[][]}
 */
export const givensRot = (dim, i, c, s) => {
  const rotM = Matrix.identity2d(dim)

  rotM[i - 1][i - 1] = c
  rotM[i - 1][i] = -s
  rotM[i][i - 1] = s
  rotM[i][i] = c

  return rotM
}

/**
 *
 * @param c
 * @param s
 * @param p
 * @param q
 * @param n
 * @returns {[]}
 */
export const jacobiRotate = (c, s, p, q, n) => {
  const R = []
  for (let i = 0; i < n; i++) {
    R[i] = []
    for (let j = 0; j < n; j++) {
      if (i === p && j === p) {
        R[i][j] = c
      } else if (i === p && j === q) {
        R[i][j] = s
      } else if (i === q && j === p) {
        R[i][j] = -s
      } else if (i === q && j === q) {
        R[i][j] = c
      } else if (i === j) {
        R[i][j] = 1
      } else {
        R[i][j] = 0
      }
    }
  }
  return R
}
