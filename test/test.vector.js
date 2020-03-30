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
        const vector2 = new Vector([45,6,7])

        assert.equal(vector1.getNorm(), Math.sqrt(6));

        assert.equal(vector2.getNorm(), Math.sqrt((45*45)+(6*6)+(7*7)));
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

        assert.deepStrictEqual(Vector.sum(vector1,vector2), [1,5,0])
    });
});

//fixme : product is wrong

// describe('test the vector product', () => {
//     it('should give the vector product', function () {
//         const vector1 = new Vector([1,2,1]);
//         const vector2 = new Vector([3,2,6]);
//
//         assert.equal(vector1.product(vector2.vector), 13)
//     });
// });