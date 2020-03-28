/**
 * Class the implements a vector
 */
class Vector{

    /**
     * Constructor of the vector Object
     * @param vector can be an array of a list of integers
     */
    constructor(vector) {
        this.vector = Array.isArray(vector) ? vector : arguments;
    }

    /**
     * Compute the norm of a vector
     * @returns {number}: the norm of a vector
     */
    getNorm = () =>
        Math.sqrt(this.vector.map( x => x*x).reduce( (a,b) => a+b, 0))

    /**
     * Compute the scalarProduct
     * @param scalar
     * @returns {array[]}: the scalar product of the vector
     */
    scalarProduct = (scalar) =>
       this.vector.map( x => x*scalar);

    /**
     * Compute the vector product with the input vector
     * @param vector2 array
     * @returns {array} the
     */
    product = (vector2) =>
        (zip(this.vector,vector2).map( x => x.reduce( (a,b) => a*b,0))).reduce( (a,b) => a+b,0)

    /**
     * Return the sum of the arrays as a arguments
     * @returns {array[]}: sum of the inputs array
     */
    static sum () {
        let sumVector = new Array(arguments[0].length).fill(0)
        for(let i = 0; i < arguments.length;i++)
            for(let j =0;j < arguments[i].length;j++)
                sumVector[j] += arguments[i][j]

        return sumVector;
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

