
var $ = require('jquery');
var SVG = require('svg');
var BoardView = require('./BoardView.js').BoardView;


$(function() {
    var svg = SVG('board').size(850, 700);

    var boardView = new BoardView(svg, 50);
    boardView.render();

    console.log("fin.");
});

