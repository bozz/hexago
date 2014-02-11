
// should hexegon be drawn with flat or pointy top?
var flatTopped = false;


// math: http://www.redblobgames.com/grids/hexagons/#basics
var HexView = {
    
    render: function(hex, config) {

        if(!config.x || !config.y || !config.svg) {
            throw new Error('required parameters missing!');
        }

        var x = config.x,
            y = config.y,
            size = config.size || 50,

            width = 2 * size,
            height = 2 * (size * 0.866025),
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
        if(hex.type == 1) {
            fill = {color: '#339933'};
        } else if(hex.type == 2) {
            fill = {color: '#336699'};
        }
        config.svg.polygon(vertString).fill(fill).stroke({ width: 1 })

        var text = config.svg.text(hex.q + ', ' + hex.r);
        text.x(x-10);
        text.y(y+15);
        text.style('font-size:10px');

    }

}

exports.HexView = HexView;
