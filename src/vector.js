/**
 * Class the implements a vector
 */
class Vector{

    /**
     * Constructor of the vector Object
     * @param vector can be an array of a list of integers
     */
    constructor(vector) {
        this.vector = Array.isArray(vector) ? vector : Array.from(arguments);
    }

    //todo:test it
    /**
     * Static method that compute the norm of a vector
     * @param {*[]} vector
     * @returns {number} the norm of a vector
     */
    static getNorm = (vector) => Math.sqrt(vector.map( x => x*x).reduce( (a,b) => a+b,0));

    /**
     * Compute the norm of a vector
     * @returns {number}: the norm of a vector
     */
    getNorm = () => Vector.getNorm(this.vector);

    /**
     *
     * @param vector
     * @param scalar
     * @returns {*|Uint8Array|BigInt64Array|number[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array}
     */
    static scalarProduct = (vector,scalar) => vector.map( x => x*scalar);

    /**
     * Compute the scalarProduct
     * @param {number} scalar
     * @returns {number[]}: the scalar product of the vector
     */
    scalarProduct = (scalar) => Vector.scalarProduct(this.vector,scalar);

    /**
     * Compute the product column vector for row vector (static method)
     * @param {*[]} vector1
     * @param {*[]} vector2
     * @returns {number} the product of the row vector and the col vector
     */
    static product = (vector1, vector2) =>
        (zip(vector1 = Array.isArray(vector1) ? vector1 : vector1.vector,vector2 = Array.isArray(vector2) ? vector2 : vector2.vector).map( x => x.reduce( (a,b) => a*b , 1))).reduce( (a,b) => a + b,0)

    /**
     * Compute the product column vector for row vector
     * @param {*[]} vector2
     * @returns {number} the product of the row vector and the col vector
     */
    product = (vector2) => Vector.product(this.vector, vector2);

    /**
     * Compute the sum of the two vectors (static method)
     * @param {*[]} vector1
     * @param {*[]} vector2
     * @returns {*[]} The sum of the two vectors
     */
    static sum (vector1, vector2) {
        //Check the input types
        vector1 = Array.isArray(vector1) ? vector1 : vector1.vector;
        vector2 = Array.isArray(vector2) ? vector2 : vector2.vector;

        if(vector1.length !== vector2.length)
            throw "The two vectors haven't the same Length";
        else{
            let sumVector = [];

            for(let i = 0; i < vector1.length;i++)
                    sumVector.push(vector1[i] + vector2[i]);

            return sumVector;
        }
    }

    //todo: test it
    /**
     * Sum the vector with the given vector (instance method)
     * @param {*[]} vector
     * @returns {Array[]} the sum of the two vectors
     */
    sum = (vector) => Vector.sum(this.vector,vector);
};

//Utility functions

/**
 * Returns a zip of the two given arrays
 * @param arr1
 * @param arr2
 * @returns array[][] bidimensional array that is the zip between the two arrays
 */
const zip = (arr1,arr2) => arr1.map((k,i) => [k,arr2[i]]);

module.exports = Vector;

