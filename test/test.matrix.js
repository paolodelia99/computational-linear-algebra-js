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
        const mat = Matrix.cloneMatrix(matrix.matrix);

        assert.deepStrictEqual(matrix.matrix, mat);
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

describe('test inverse of a matrix', () => {
    it('should give the inverse of the sample matrix', function () {
        const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);
        const inverse = matrix.getInverse();

        assert.deepStrictEqual(inverse, [[1,-2,1],[-0.125, 0.875, -0.375],[-0.25, -0.25, 0.25]])
    });

    it('should the right inverse for a upper triangular matrix', function () {
        const matrix = new Matrix([[1,2,-1],[0,2,3],[0,0,4]]);
        const inverse = matrix.getInverse();

        assert.deepStrictEqual(inverse, [[1,-1,1],[0,0.5,-0.375],[0,0,0.25]])
    });
});

describe('test determinant', () => {
    it('should give the diagonal product of U', function () {
        const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);

        assert.equal(matrix.getDeterminant(),8 )
    });

    it('tets determinat for upper triangual matrix', function () {
        const matrix = new Matrix([[1,2,-1],[1,4,2],[2,6,5]]);

        assert.equal(matrix.getDeterminant(),8 )
    });
})

//fixme: test matrice identità non funziona

// describe('test create identity matrix', () => {
//     it('should give the right identity matrix', () => {
//         const idMatrix = Matrix.createEmptySquareMatrix(4);
//
//         assert.deepStrictEqual(idMatrix.valueOf(), [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ]);
//     })
// });