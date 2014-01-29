
var Board = require('./Board').Board,
    HexView = require('./HexView').HexView;

var BoardView = function(svg, hexSize) {

    this.hexSize = hexSize;
    this.board = new Board();

    // hex data
    this.height = hexSize || 50;
    this.edge = this.height * 0.5; // ratio 3/5
    this.pointWidth = this.height * 0.5; // ratio 1/2
    this.width = this.edge + this.height;
    this.size = this.width * 0.5;

    this.hexToPixel = function(r, q) {
        return {
            x: 50+ this.size * 1.5 * q,
            y: 50+ this.size * Math.sqrt(3) * (r + q/2)
        }
    }

    this.render = function() {
        var self = this,
            coords, hex;

        this.board.each(function(r, q, val) {
            coords = self.hexToPixel(r, q);

            console.log("coords: ", r, q, coords);
            hex = new HexView(coords.x, coords.y, self.hexSize);
            hex.drawSvg(svg);
        });
    }

    // var xi = 100,
    //     yi = 40,
    //     height = 50,
    //     heightHalf = 25,
    //     hex, even;

    //         even = i%2 == 0;
    //         hex = new Hex(xi, even?yi+heightHalf:yi, height)
    //         // hex.draw(ctx);
    //         hex.drawSvg(svg);
    //         // console.log("xi:", xi);
    //         xi = xi + hex.edge + hex.pointWidth + 6;
    //     }
    //     xi = 100;
    //     yi = yi + height;

};

exports.BoardView = BoardView;
