
var Hex = function(x, y, size) {
    this.posX = x;
    this.posY = y;
    this.size = size || 40;

    this.draw = function(ctx, fill) {
        var fill = fill || false,
            baseAngle = 2 * Math.PI / 6,
            i, angle, xi, yi;

        ctx.beginPath();

        for(i=0; i<6; i++) {
            angle = baseAngle * (i+0.5);
            xi = this.posX + this.size * Math.cos(angle);
            yi = this.posY + this.size * Math.sin(angle);

            if(i==0) {
                ctx.moveTo(xi, yi);
            } else {
                ctx.lineTo(xi, yi);
            }
        }

        ctx.closePath();
        ctx.stroke();
    };
}




$(function() {

    var canvasHeight = 400,
        canvasWidth = 600,
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    ctx.canvas.height = canvasHeight;
    ctx.canvas.width = canvasWidth;
    ctx.fillStyle = '#999999';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;

    var xi = 50,
        size = 40;
    for(var i=0; i<8; i++) {
        console.log("xi:", xi);
        new Hex(xi, 50, size).draw(ctx);
        xi = xi + size * Math.sqrt(3);
    }

    console.log("fin.");
});

