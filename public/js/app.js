
var $ = require('jquery');
var SVG = require('svg');
var Hex = require('./hex.js').Hex;


$(function() {

    var svg = SVG('board').size(600, 400);

    // var canvasHeight = 400,
    //     canvasWidth = 600,
    //     canvas = document.getElementById('canvas'),
    //     ctx = canvas.getContext('2d');

    // ctx.canvas.height = canvasHeight;
    // ctx.canvas.width = canvasWidth;
    // ctx.fillStyle = '#aaaaaa';
    // ctx.strokeStyle = '#cccccc';
    // ctx.lineWidth = 1;

    var xi = 100,
        yi = 40,
        height = 50,
        heightHalf = 25,
        hex, even;

    for(var row=0; row<7; row++) {
        for(var i=0; i<7; i++) {
            even = i%2 == 0;
            hex = new Hex(xi, even?yi+heightHalf:yi, height)
            // hex.draw(ctx);
            hex.drawSvg(svg);
            // console.log("xi:", xi);
            xi = xi + hex.edge + hex.pointWidth + 6;
        }
        xi = 100;
        yi = yi + height;
    }

    console.log("fin.");
});

