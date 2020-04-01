class LinearTrasformation {

    constructor(transformation) {
        this.transformation = transformation;
        this.row = transformation.length;
        this.col = transformation[0].length;
    }

    static apply = (matrix, vector) => {
        if( matrix.length !== vector.length)
            throw "Impossible to apply the transforamtion to the vector";
        else {
            if(Array.isArray(vector))
                for(let i = 0;i< vector.length ;i++)
                    vector[i] = matrix[i].map(x => vector[i]*x)

            return vector;
        }
    }

    apply = vector => LinearTrasformation.apply(this.transformation, vector);
}

module.exports = Matrix;

