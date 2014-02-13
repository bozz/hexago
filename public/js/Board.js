var Hex = require('./Hex').Hex,
    HexTile = require('./HexTile').HexTile;

// using axial coordinates
var Board = function(config) {

    this.rows = 7; // needs to be uneven number

    var N = Math.floor(this.rows*0.5);

    // currently only creates hexagon grids with uneven row numbers
    this.initGrid = function() {

        this.grid = [];

        for(var i=0; i<this.rows; i++) {
            this.grid.push([]);
            for(var j=0; j<this.rows; j++) {
                var tmp = i-N;
                if((tmp<0 && j<Math.abs(tmp)) || (tmp>0 && j>=this.rows-tmp)) {
                    this.grid[i].push(-1);
                } else {
                    this.grid[i].push(0);
                }
            }
        }
    }

    this.init = function(config) {
        var self = this,
            config = {};

        this.initGrid();

        this.each(function(q, r, hex) {
            config.q = q;
            config.r = r;

            switch(hex) {
                case 1:
                    self.setHexAt(new HexTile(config), q, r);
                    break;
                case 2:
                    config.type = hex;
                    self.setHexAt(new HexTile(config), q, r);
                    break;
                default:
                    self.setHexAt(new Hex(config), q, r);
            }
        });
    }

    // get grid contents at specified coordinates
    this.getHexAt = function(q, r) {
        return this.grid[r+N][q+N];
    }

    this.setHexAt = function(hex, q, r) {
        if(!hex || typeof q == "undefined" || typeof r == "undefined") {
            throw new Error('required arguments missing');
        }

        var currentHex = this.getHexAt(q, r);
        if(currentHex instanceof Hex){
            currentHex.delete();
        }

        this.grid[r+N][q+N] = hex;
    }

    this.each = function(callback) {
        var i, j, q, r;
        for(i = 0; i<this.grid.length; i++) {
            for(j = 0; j<this.grid[i].length; j++) {
                if(this.grid[i][j] !== -1) {
                    callback(j-N, i-N, this.grid[i][j]);

                    var q = j-N;
                    var r = i-N;
                }
            }
        }
    }

    // get neighbors of specified coordinates
    this.getNeighbors = function(q, r) {
        // TODO...
    }


    // initialize
    this.init();

};

exports.Board = Board;
