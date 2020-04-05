const Matrix = require('./matrix');
const zip = require('./utils/functions');

class LinearTransformation {

    kernel;
    image;
    _transformationMatrix;
    surective;
    injective;

    /**
     * Constructor for the linearTransformation
     * @param {*[][]| Matrix} matTransformation
     */
    constructor(matTransformation) {
        this._transformationMatrix = !Array.isArray(matTransformation) ? matTransformation.matrix : matTransformation;
        this.domainDim = this.transformationMatrix.length; //row of the associated matrix
        this.imageDim = this.transformationMatrix[0].length; // col of the associated matrix
    }

    /**
     * Apply the give linear transformation
     * @param {number[][] | Matrix}matrix
     * @param {number[] | Vector} vector
     * @returns {number[]} the transformed vector
     */
    static apply = (matrix, vector) => {
        //fixme: implement also for the matrix

        //Check matrix vector compatibility
        let refVector = Array.isArray(vector) ? vector : vector.getCopy();
        let refMatrix = Array.isArray(matrix) ? matrix : matrix.getCopy();
        if(refVector.length !== refMatrix[0].length)
            throw "Cannot apply the linear Transformation";
        else{
            let resVector = Array(refMatrix.length);

            for(let i = 0; i < matrix.length; i++){
                resVector[i] = (zip( refMatrix[i] , refVector).map( x => x.reduce( (a,b) => a*b , 1))).reduce( (a,b) => a + b,0);
            }

            return resVector;
        }
    };

    /**
     * Apply the linear Transformation to the give vector
     * @param {number[]} vector
     * @returns {number[]} the transformed vector
     */
    apply = vector => LinearTransformation.apply(this._transformationMatrix, vector);

    /**
     * @returns {*} the matrix transformation
     */
    get transformationMatrix() {
        return this._transformationMatrix;
    }
}

module.exports = LinearTransformation;

