
// math: http://www.redblobgames.com/grids/hexagons/#basics
var HexView = function(x, y, size) {

    // should hexegon be drawn with flat or pointy top?
    flatTopped = false;

    this.posX = x;
    this.posY = y;

    this.size = size || 50;

    this.width = 2 * size;
    this.height = 2 * (this.size * 0.866025);
    this.vertices = [];

    // calculate vertices
    var widthHalf = this.width * 0.5,
        widthQuarter = widthHalf * 0.5,
        heightHalf = this.height * 0.5;

    if(flatTopped) {
        this.vertices.push([x-widthHalf, y]);
        this.vertices.push([x-widthQuarter, y-heightHalf]);
        this.vertices.push([x+widthQuarter, y-heightHalf]);
        this.vertices.push([x+widthHalf, y]);
        this.vertices.push([x+widthQuarter, y+heightHalf]);
        this.vertices.push([x-widthQuarter, y+heightHalf]);
    } else {
        this.vertices.push([x, y-widthHalf]);
        this.vertices.push([x+heightHalf, y-widthQuarter]);
        this.vertices.push([x+heightHalf, y+widthQuarter]);
        this.vertices.push([x, y+widthHalf]);
        this.vertices.push([x-heightHalf, y+widthQuarter]);
        this.vertices.push([x-heightHalf, y-widthQuarter]);
    }


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
