
var utils {

    roundToHex: function(x, y, z) {
        var rx = Math.round(x),
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
           x: rx,
           y: ry,
           z: rz
       }
    }
}

module.exports = utils;
