
var BoardView = require('./boardView');
    // move = require('../lib/move.min.js');


var initGame = function() {
    var boardView = new BoardView();
    boardView.render();
}

document.addEventListener('DOMContentLoaded', function() {

    var newGameButton = document.querySelector('#menu .new-game');

    newGameButton.addEventListener('click', function(e) {
        newGameButton.disabled = true;
        move('#menu').set('opacity', 0).duration('0.3s').then(initGame).end();

    });

    console.log("fin.");
});

