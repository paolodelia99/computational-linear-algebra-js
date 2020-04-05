/**
 * Returns a zip of the two given arrays
 * @param {*[][]} arr1
 * @param {number[]|Vector} arr2
 * @returns array[][] bidimensional array that is the zip between the two arrays
 */
zip = (arr1,arr2) => arr1.map((k,i) => [k,arr2[i]]);

module.exports = zip;