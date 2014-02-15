(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var BoardView = require('./boardView.js');


document.addEventListener('DOMContentLoaded', function() {

    var boardView = new BoardView();
    boardView.render();

    console.log("fin.");
});


},{"./boardView.js":3}],2:[function(require,module,exports){
var Hex = require('./hex'),
    HexTile = require('./hexTile');

// using axial coordinates
var Board = function(config) {

    this.rows = 7; // needs to be uneven number

    var N = Math.floor(this.rows*0.5),
        boardHexes = [];
        grid = [],

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
                    boardHexes.push(new Hex(config));
                    // self.setHexAt(new Hex(config), q, r);
            }
        });
    }

    this.getBoardHexes = function() {
        return boardHexes;
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

    this.removeHex = function(hex) {
        if(hex && hex instanceof Hex) {
            hex.delete();
            this.grid[hex.r+N][hex.q+N] = 0;
        }
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

module.exports = Board;

},{"./hex":4,"./hexTile":5}],3:[function(require,module,exports){

var SVG = (window.SVG),
    Board = require('./board'),
    Hex = require('./hex'),
    HexTile = require('./hexTile'),
    HexView = require('./hexView');

var BoardView = function(config) {
    config = config || {};

    var width = config.width || 700,
        height = config.height || 600,
        hexSize = config.hexSize || 50,
        domEl = config.el || 'board',
        svg = SVG(domEl).size(width, height),

        xOffset = width*0.5,
        yOffset = height*0.5,
        sqrt3 = Math.sqrt(3);

    this.board = new Board();
    this.hexTiles = {};


    var handleClick = function(event) {
        event.preventDefault();

        var coords = this.pixelToHex(event.layerX, event.layerY);

        var hex = this.board.getHexAt(coords.q, coords.r);
        if(hex && hex instanceof Hex) {
            var hexView = this.hexTiles[hexHash(coords)];
            hexView.remove();
            this.hexTiles[hexHash(coords)] = undefined;

            this.board.removeHex(hex);
        } else if(hex === 0){
            hex = new HexTile(coords);
            this.board.setHexAt(hex, coords.q, coords.r);

            var pos = this.hexToPixel(coords.q, coords.r),
                hexView = new HexView({
                    svg: svg,
                    hex: hex,
                    x: pos.x,
                    y: pos.y,
                    size: hexSize
                });

            hexView.render();
            this.hexTiles[hexHash(coords)] = hexView;
        }

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
            hexes = this.board.getBoardHexes(),
            coords, hexView;

        hexes.forEach(function(hex) {
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

module.exports = BoardView;

},{"./board":2,"./hex":4,"./hexTile":5,"./hexView":6}],4:[function(require,module,exports){

var Class = require('../lib/class');

var Hex = Class.extend({
    init: function(config) {
        this.config = config;
        this.type = Hex.TYPE.empty;
        this.q = config.q;
        this.r = config.r;
    },
    delete: function() {
        // cleanup
    }
});

Hex.TYPE = {
    empty: 0,
    green: 1,
    blue: 2
}

module.exports = Hex;

},{"../lib/class":7}],5:[function(require,module,exports){

var Hex = require('./hex');

var HexTile = Hex.extend({
    init: function(config) {
        config = config || {};
        this._super(config);
        this.type = config.type || Hex.TYPE.green;
    }
});

module.exports = HexTile;

},{"./hex":4}],6:[function(require,module,exports){

var Class = require('../lib/class');

// should hexegon be drawn with flat or pointy top?
var flatTopped = false;


// math: http://www.redblobgames.com/grids/hexagons/#basics
var HexView = Class.extend({

    init: function(config) {
        config = config || {};

        if(!config.x || !config.y || !config.svg) {
            throw new Error('required parameters missing!');
        }

        this.hex = config.hex;
        this.x = config.x;
        this.y = config.y;
        this.size = config.size || 50;
        this.svg = config.svg;
    },

    remove: function() {
        if(this.el){
            this.el.remove();
        }
    },

    render: function() {

        var x = this.x,
            y = this.y,

            width = 2 * this.size,
            height = 2 * (this.size * 0.866025),
            vertices = [];

        // calculate vertices
        var widthHalf = width * 0.5,
            widthQuarter = widthHalf * 0.5,
            heightHalf = height * 0.5;

        if(flatTopped) {
            vertices.push([x-widthHalf, y]);
            vertices.push([x-widthQuarter, y-heightHalf]);
            vertices.push([x+widthQuarter, y-heightHalf]);
            vertices.push([x+widthHalf, y]);
            vertices.push([x+widthQuarter, y+heightHalf]);
            vertices.push([x-widthQuarter, y+heightHalf]);
        } else {
            vertices.push([x, y-widthHalf]);
            vertices.push([x+heightHalf, y-widthQuarter]);
            vertices.push([x+heightHalf, y+widthQuarter]);
            vertices.push([x, y+widthHalf]);
            vertices.push([x-heightHalf, y+widthQuarter]);
            vertices.push([x-heightHalf, y-widthQuarter]);
        }

        var vertString = "";
        for(i=0; i<6; i++) {
            vert = vertices[i];
            vertString += vert[0] + ',' + vert[1] + ' ';
        }

        var fill = {color: '#ddd'};
        if(this.hex.type == 1) {
            fill = {color: '#339933'};
        } else if(this.hex.type == 2) {
            fill = {color: '#336699'};
        }

        this.el = this.svg.polygon(vertString).fill(fill).stroke({ width: 1 })

        var text = this.svg.text(this.hex.q + ', ' + this.hex.r);
        text.x(x-10);
        text.y(y+15);
        text.style('font-size:10px');

    }

});

module.exports = HexView;

},{"../lib/class":7}],7:[function(require,module,exports){
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

// (function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  // this.Class = function(){};
  var Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
// })();

module.exports = Class;

},{}]},{},[1])