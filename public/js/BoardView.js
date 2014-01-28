
var Board = require('./Board').Board,
    Hex = require('./Hex').Hex;

var BoardView = function(svg, hexSize) {

    this.hexSize = hexSize;
    this.board = new Board();

    this.hexToPixel = function(r, q) {
        return {
            x: this.hexSize * 1.5 * q,
            y: this.hexSize * Math.sqrt(3) * (r + q/2)
        }
    }

    this.render = function() {
        var self = this,
            coords, hex;

        this.board.each(function(r, q, val) {
            coords = self.hexToPixel(r, q);

            console.log("coords: ", r, q, coords);
            hex = new Hex(coords.x, coords.y, self.hexSize);
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
