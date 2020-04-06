class Matrix {
    get matrix() {
        return this._matrix;
    }

    lower; // The lower decomposition of the matrix using LU decomp
    upper; // The Upper decomposition of the matrix using LU decomp

    /**
     * Constructor of the matrix class
     * @param {number[][]} matrix :  can be a bidimensional array or a list of
     *                arrays
     */
    constructor(matrix) {
        this._matrix = Array.isArray(matrix) && Array.isArray(matrix[0]) ? matrix : Array.from(arguments);
        this.isSquare = this.isMatrixSquare();
        this.rows = matrix.length;
        this.cols = this.isSquare ? this.rows : matrix[0].length;
        this.rows === this.cols ? this.luDecomposition() : //Do nothing
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
        let idMatrix = Matrix.createEmptySquareMatrix(dim);

        for(let i = 0; i < dim ; i++)
            idMatrix[i][i] = 1;

        return idMatrix;
    };

    /**
     * Clone the matrix
     * @returns {(Buffer | SharedArrayBuffer | T[] | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | T[] | Float64Array | string | Uint16Array | ArrayBuffer | Int32Array | Float32Array | BigInt64Array | Uint8Array | Int8Array | T[])[]}
     */
    static cloneMatrix = (matrix) => Array.isArray(matrix) ?  matrix.map( a => a.slice()) : matrix._matrix.map(a => a.slice());

    /**
     * Get a copy of the matrix
     * @returns {(Buffer|SharedArrayBuffer|T[]|BigUint64Array|Uint8ClampedArray|Uint32Array|Blob|Int16Array|Float64Array|string|Uint16Array|ArrayBuffer|Int32Array|Float32Array|BigInt64Array|Uint8Array|Int8Array)[]}
     */
    getCopy = () => Matrix.cloneMatrix(this.matrix);

    /**
     * static method that checks if a matrix is square
     * @param {*[][]} matrix
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
     * Check if a matrix is square
     * @returns {boolean} true if is square otherwise false
     */
    isMatrixSquare = () => Matrix.isMatrixSquare(this._matrix);

    /**
     * Static function the return the transpose of the given matrix
     * @param {*[][]} matrix
     * @returns {Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
     */
    static getTranspose = matrix =>
        matrix[0].map((_, iCol) => matrix.map(row => row[iCol]));

    /**
     * Get the transpose of the matrix
     * @returns {*[][]} the transpose matrix
     */
    getTranspose = () =>
        Matrix.getTranspose(this._matrix);

    /**
     * Static method for printing matrix
     * @param matrix
     * @returns {Uint8Array | BigInt64Array | *[] | Float64Array | void[] | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
     */
    static printMatrix  = (matrix) => matrix.map( x => console.log(x));

    /**
     * Print the matrix
     */
    printMatrix = () => Matrix.printMatrix(this._matrix);

    //todo:static method for the inverse

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
        Matrix.sumMatrices(this._matrix, typeof matrix === "object" ? matrix._matrix : matrix);

    /**
     * Static method that compute the subtraction of two matrices
     * @param matrix1
     * @param matrix2
     * @returns {*[][]} the substract matrix
     */
    static subtractMatrices = (matrix1, matrix2) => {
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
     * Subtract the given matrix to the matrix object
     * @param matrix
     * @returns {*[][]}
     */
    sub = matrix =>
        Matrix.subtractMatrices(this._matrix, typeof matrix === "object" ? matrix._matrix : matrix);

    /**
     * Get a subMatrix of the given matrix
     * @param {*[][]} matrix
     * @param {number} rowStart
     * @param {number} rowEnd
     * @param {number} colStart
     * @param {number} colEnd
     * @returns {*[][]}
     */
    static getSubMatrix = (matrix,rowStart,rowEnd,colStart,colEnd) => {
        let subMatrix = Matrix.createEmptyMatrix((rowEnd-rowStart)+1,(colEnd-colStart)+1);

        for(let i =0 ;i < subMatrix.length;i++)
            for(let j = 0;j < subMatrix[i].length;j++)
                subMatrix[i][j] = matrix[rowStart+i][colStart+j];

        return subMatrix;
    };

    /**
     * Get the sub matrix
     * @param {number} rowStart
     * @param {number} rowEnd
     * @param {number} colStart
     * @param {number} colEnd
     * @returns {*[][]} sub matrix
     */
    getSubMatrix = (rowStart,rowEnd,colStart,colEnd) => Matrix.getSubMatrix(this._matrix,rowStart,rowEnd,colStart,colEnd);

    /**
     * The LU Decomposition function that decompose the matrix in L and U
     */
    luDecomposition = () => {
        //throw an error is the matrix is not square
        if(!this.isMatrixSquare)
            throw "You can do LU Decomposition only with Square matrices";
        else{
           const res = Matrix.getLUDecomposition(this._matrix);

            this.lower = res.L;
            this.upper = res.U;
        }
    };

    /**
     * Compute the LU decomposition of the given matrix
     * @param {*[][]} matrix
     * @returns {{U: *[][], L: *[][]}} Object that contain U matrix and L matrix
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
                    lower[i][k] = (mat[i][k]/upper[k][k]);
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
     * Compute the matrix multiplication using the naive method
     * @param {*[][]| Matrix} matrix1
     * @param {*[][]| Matrix} matrix2
     * @returns {*[][]}
     */
    static ijkMultiplication = (matrix1, matrix2) => {
        //check if the input matrix has the right dimension
        if (matrix1[0].length !== matrix2.length)
            throw "Cannot do the multiplication";
        else {
            let resMatrix = Matrix.createEmptyMatrix(matrix1.length, matrix2[0].length);
            //todo : more flexibility for the inputs

            //Compute the calculation
            for (let i = 0; i < matrix1.length; i++)
                for (let j = 0; j < matrix2[0].length; j++)
                    for (let k = 0;k < matrix1[0].length; k++)
                        resMatrix[i][j] += (matrix1[i][k] * matrix2[k][j]);

            return resMatrix;
        }
    };

    /**
     *
     * @param {*[][]| Matrix} matrix
     * @returns {*[][]|undefined}
     */
    ijkMultiplication = (matrix) =>
        Matrix.ijkMultiplication(this._matrix, typeof matrix === "object" ? matrix._matrix : matrix);

    /**
     * Strassen multiplication method that calls the strassen algorithm
     * @param {number[][]} A
     * @param {number[][]} B
     * @param {number} leafSize
     * @returns {*[][]}
     */
    static strassenMultiplication = (A , B,leafSize = 8) => {
        //Check the input type
        if(!(Array.isArray(A) && Array.isArray(B)))
            throw "Type Error";

        //Check if matrices are square matrices
        if(!(A.length === A[0].length && B.length === B[0].length && A.length === B[0].length))
            throw "The matrices aren't square matrices";

        let nextPowerOfTow = n => Math.pow(2,Math.ceil(Math.log2(n)));
        let n = A.length;
        let m = nextPowerOfTow(n);

        let ACopy = Matrix.createEmptySquareMatrix(m);
        let BCopy = Matrix.createEmptySquareMatrix(m);

        //Copy the the matrices
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n;j++){
                ACopy[i][j] = A[i][j];
                BCopy[i][j] = B[i][j];
            }

        const CCopy = Matrix.strassenAlgorithm(ACopy,BCopy,leafSize);
        const C = Matrix.createEmptySquareMatrix(n);

        for(let i = 0; i < n;i++)
            for(let j = 0; j < n;j++)
                C[i][j] = CCopy[i][j];

        return C;
    };

    /**
     * Implementation of the Strassen algorithm
     * @param {*[][]} A
     * @param {*[][]} B
     * @param {number} leafSize
     * @returns {*[][]}
     */
    static strassenAlgorithm = function(A, B , leafSize = 8) {
        let n = A.length;
        if (n <= leafSize)
            return Matrix.ijkMultiplication(A, B);
        else{

            let newSize = Math.floor(n/2);

            //Create the A and B subMatrices
            let A11 = Matrix.getSubMatrix(A,0,newSize-1,0,newSize-1);
            let A12 = Matrix.getSubMatrix(A,0,newSize-1,newSize,n-1);
            let A21 = Matrix.getSubMatrix(A,newSize,n-1,0,Math.floor(newSize)-1);
            let A22 = Matrix.getSubMatrix(A,newSize,n-1,newSize,n-1);

            let B11 = Matrix.getSubMatrix(B,0,newSize-1,0,newSize-1);
            let B12 = Matrix.getSubMatrix(B,0,newSize-1,newSize,n-1);
            let B21 = Matrix.getSubMatrix(B,newSize,n-1,0,newSize-1);
            let B22 = Matrix.getSubMatrix(B,newSize,n-1,newSize,n-1);

            //Seven matrices for the final result
            let M1 = Matrix.strassenAlgorithm(Matrix.sumMatrices(A11,A22), Matrix.sumMatrices(B11,B22),leafSize);
            let M2 = Matrix.strassenAlgorithm(Matrix.sumMatrices(A21,A22), B11,leafSize);
            let M3 = Matrix.strassenAlgorithm(A11, Matrix.subtractMatrices(B12,B22),leafSize);
            let M4 = Matrix.strassenAlgorithm(A22, Matrix.subtractMatrices(B21,B11),leafSize);
            let M5 = Matrix.strassenAlgorithm(Matrix.sumMatrices(A11,A12), B22,leafSize);
            let M6 = Matrix.strassenAlgorithm(Matrix.subtractMatrices(A21,A11), Matrix.sumMatrices(B11,B12),leafSize);
            let M7 = Matrix.strassenAlgorithm(Matrix.subtractMatrices(A12,A22), Matrix.sumMatrices(B21,B22),leafSize);

            let C11 = Matrix.sumMatrices(Matrix.subtractMatrices(Matrix.sumMatrices(M1,M4),M5),M7); // C11 = M1 + M4 - M5 + M7
            let C12 = Matrix.sumMatrices(M3,M5); // C12 = M3 + M5
            let C21 = Matrix.sumMatrices(M2,M4); // C21 = M2 + M4
            let C22 = Matrix.sumMatrices(Matrix.sumMatrices(Matrix.subtractMatrices(M1,M2),M3),M6); // C22 = M1 - M2 + M3 + M6

            let C = Matrix.createEmptySquareMatrix(n);

            //Calculate C
            for(let i = 0; i < newSize;i++)
                for(let j=0;j< newSize;j++){
                    C[i][j] = C11[i][j];
                    C[i][j + newSize] = C12[i][j];
                    C[i + newSize][j] = C21[i][j];
                    C[i + newSize][j + newSize] = C22[i][j];
                }

            return C;
        }
    };
}

//TODO:
// - test strassen
// - other decomposition
// - multiplication (most efficient way)(maybe i gotta use C++ for it)
// - rank

module.exports = Matrix;
