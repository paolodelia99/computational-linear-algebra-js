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

    /**
     * Compute the norm of a vector
     * @returns {number}: the norm of a vector
     */
    getNorm = () =>
        Math.sqrt(this.vector.map( x => x*x).reduce( (a,b) => a+b, 0))

    /**
     * Compute the scalarProduct
     * @param {number} scalar
     * @returns {number[]}: the scalar product of the vector
     */
    scalarProduct = (scalar) =>
       this.vector.map( x => x*scalar);

    /**
     * Compute the product column vector for row vector
     * @param vector2 array
     * @returns {number} the
     */
    product = (vector2) =>
        (zip(this.vector,vector2).map( x => x.reduce( (a,b) => a*b , 1))).reduce( (a,b) => a + b,0);

    /**
     * Return the sum of the arrays as a arguments
     * @returns {array[]}: sum of the inputs array
     */
    static sum (vector1, vector2) {
        vector1 = typeof vector1 === "object" ? vector1.vector : vector1;
        vector2 = typeof vector2 === "object" ? vector2.vector : vector2;

        if(vector1.length !== vector2.length)
            throw "The two vectors haven't the same Length";
        else{
            let sumVector = [];

            for(let i = 0; i < vector1.length;i++)
                    sumVector.push(vector1[i] + vector2[i]);

            return sumVector;
        }
    }
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

