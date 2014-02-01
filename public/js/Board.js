
// using axial coordinates
var Board = function() {

    this.rows = 6,
    this.cols = 7,
    this.colShift = 2, // extra grid columns needed for storage
    this.grid = [
        [-1, -1, -1, -1, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
        [-1, 0, 0, 0, 0, 0, 0, -1, -1, -1]
    ];
    // this.grid = [
    //     [-1, -1, 0, 0, 0, 0, 0, 0, 0],
    //     [-1, -1, 0, 0, 0, 0, 0, 0, 0],
    //     [-1, 0, 0, 0, 0, 0, 0, 0, -1],
    //     [-1, 0, 0, 0, 0, 0, 0, 0, -1],
    //     [0, 0, 0, 0, 0, 0, 0, -1, -1],
    //     [0, 0, 0, 0, 0, 0, 0, -1, -1]
    // ];

    // get grid contents at specified coordinates
    this.getAt = function(q, r) {
        var rShifted = r+this.colShift;
        if(rShifted >= this.cols || rShifted < 0 || q < 0 || q >= this.rows) {
            return -1;
        }
        return this.grid[q][r];
    }

    this.each = function(callback) {
        var i, j;
        for(i = 0; i<this.grid.length; i++) {
            for(j = 0; j<this.grid[i].length; j++) {
                if(this.grid[i][j] !== -1) {
                    callback(j-this.colShift, i, this.grid[i][j]);
                }
            }
        }
    }

    // get neighbors of specified coordinates
    this.getNeighbors = function(q, r) {
        // TODO...
    }

};

exports.Board = Board;
