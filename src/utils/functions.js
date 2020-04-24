/**
 * Returns a zip of the two given arrays
 * @param {number[]} arr1
 * @param {number[]|Vector} arr2
 * @returns array[][] bi-dimensional array that is the zip between the two arrays
 */
export const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]])

/**
 * zip function that takes also an high order function and applied it to the given vectors
 * @param {function} f function to apply to the element of the given arrays
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number[] | undefined} return the zip of the given arrays if they have the same length otherwise return undefined
 */
export const zipWith = (f, arr1, arr2) =>
  arr1.length === arr2.length ? (
    arr1.map((x, i) => f(x, arr2[i]))
  ) : undefined

/**
 * Compute the dot product of the given array
 * @param {number[]} xs
 * @param {number[]} ys
 * @returns {number}
 */
export const dotProduct = (xs, ys) => sum(zipWith(product, xs, ys))

/**
 * compute the sum of the given array
 * @param {number[]} arr array
 * @returns {number} the sum of the elements of the array
 */
export const sum = arr =>
  arr.reduce((a, x) => a + x, 0)

/**
 * Compute the product of the given number
 * @param {number} a
 * @param {number} b
 * @returns {number} the product of a and b
 */
export const product = (a, b) => a * b
