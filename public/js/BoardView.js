
var Board = require('./Board').Board,
    Hex = require('./Hex').Hex,
    HexTile = require('./HexTile').HexTile,
    HexView = require('./HexView').HexView

var BoardView = function(svg, hexSize) {

    this.hexSize = hexSize;
    this.board = new Board();

    this.hexToPixel = function(q, r) {
        // pointy topped:
        return {
            x: 400+ this.hexSize * Math.sqrt(3) * (q + r/2),
            y: 300+ this.hexSize * 1.5 * r
        }

        // flat topped:
        // return {
        //     x: 50+ this.hexSize * 1.5 * q,
        //     y: 50+ this.hexSize * Math.sqrt(3) * (r + q/2)
        // }
    }

    this.render = function() {
        var self = this,
            coords, hex;

        this.board.each(function(q, r, hex) {
            coords = self.hexToPixel(q, r);

            // console.log("coords: ", q, r, coords, hex);

            HexView.render(hex, {
                svg: svg,
                x: coords.x,
                y: coords.y,
                size: self.hexSize
            });
        });
    }

};

exports.BoardView = BoardView;
