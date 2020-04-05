const assert = require('assert')
const LinearTransformation = require('../src/linearTrasformation');
const Matrix = require('../src/Matrix');
const Vector = require('../src/vector');

describe('Test linear creation', () => {
    it('should create properly a linear transformation', function () {
        const t = new LinearTransformation([[1,0,1],[2,0,-1],[1,1,1]]); //Using the bidemisonal array
        const t1 = new LinearTransformation(new Matrix([[1,0,1],[2,0,-1],[1,1,1]])); //Using the matrix Object

        assert.deepStrictEqual(t.transformationMatrix, [[1,0,1],[2,0,-1],[1,1,1]]);
        assert.deepStrictEqual(t1.transformationMatrix, [[1,0,1],[2,0,-1],[1,1,1]]);
    });
});

describe('Test the application of the linear Transformation', () => {
    it('should work for the vectors', function () {
        const matrix = new Matrix([[1,0,1],[2,1,2],[1,-1,1]]);
        const vector = new Vector([1,2,0]);
        const t = new LinearTransformation(matrix);
        const resVector = t.apply(vector);
        const matrix2 = [[1,1,2,0],[1,0,2,-1],[2,3,0,-1]];
        const vector2 = [2,3,1,-1];

        assert.deepStrictEqual(resVector, [1,4,-1]); // Test instance method
        assert.deepStrictEqual(LinearTransformation.apply(matrix2,vector2), [7,5,14]); // Test the static method

    });
})