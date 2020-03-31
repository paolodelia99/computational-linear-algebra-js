class Matrix {

    lower; // The lower decomposition of the matrix
    upper; // The Upper decomposition of the matrix

    /**
     * Constructor of the matrix class
     * @param {*[][]} matrix :  can be a bidimensional array or a list of
     *                arrays
     */
    constructor(matrix) {
        this.matrix = Array.isArray(matrix) && Array.isArray(matrix[0]) ? matrix : arguments;
        this.isSquare = this.isMatrixSquare();
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.luDecomposition() //decompose using LU decomposition
        this.determinant = this.getDeterminant();
    }

    /**
     * Create an empty matrix of the given dimension
     * @param {number} row
     * @param {number} col
     * @returns {*[][]}
     */
    static createEmptyMatrix = (row,col) => Array(row).fill().map( () => Array(col).fill(0));

    /**
     * Create an empty square matrix of the given dimension
     * @param {number} dim  : dimension of the matrix
     * @returns {*[][]} empty square matrix
     */
    static createEmptySquareMatrix = (dim) => Array(dim).fill().map( () => Array(dim).fill(0));

    /**
     * Return the identity matrix of the given dimension
     * @param {number} dim
     * @returns {any[][]}
     */
    static createIdentityMatrix = (dim) => {
        let idMatrix = Array(dim).fill().map( () => Array(dim).fill(0));

        for(let i = 0; i < idMatrix.length; i++)
            idMatrix[i][i] = 1;

        return idMatrix;
    };

    /**
     * Clone the matrix
     * @returns {(Buffer | SharedArrayBuffer | T[] | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | T[] | Float64Array | string | Uint16Array | ArrayBuffer | Int32Array | Float32Array | BigInt64Array | Uint8Array | Int8Array | T[])[]}
     */
    static cloneMatrix = (matrix) => matrix.map( a => a.slice());

    /**
     * Check if a matrix is square
     * @returns {boolean} true if is square otherwise false
     */
    isMatrixSquare = () => {
        let isSquare = true;

        for(let i = 0;i < this.matrix.length-1;i++)
            if(this.matrix[i].length  !== this.matrix[i+1].length){
                isSquare = false;
                break;
            }

        return isSquare;
    };

    /**
     * static method that checks if a matrix is square
     * @returns {boolean} true if is square otherwise false
     */
    static isMatrixSquare = (matrix) => {
        let isSquare = true;

        for(let i = 0;i < matrix.length-1;i++)
            if(matrix[i].length  !== matrix[i+1].length){
                isSquare = false;
                break;
            }

        return isSquare;
    };

    /**
     * Get the transpose of the matrix
     * @returns {*[][]} the transpose matrix
     */
    getTranspose = () =>
        this.matrix[0].map( (col,i) => this.matrix.map(row => row[i]))

    /**
     * Static function the return the transpose of the given matrix
     * @param {*[][]} matrix
     * @returns {Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
     */
    static getTranspose = matrix =>
        matrix[0].map((_, iCol) => matrix.map(row => row[iCol]));

    /**
     * Static method for printing matrix
     * @param matrix
     * @returns {Uint8Array | BigInt64Array | *[] | Float64Array | void[] | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
     */
    static printMatrix  = (matrix) =>
        matrix.map( x => console.log(x));

    /**
     * Compute the inverse of a matrix
     * @returns {Uint8Array|BigInt64Array|*[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array}
     */
    getInverse = () => {
        if(!this.isMatrixSquare)
            throw "You can't get the inverse of a non square matrix";
        else if(this.determinant === 0)
            throw "The determinant is 0! The inverse does not exist!";
        else{
            let identityMatrix = Matrix.createIdentityMatrix(this.rows);
            let inverse = [];

            for(let j = 0;j< this.rows;j++)
                inverse.push(this.solveUsingLU(Matrix.getCol(identityMatrix,j)));

            //Transpose the inverse before returning
            return Matrix.getTranspose(inverse);
        }
    };

    /**
     * Compute the determinant of a matrix
     * @returns {number}
     */
    getDeterminant =  () => {
        if(this.rows !== this.cols)
            throw "Non square matrix has no determinant";
        else{
            let det = 1;
            //the determinant it's just the product of the U diagonal
            for(let i = 0;i< this.rows;i++)
                det *= this.upper[i][i];

            return det;
        }
    };

    /**
     *
     * @param matrix
     * @param col
     * @returns {[]}
     */
    static getCol = (matrix,col) => {
        let column = [];

        for(let i = 0;i < matrix.length; i++)
            column.push(matrix[i][col]);

        return column;
    };

    /**
     *
     * @param matrix1
     * @param matrix2
     * @returns {*[][]}
     */
    static sumMatrices = (matrix1, matrix2) => {
        if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length)
            throw "Cannot sum two matrices with different dimension";
        else{
            const resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix1[0].length);

            for(let i = 0;i < matrix1.length;i++)
                for(let j = 0; j < matrix2.length;j++)
                    resMatrix[i][j] = matrix1[i][j] + matrix2[i][j];

            return resMatrix;
        }
    };

    /**
     * Instance method the compute the sum of two matrices calling the static method
     * @param matrix
     * @returns {*[][]|undefined} the sum of the two matrices
     */
    sum = matrix =>
        Matrix.sumMatrices(this.matrix, typeof matrix === "object" ? matrix.matrix : matrix);

    /**
     *
     * @param matrix1
     * @param matrix2
     * @returns {*[][]}
     */
    static subMatrices = (matrix1, matrix2) => {
        if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length)
            throw "Cannot sum two matrices with different dimension";
        else{
            const resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix1[0].length);

            for(let i = 0;i < matrix1.length;i++)
                for(let j = 0; j < matrix2.length;j++)
                    resMatrix[i][j] = matrix1[i][j] - matrix2[i][j];

            return resMatrix;
        }
    };

    /**
     *
     * @param matrix
     * @returns {*[][]|undefined}
     */
    sub = matrix =>
        Matrix.subMatrices(this.matrix, typeof matrix === "object" ? matrix.matrix : matrix);

    /**
     * The LU Decomposition function that decompose the matrix in L and U
     */
    luDecomposition = () => {
        //throw an error is the matrix is not square
        if(!this.isMatrixSquare)
            throw "You can do LU Decomposition only with Square matrices";
        else{
           const res = Matrix.getLUDecomposition(this.matrix);

            this.lower = res.L;
            this.upper = res.U;
        }
    };

    /**
     * Compute the LU decomposition of the given matrix
     * @param {*[][]} matrix
     * @returns {{U: *[][], L: *[][]}}
     */
    static getLUDecomposition = (matrix) => {
        //throw an error is the matrix is not square
        if(!Matrix.isMatrixSquare(matrix))
            throw "You can do LU Decomposition only with Square matrices";
        else{
            let mat = Matrix.cloneMatrix(matrix);
            let n = matrix.length;
            let lower = Matrix.createEmptySquareMatrix(n), upper = Matrix.createEmptySquareMatrix(n);

            for(let k = 0; k < n; k++){
                lower[k][k] = 1;
                upper[k][k] = mat[k][k];

                for(let i = k +1; i < n; i++){
                    lower[i][k] = (mat[i][k]/upper[k][k])
                    upper[k][i] = mat[k][i]
                }

                for(let i = k+1; i < n;i++){
                    for(let j = k +1; j< n;j++)
                        mat[i][j] -= (lower[i][k] * upper[k][j])
                }
            }

            return {
                L : lower,
                U: upper
            }
        }
    };

    /**
     * Solve the linear system using lu decomposition
     * @param rightPart
     * @returns {any[]} - solution of the linear system
     */
    solveUsingLU = (rightPart) => {
        //throw an error is the matrix is not square
        if(!this.isMatrixSquare)
            throw "You can do LU Decomposition only with Square matrices";
        else
             return Matrix.solveUsingLU(this.lower,this.upper,rightPart);
    };

    /**
     *
     * @param lower
     * @param upper
     * @param rightPart
     * @returns {any[]}
     */
    static solveUsingLU = (lower, upper, rightPart) => {
        //throw an error is the matrix is not square
        if(!Matrix.isMatrixSquare(lower) && !Matrix.isMatrixSquare(upper))
            throw "You can do LU Decomposition only with Square matrices";
        else{
            let n = rightPart.length;

            //Calculate the solutions of Ly = b using forward substitution
            let y = Array(n).fill(0);
            for(let i = 0;i < n; i++){
                let sum = 0;

                for(let k = 0;k < i;k++)
                    sum += lower[i][k] * y[k];

                y[i] = (rightPart[i] - sum)/lower[i][i];
            }

            //Calculate the solution of Ux = y using back substitution
            let x = Array(n).fill(0);
            for(let i = n - 1; i >= 0; i--){
                let sum = 0;

                for(let k =i+1;k < n;k++)
                    sum += upper[i][k] * x[k];

                x[i] = (1/upper[i][i]) * (y[i] - sum)
            }

            return x;
        }
    }

    /**
     *
     * @param matrix1
     * @param matrix2
     * @returns {*[][]}
     */
    static ijkMultiplication = (matrix1, matrix2) => {
        //check if the input matrix has the right dimension
        if (matrix1[0].length !== matrix2.length)
            throw "Cannot do the multiplication";
        else {
            let resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix2[0].length);

            for (let i = 0; i < matrix1.length; i++)
                for (let j = 0; j < matrix2[0].length; j++)
                    for (let k = 0;k < matrix1[0].length; k++)
                        resMatrix[i][j] += (matrix1[i][k] * matrix2[k][j]);

            return resMatrix;
        }
    };

    /**
     *
     * @param matrix
     * @returns {*[][]|undefined}
     */
    ijkMultiplication = (matrix) =>
        Matrix.ijkMultiplication(this.matrix, typeof matrix === "object" ? matrix.matrix : matrix);


    static strassenMultiplication = function(a, b, c, leafSize) {
        //fixme: da rivedere tutto
        if (a.n <= leafSize) {
            Matrix.ijkMultiplication(a, b, c);
            return;
        }

        let A = growNextPowerOf2(a);
        let B = growNextPowerOf2(b);

        let n = A.n;

        let A11 = A.partition(0,   0,   n/2, n/2, "A11");
        let A12 = A.partition(0,   n/2, n/2, n,   "A12");
        let A21 = A.partition(n/2, 0,   n,   n/2, "A21");
        let A22 = A.partition(n/2, n/2, n,   n,   "A22");

        let B11 = B.partition(0,   0,   n/2, n/2, "B11");
        let B12 = B.partition(0,   n/2, n/2, n,   "B12");
        let B21 = B.partition(n/2, 0,   n,   n/2, "B21");
        let B22 = B.partition(n/2, n/2, n,   n,   "B22");

        let M1 = Matrix.createEmptySquareMatrix(n);
        let M2 = Matrix.createEmptySquareMatrix(n);
        let M3 = Matrix.createEmptySquareMatrix(n);
        let M4 = Matrix.createEmptySquareMatrix(n);
        let M5 = Matrix.createEmptySquareMatrix(n);
        let M6 = Matrix.createEmptySquareMatrix(n);
        let M7 = Matrix.createEmptySquareMatrix(n);

        Matrix.strassenMultiplication(A11.add(A22), B11.add(B22), M1, leafSize);
        Matrix.strassenMultiplication(A21.add(A22), B11, M2, leafSize);
        Matrix.strassenMultiplication(A11, B12.sub(B22), M3, leafSize);
        Matrix.strassenMultiplication(A22, B21.sub(B11), M4, leafSize);
        Matrix.strassenMultiplication(A11.add(A12), B22, M5, leafSize);
        Matrix.strassenMultiplication(A21.sub(A11), B11.add(B12), M6, leafSize);
        Matrix.strassenMultiplication(A12.sub(A22), B21.add(B22), M7, leafSize);

        let C11 = M1.add(M4).sub(M5).add(M7);
        let C12 = M3.add(M5);
        let C21 = M2.add(M4);
        let C22 = M1.add(M3).sub(M2).add(M6);

        let halfN = C11.n;
        for (let i = 0; i < c.n; i++) {
            for (let j = 0; j < c.n; j++) {
                if (i < halfN && j < halfN) {
                    c.set(i, j, C11.get(i, j));
                }
                else if (i < halfN && j >= halfN) {
                    c.set(i, j, C12.get(i, j - halfN));
                }
                else if (i >= halfN && j < halfN) {
                    c.set(i, j, C21.get(i - halfN, j));
                }
                else if (i >= halfN && j >= halfN) {
                    c.set(i, j, C22.get(i - halfN, j - halfN));
                }
            }
        }
    };
}

//TODO:
// - identity matrix
// - other decomposition
// - multiplication (most efficient way)

module.exports = Matrix;
