
// var SVG = require('svg');

var HexView = function(x, y, height) {
    this.posX = x;
    this.posY = y;
    this.height = height || 50;
    this.edge = height * 0.5; // ratio 3/5
    this.pointWidth = height * 0.5; // ratio 1/2
    this.width = this.edge + height;
    this.vertices = [];

    // calculate vertices
    var widthHalf = this.width * 0.5,
        widthQuarter = widthHalf * 0.5,
        heightHalf = this.height * 0.5;

    this.size = widthHalf;

    this.vertices.push([x-widthHalf, y]);
    this.vertices.push([x-widthQuarter, y-heightHalf]);
    this.vertices.push([x+widthQuarter, y-heightHalf]);
    this.vertices.push([x+widthHalf, y]);
    this.vertices.push([x+widthQuarter, y+heightHalf]);
    this.vertices.push([x-widthQuarter, y+heightHalf]);


    this.drawSvg = function(svg) {
        var vertString = "";
        for(i=0; i<6; i++) {
            vert = this.vertices[i];
            vertString += vert[0] + ',' + vert[1] + ' ';
        }
        svg.polygon(vertString).fill('none').stroke({ width: 1 })
    }

    // deprecated: canvas draw
    this.draw = function(ctx, fill) {
        var fill = fill || false,
            i, vert;

        ctx.beginPath();

        for(i=0; i<6; i++) {
            vert = this.vertices[i];
            if(i==0) {
                ctx.moveTo(vert[0], vert[1]);
            } else {
                ctx.lineTo(vert[0], vert[1]);
            }
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

}

exports.HexView = HexView;
