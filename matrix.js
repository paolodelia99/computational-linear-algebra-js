class Matrix {

    lower;
    upper;

    /**
     * Constructor of the matrix class
     * @param {number[][]} matrix :  can be a bidimensional array or a list of
     *                arrays
     */
    constructor(matrix) {
        this.matrix = Array.isArray(matrix) && Array.isArray(matrix[0]) ? matrix : arguments;
        this.isSquare = this.isMatrixSquare();
        this.luDecomposition();
    }

    /**
     * Create an empty matrix of the given dimension
     * @param {number} row
     * @param {number} col
     * @returns {Array[][]}
     */
    static createEmptyMatrix = (row,col) => Array(row).fill().map( () => Array(col).fill(0));

    /**
     * Create an empty square matrix of the given dimension
     * @param {number} dim  : dimension of the matrix
     * @returns {Array[][]} empty square matrix
     */
    static createEmptySquareMatrix = (dim) => Array(dim).fill().map( () => Array(dim).fill(0));

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

        return isSquare
    };

    /**
     * Print the matrix
     * @returns {void[]}
     */
    printMatrix = () =>
        this.matrix.map( x => console.log(x));

    /**
     * The LU Decomposition function that decompose the matrix in L and U
     */
    luDecomposition = () => {
        //throw an error is the matrix is not square
        if(!this.isMatrixSquare)
            throw "You can do LU Decomposition only with Square matrices";
        else{
            let mat  = this.matrix;
            let n = this.matrix.length;
            let lower = Array(n).fill().map( () => Array(n).fill(0)), upper = Array(n).fill().map( () => Array(n).fill(0));

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

            this.lower = lower;
            this.upper = upper;
        }
    };

    /**
     * Solve the linear sistem using lu decomposition
     * @param rightPart
     * @returns {any[]} - solution of the linear system
     */
    solveUsingLU = (rightPart) => {
        //throw an error is the matrix is not square
        if(!this.isMatrixSquare)
            throw "You can do LU Decomposition only with Square matrices";
        else{

            let n = this.matrix.length;

             //lu = L+U-I
            //Calculate the solutions of Ly = b
            let y = Array(n).fill(0);
            for(let i = 0;i < n; i++){
                let sum = 0;

                for(let k = 0;k < i;k++)
                    sum += this.lower[i][k] * y[k];

                y[i] = (rightPart[i] - sum)/this.lower[i][i];
            }

            let x = Array(n).fill(0);
            for(let i = n - 1; i >= 0; i--){
                let sum = 0;

                for(let k =i+1;k < n;k++)
                    sum += this.upper[i][k] * x[k];

                x[i] = (1/this.upper[i][i]) * (y[i] - sum)
            }

            return x;
        }
    }
}

module.exports = Matrix
