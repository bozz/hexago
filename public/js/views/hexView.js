
var Class = require('../../lib/class');

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
