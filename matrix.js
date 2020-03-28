class Matrix {

    /**
     * Constructor of the matrix class
     * @param {number[][]} matrix :  can be a bidimensional array or a list of
     *                arrays
     */
    constructor(matrix) {
        this.matrix = Array.isArray(matrix) && Array.isArray(matrix[0]) ? matrix : arguments;
        this.isSquare = this.isMatrixSquare();
    }

    /**
     * Create an empty matrix of the given dimension
     * @param {number} row
     * @param {number} col
     * @returns {Array[][]}
     */
    static createEmptyMatrix = (row,col) => Array(row).fill(Array(col).fill(0));

    /**
     * Create an empty square matrix of the given dimension
     * @param {number} dim  : dimension of the matrix
     * @returns {Array[][]} empty square matrix
     */
    static createEmptySquareMatrix = (dim) => Array(dim).fill(Array(dim).fill(0))

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


    solveUsingLU = (rightPart) => {
        //throw an error is the matrix is not square
        if(!this.isMatrixSquare)
            throw "You can do LU Decomposition only with Square matrices";
        else{

            let n = this.matrix.length;
            let lu = Array(n).fill(Array(n).fill(0));
            let sum = 0;

            for(let i = 0; i < n; i++){
                for(let j = i;j < n; j++){
                    sum = 0;
                    for(let k=0;k< i;k++)
                        sum += lu[i][k] *lu[k][j];
                    lu[i][j] = this.matrix[i][j] - sum
                }
                for(let j = i+1;j < n;j++){
                    sum = 0;
                    for(let k = 0;k < i;k++)
                        sum += lu[j][k] * lu[k][i];
                    lu[j][i] = (1/lu[i][i]) * (this.matrix[j][i] - sum);
                }
            }

             //lu = L+U-I
            //Calcolo delle soluzioni di Ly = b
            let y = Array(n).fill(0);
            for(let i = 0;i<n; i++){
                sum = 0;
                for(let k = 0;k < i;k++)
                    sum += lu[i][k] * y[k];
                y[i] = rightPart[i] - sum;
            }

            let x = Array(n).fill(0);
            for(let i = n - 1; i >= 0; i--){
                sum = 0;
                for(let k =i+1;k < n;k++)
                    sum += lu[i][k] * x[k];
                x[i] = (1/lu[i][i]) * (y[i] -sum)
            }

            return x;
        }
    }
}

module.exports = Matrix