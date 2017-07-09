export class MatrixService {
	matrix: Matrix;

	createMatrix(rows: number, cols: number){
		
		this.matrix = new Matrix(rows, cols);
		
		  for(let i = 0; i < rows*cols; i++){
             this.matrix.cells.push([i % cols, (i - i % cols)/cols, 0]);
			 this.matrix.cells;
         };
	};

	getCell(x: number, y: number): number[]{
		return this.matrix.cells[x*y];
	};

};

export class Matrix {
    cells: number[][] = [];

    constructor(private rows: number, private cols: number){};
}