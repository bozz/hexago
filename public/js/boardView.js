
var MicroEvent = require('../lib/microevent.js'),
    SVG = require('svg'),
    HexView = require('./hexView');

var BoardView = function(config) {
    config = config || {};

    var width = config.width || 700,
        height = config.height || 600,
        hexSize = config.hexSize || 50,
        domEl = config.el || 'board',
        svg = SVG(domEl).size(width, height),

        boardHexes = config.boardHexes,

        xOffset = width*0.5,
        yOffset = height*0.5,
        sqrt3 = Math.sqrt(3);

    this.hexTiles = {};


    var handleClick = function(event) {
        event.preventDefault();

        var coords = this.pixelToHex(event.layerX, event.layerY);

        // var hex = this.board.getHexAt(coords.q, coords.r);
        // if(hex && hex instanceof Hex) {
        //     var hexView = this.hexTiles[hexHash(coords)];
        //     hexView.remove();
        //     this.hexTiles[hexHash(coords)] = undefined;

        //     this.board.removeHex(hex);

        //     this.trigger('removeHex');
        // } else if(hex === 0){
        //     hex = new HexTile(coords);
        //     this.board.setHexAt(hex, coords.q, coords.r);

        //     var pos = this.hexToPixel(coords.q, coords.r),
        //         hexView = new HexView({
        //             svg: svg,
        //             hex: hex,
        //             x: pos.x,
        //             y: pos.y,
        //             size: hexSize
        //         });

        //     hexView.render();
        //     this.hexTiles[hexHash(coords)] = hexView;
        //     this.trigger('addHex');
        // }

    }.bind(this);

    svg.on('click', handleClick);


    var hexHash = function(coords) {
        return "" + coords.q + coords.r;
    }



    this.hexToPixel = function(q, r) {
        return {
            x: xOffset + hexSize * sqrt3 * (q + r/2),
            y: yOffset + hexSize * 1.5 * r
        }
    }

    this.pixelToHex = function(x, y) {
        x = x - xOffset;
        y = y - yOffset;

        var q = ((1/3) * sqrt3 * x - (1/3) * y) / hexSize,
            r = (2/3) * y / hexSize;

        return roundToHex(q, r);
    }

    this.render = function() {
        var self = this,
            coords, hex;

        this.renderBoard();

        // this.board.each(function(q, r, hex) {
        //     coords = self.hexToPixel(q, r);

        //     HexView.render(hex, {
        //         svg: svg,
        //         x: coords.x,
        //         y: coords.y,
        //         size: self.hexSize
        //     });
        // });
    }

    this.renderBoard = function() {
        var self = this,
            coords, hexView;

        boardHexes.forEach(function(hex) {
            coords = self.hexToPixel(hex.q, hex.r);

            hexView = new HexView({
                svg: svg,
                hex: hex,
                x: coords.x,
                y: coords.y,
                size: self.hexSize
            });
            hexView.render();
        });
    }


    // Private Methods ############################################

    var roundToHex = function(q, r) {
        var x = q,
            y = -q-r,
            z = r,

            rx = Math.round(x),
            ry = Math.round(y),
            rz = Math.round(z),

            xDiff = Math.abs(rx - x),
            yDiff = Math.abs(ry - y),
            zDiff = Math.abs(rz - z);

            if(xDiff > yDiff && xDiff > zDiff) {
                rx = -ry-rz;
            } else if(yDiff > zDiff) {
                ry = -rx-rz;
            } else {
                rz = -rx-ry;
            }

       return {
           q: rx,
           r: rz
       }
    }


};

MicroEvent.mixin(BoardView);

module.exports = BoardView;
