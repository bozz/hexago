
var $ = require('jquery');
var SVG = require('svg');
var BoardView = require('./BoardView.js').BoardView;


$(function() {

    var svg = SVG('board').size(800, 600);

    // var canvasHeight = 400,
    //     canvasWidth = 600,
    //     canvas = document.getElementById('canvas'),
    //     ctx = canvas.getContext('2d');

    // ctx.canvas.height = canvasHeight;
    // ctx.canvas.width = canvasWidth;
    // ctx.fillStyle = '#aaaaaa';
    // ctx.strokeStyle = '#cccccc';
    // ctx.lineWidth = 1;

    var boardView = new BoardView(svg, 50);
    boardView.render();

    console.log("fin.");
});

