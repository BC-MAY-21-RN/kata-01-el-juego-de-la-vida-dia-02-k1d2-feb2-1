class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = this.makeGrid();
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeGrid() {
    const matrix = new Array(this.rows)
      .fill('.')
      .map(() => new Array(this.columns).fill('.'));

    for (let i = 0; i < 5; i++) {
      let x = this.random(0, this.columns - 1);
      let y = this.random(0, this.rows - 1);
      matrix[x][y] = '*';
    }
    return matrix;
  }

  printGrid() {
    console.log(this.matrix);
  }

  checkNeighbors() {
    let contarvecino = 0;
    let limit_l = 0;
    let limit_r = 0;
    let limit_t = 0;
    let limit_b = 0;
    //horizontal
    for (let x = 0; x < this.columns; x++) {
      //vertical
      for (let y = 0; y < this.rows; y++) {
        // [1,1]
        // . . *
        // *|.|*
        // . . .
        //1ra condición      [1,1]
        limit_l = x - 1; // [0,1] 0
        limit_r = x + 1; // [2,1] 2
        limit_t = y - 1; // [1,0] 0
        limit_b = y + 1; // [1,2] 2
        if (limit_l < 0) {
          limit_l = -1;
        }
        if (limit_r < 0) {
          limit_r = -1;
        }
        if (limit_t < 0) {
          limit_t = -1;
        }
        if (limit_b < 0) {
          limit_b = -1;
        }

        //diagonal izquierda arriba
        if (limit_l >= 0 && limit_t >= 0) {
          if (this.matrix[limit_l][limit_t] == '*') {
            contarvecino = contarvecino + 1;
          }
        }
        //izquierda
        if (limit_l >= 0) {
          if (this.matrix[limit_l][y] == '*') {
            contarvecino = contarvecino + 1;
          }
        }
        //diagonal izquierda abajo
        if (limit_l >= 0 && limit_b >= 0) {
          if (this.matrix[limit_l][limit_b] == '*') {
            contarvecino = contarvecino + 1;
          }
        }

        //arriba
        if (limit_t >= 0) {
          if (this.matrix[x][limit_t] == '*') {
            contarvecino = contarvecino + 1;
          }
        }

        //abajo
        if (limit_b >= 0 && limit_b <= this.rows) {
          // console.log('x: ', x);
          //console.log('limit_b: ', limit_b);
          if (this.matrix[x][limit_b] == '*') {
            contarvecino = contarvecino + 1;
          }
        }

        //diagonal derecha arriba
        if (limit_r >= 0 && limit_r < this.columns && limit_t >= 0) {
          //console.log('x: ', limit_r);
          //console.log('y: ', limit_t);
          if (this.matrix[limit_r][limit_t] == '*') {
            contarvecino = contarvecino + 1;
          }
        }
        //derecha
        if (limit_r >= 0 && limit_r < this.columns) {
          //console.log('x: ', limit_r);
          //console.log('y: ', y);
          if (this.matrix[limit_r][y] == '*') {
            contarvecino = contarvecino + 1;
          }
        }
        //diagonal derecha abajo
        if (
          limit_r >= 0 &&
          limit_r <= this.columns &&
          limit_b >= 0 &&
          limit_b <= this.rows
        ) {
          //   if (this.matrix[limit_r][limit_b] == '*') {
          //     contarvecino = contarvecino + 1;
          //   }
        }

        // 1. Cualquier célula viva con menos de dos vecinas vivas muere, como si la causa fuera la subpoblación.
        // 3. Cualquier celda viva con dos o tres vecinos vivos vive en la próxima generación.
        if (this.matrix[x][y] == '*') {
          if (contarvecino == 2 || contarvecino == 3) {
            this.matrix[x][y] = '*';
          } else {
            this.matrix[x][y] = '.';
          }
        } else {
          if (contarvecino == 3) {
            this.matrix[x][y] = '*';
          }
        }
      }
    }
  }
}

let myGrid = new Grid(4, 4);
console.log('Primera generacion');
myGrid.printGrid();
myGrid.checkNeighbors();
console.log('Segunda generacion');
myGrid.printGrid();
