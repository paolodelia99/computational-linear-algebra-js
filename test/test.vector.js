const Vector = require('../src/vector');
const assert = require('assert');

describe('test vector creation', () => {
    it('should create the vector in both ways', function () {
        const vector = new Vector([1,2,1]);
        const vector1 = new Vector(-1,0,1);

        assert.deepStrictEqual(vector.vector, [1,2,1]);

        assert.deepStrictEqual(vector1.vector, [-1,0,1]);
    });
});

describe('test the get norm function', () => {
    it('should give the norm of the vector', () => {
        const vector1 = new Vector([1,2,1]);
        const vector2 = new Vector([45,6,7]);
        const vector3 = [1,3,2];

        assert.equal(vector1.getNorm(), Math.sqrt(6));
        assert.equal(vector2.getNorm(), Math.sqrt((45*45)+(6*6)+(7*7)));
        assert.equal(Vector.getNorm(vector3), Math.sqrt(14));
    })
});

describe('test scalar product', () => {
    it('should give the scalar product', function () {
        const vector = new Vector([1,2,1]);

        assert.deepStrictEqual(vector.scalarProduct(5), [5,10,5])
    });
});

describe('test sum of vectors', () => {
    it('should give the sum of the vectors', function () {
        const vector1 = new Vector([2,3,1]);
        const vector2 = new Vector([-1,2,-1]);

        assert.deepStrictEqual(Vector.sum(vector1,vector2), [1,5,0]);
        assert.deepStrictEqual(vector1.sum(vector2),[1,5,0]);
    });
});

describe('test zip function', () => {
    it('should give the zip of two arrays', function () {
        //zip function
        const zip = (arr1,arr2) => arr1.map((k,i) => [k,arr2[i]]);
        const arr1 = [1,2,1];
        const arr2 = [2,6,-5];

        assert.deepStrictEqual(zip(arr1,arr2), [[1,2],[2,6],[1,-5]]);
    });
});

describe('test the product between the column vector and the row vector', () => {
    it('should give the vector col multiply for the the row vector', function () {
        const vector1 = new Vector([1,2,1]);
        const vector2 = new Vector([3,2,6]);

        assert.equal(vector1.dotProduct(vector2.vector), 13);
        assert.equal(Vector.dotProduct(vector1,vector2),13);
    });
});

describe('test the cross product between two vectors', () => {
    it('should give a 3d vector that is the res ', function () {
        const vector1 = new Vector([1,2,1]);
        const vector2 = new Vector([3,2,6]);

        assert.deepStrictEqual(vector1.crossProduct(vector2), [10, -3 , -4]);
        assert.deepStrictEqual(Vector.crossProduct(vector1,vector2), [10, -3 , -4]);
    });
});