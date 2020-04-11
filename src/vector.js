const zip = require('./utils/functions');

/**
 * Class the implements a vector
 */
class Vector{
    /**
     * Constructor of the vector Object
     * @param vector can be an array of a list of integers
     */
    constructor(vector) {
        this._vector = Array.isArray(vector) ? vector : Array.from(arguments);
    }

    /**
     *
     * @param {number[]} vector1
     * @returns {*}
     */
    static getCopy = (vector1) => vector1.slice();

    /**
     *
     * @returns {*}
     */
    getCopy = () => Vector.getCopy(this.vector);

    /**
     * Static method that compute the norm of a vector
     * @param {number[]} vector
     * @returns {number} the norm of a vector
     */
    static getNorm = (vector) => Math.sqrt(vector.map( x => x*x).reduce( (a,b) => a+b,0));

    /**
     * Compute the norm of a vector
     * @returns {number}: the norm of a vector
     */
    getNorm = () => Vector.getNorm(this._vector);

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
    scalarProduct = (scalar) => Vector.scalarProduct(this._vector,scalar);

    /**
     * Compute the product column vector for row vector (static method)
     * @param {*[]} vector1
     * @param {*[]} vector2
     * @returns {number} the product of the row vector and the col vector
     */
    static dotProduct = (vector1, vector2) =>
        (zip(vector1 = Array.isArray(vector1) ? vector1 : vector1.vector,vector2 = Array.isArray(vector2) ? vector2 : vector2.vector).map( x => x.reduce( (a,b) => a*b , 1))).reduce( (a,b) => a + b,0);

    /**
     * Compute the product column vector for row vector
     * @param {*[]} vector2
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
        //Check Vector Type
        let x1 = Array.isArray(vector1) ? vector1 : vector1.vector;
        let x2 = Array.isArray(vector2) ? vector2 : vector2.vector;
        // Cross product of two 3D vectors.
        if(x1.length !== 3 && x2.length !== 3)
            throw 'crossProduct is defined only for 3d vectors.';
        else
            return [
                x1[1]*x2[2] - x1[2]*x2[1],
                x1[2]*x2[0] - x1[0]*x2[2],
                x1[0]*x2[1] - x1[1]*x2[0]
            ]
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

    /**
     * Sum the vector with the given vector (instance method)
     * @param {*[]} vector
     * @returns {number[]} the sum of the two vectors
     */
    sum = (vector) => Vector.sum(this._vector,vector);

    /**
     * vector field getter
     * @returns {number[] }
     */
    get vector() {
        return this._vector;
    }
};

module.exports = Vector;

