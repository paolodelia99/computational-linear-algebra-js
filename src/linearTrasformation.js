class LinearTrasformation {

    transformationMatrix;
    domainDim; //row of the associated matrix
    imageDim; // col of the associated matrix

    constructor() {
        if(arguments.length === 1)
            this.matrixConstructor(arguments[0])
        else
            this.vectorConstructor()
    }

    vectorConstructor(){
        //Da fare
    }

    matrixConstructor(matTransformation){
        this.transformationMatrix = matTransformation;
        this.domainDim = matTransformation.length;
        this.imageDim = matTransformation[0].length;
    }


    static apply = (matrix, vector) => {
        //todo: to implement
    }

    apply = vector => LinearTrasformation.apply(this.transformation, vector);
}

module.exports = Matrix;

