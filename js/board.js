function Board(canvas) {
  let container = document.getElementById("canvas-container");
  canvas.width = container.clientWidth;
  canvas.height = container.clientWidth;
  this.cells = this._createMatrix(Board.GRID_WIDTH, Board.GRID_HEIGHT);
  Board.CELL_WIDTH = canvas.width / Board.GRID_WIDTH;
  this.cellWidth = canvas.width / Board.GRID_WIDTH;

  Board.GRID_COUNT = Board.GRID_WIDTH * Board.GRID_HEIGHT;
  this.art = new Art(canvas, Board.CELL_WIDTH, Board.CELL_PADDING);
  this.canvas = canvas;
}


Board.CELL_PADDING = 1;
Board.GRID_WIDTH = 5;
Board.GRID_HEIGHT = 5;
Board.GRID_COUNT = Board.GRID_WIDTH * Board.GRID_HEIGHT;

Board.prototype._createMatrix = function (width, height, opt_val) {
  var m = [];
  var i, j, row;
  console.log(rand);
  for (i = 0; i < width; i++) {
    row = [];
    for (j = 0; j < height; j++) {
      var rand = Math.random();
      if (rand < 0.5) {
        row.push(false);
      } else {
        row.push(false);

      }
    }
    m.push(row);
  }

  return m;
}

/**
 * Initializes the board.
 */
Board.prototype.init = function () {
  this.canvas.onclick = this.handleClickEvent.bind(this);
  this.show();
}

Board.prototype.handleClickEvent = function (e) {
  var rect = this.canvas.getBoundingClientRect();
  var x = (e.clientX - rect.left);
  var y = (e.clientY - rect.top);

  var cell = this.getCellFromCoordinates(x, y);

  if (cell) {

    this.triggerCell(cell[0], cell[1]);
    if (this.checkState() === Board.GRID_COUNT) {
      alert("VICTORY");
      this.clear();
      this.cells = this._createMatrix(Board.GRID_WIDTH, Board.GRID_HEIGHT);
    };

    this.show();
  }
}

Board.prototype.triggerCell = function (x, y) {
  this.toggleCellState(x, y);
  this.toggleCellState(x, y - 1);
  this.toggleCellState(x + 1, y);
  this.toggleCellState(x, y + 1);
  this.toggleCellState(x - 1, y);
}

Board.prototype.toggleCellState = function (x, y) {
  if (x < 0 || x >= Board.GRID_WIDTH) return;
  if (y < 0 || y >= Board.GRID_HEIGHT) return;

  this.cells[x][y] = !this.cells[x][y];
}

Board.prototype.checkState = function () {
  let count = 0;
  for (i = 0; i < Board.GRID_WIDTH; i++) {
    for (j = 0; j < Board.GRID_HEIGHT; j++) {
      if (this.cells[i][j] === true) {
        count++;
      }
    }
  }
  return count;
}

Board.prototype.getCellFromCoordinates = function (x, y) {
  var tile = Board.CELL_WIDTH + Board.CELL_PADDING;
  console.log(x, y);

  if (x > (this.cellWidth + Board.CELL_PADDING) * Board.GRID_WIDTH) return null;
  if (y > (this.cellWidth + Board.CELL_PADDING) * Board.GRID_WIDTH) return null;

  if (x % tile > Board.CELL_PADDING && y % tile > Board.CELL_PADDING) {
    return [Math.floor(x / tile), Math.floor(y / tile)];
  } else {
    return null;
  }
}

Board.prototype.show = function () {
  this.art.clear();
  var i, j;
  for (i = 0; i < Board.GRID_WIDTH; i++) {
    for (j = 0; j < Board.GRID_HEIGHT; j++) {
      this.art.drawCell(i, j, this.cells[i][j]);
    }
  }
};
