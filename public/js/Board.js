
// using axial coordinates
var Board = function() {

    this.rows = 6,
    this.cols = 6,
    this.colShift = 2, // extra grid columns needed for storage
    this.grid = [
        [-1, -1, 0, 0, 0, 0, 0, 0],
        [-1, -1, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, -1, -1],
        [0, 0, 0, 0, 0, 0, -1, -1]
    ];

    // get grid contents at specified coordinates
    this.getAt = function(r, q) {
        var qShifted = q+this.colShift;
        if(qShifted >= this.cols || qShifted < 0 || r < 0 || r >= this.rows) {
            return -1;
        }
        return this.grid[r][q];
    }

    this.each = function(callback) {
        var i, j;
        for(i = 0; i<this.grid.length; i++) {
            for(j = 0; j<this.grid[i].length; j++) {
                if(this.grid[i][j] !== -1) {
                    callback(i-this.colShift, j, this.grid[i][j]);
                }
            }
        }
    }

    // get neighbors of specified coordinates
    this.getNeighbors = function(r, q) {
        // TODO...
    }

};

exports.Board = Board;
