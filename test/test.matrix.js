const Matrix = require('../src/matrix');
const assert = require('assert');

describe('test lu decomposition', function() {
    it('should decompose the matrix n x n', () => {

        const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);

        assert.deepStrictEqual(matrix.upper.valueOf(), [[1,2,-1],[0,2,3],[0,0,4]]);

        assert.deepStrictEqual(matrix.lower.valueOf(), [[1,0,0],[1,1,0],[2,1,1]])

    });
});

describe('test solving linear system', () => {
    it('should give the right answer', () => {
        const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);

        const res = matrix.solveUsingLU([1,1,10]);

        assert.deepStrictEqual(res, [ 9, -3, 2 ]);
    })
});

describe('test create square matrix', () => {
    it('should give an empty square matrix', () => {
        const matrix = Matrix.createEmptySquareMatrix(3);

        assert.deepStrictEqual(matrix.valueOf(), [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
    })
});

describe('test create matrix', () => {
    it('should give an empty matrix of the given dimension', () => {
        const matrix = Matrix.createEmptyMatrix(3,2);

        assert.deepStrictEqual(matrix.valueOf(), [ [ 0, 0], [ 0, 0 ], [ 0, 0 ] ]);
    })
});

describe('test isMatrixSquare method', () => {
    it('should give true', () => {
        const mat = Matrix.createEmptySquareMatrix(3);
        const matrix = new Matrix(mat);

        assert.equal(matrix.isMatrixSquare(), true);
    })
});

describe('test copy and clone matrix', () => {
    it('should be equal the the created matrix', function () {
        const matrix = new Matrix([[1,-2,-1],[1,4,1],[2,2,5]])
        const mat = matrix.cloneMatrix();

        assert.deepStrictEqual(matrix.matrix, mat);
    });

    it('should copy the give matrix', function () {
        const mat1 = [[1,-2,-1],[1,4,1],[2,2,5]];
        const mat2 = Matrix.copyMatrix(mat1);

        assert.deepStrictEqual(mat1, mat2);
    });
});

describe('test getCol Method', () => {
    it('should give the col of a matrix', () => {
        const matrix = [[1,2,-1],[1,4,2],[2,6,5]];

        assert.deepStrictEqual(Matrix.getCol(matrix,0),[1,1,2]);
    })
});

describe('test matrix transposition', () => {
    it('should give the transpose', () => {
        const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);

        assert.deepStrictEqual(Matrix.getTranspose(matrix.matrix).valueOf(), [[1,1,2],[2,4,6],[-1,2,5]]);
    })
});

//fixme: test matrice identità non funziona

// describe('test create identity matrix', () => {
//     it('should give the right identity matrix', () => {
//         const idMatrix = Matrix.createEmptySquareMatrix(4);
//
//         assert.deepStrictEqual(idMatrix.valueOf(), [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ]);
//     })
// });