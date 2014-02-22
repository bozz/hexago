
var io = require('socket.io-browserify'),
    BoardView = require('./boardView'),
    Player = require('./player'),
    PlayerListView = require('./playerListView');
    // move = require('../lib/move.min.js');


var socket = io.connect('http://localhost:3000');

// socket.on('news', function(data){
//     console.log(data);
//     socket.emit('my other event', {my: 'data'});
// });

socket.on('new-game', function(data) {
    console.log("new game: ", data.id);

    move('#menu').set('opacity', 0).duration('0.3s').then(initGame).end();
});


var initGame = function() {
    var players = [],
        activePlayer = new Player({num: 1});

    players.push(activePlayer);
    players.push(new Player({num: 2}));

    var playerListView = new PlayerListView({
        el: 'player-list',
        players: players
    });
    playerListView.render();

    var boardView = new BoardView();
    boardView.render();

    boardView.bind('addHex', function() {
        activePlayer.tileCount -= 1;
        playerListView.updateTileCount(activePlayer);
    });
    boardView.bind('removeHex', function() {
        activePlayer.tileCount += 1;
        playerListView.updateTileCount(activePlayer);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    var newGameButton = document.querySelector('#menu .new-game');

    newGameButton.addEventListener('click', function(e) {
        newGameButton.disabled = true;

        socket.emit('create-game', {my: 'data'});
    });

    console.log("fin.");
});

