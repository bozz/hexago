var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    Game = require('./src/game');

server.listen(3000);
console.log('listening on port 3000');


app.use('/', express.static(__dirname + '/public'));

// app.get('/', function (req, res) {
//     res.sendfile(__dirname + '/public/index.html');
// });

// app.get('/', function(req, res) {
//     res.send('Hexago!');
// });

var games = [],
    game;

io.sockets.on('connection', function(socket) {
    // socket.emit('news', {hello: 'world'});
    // socket.on('my other event', function(data) {
    //     console.log(data);
    // });

    socket.on('create-game', function(data) {
        console.log(data, socket.id);

        game = new Game({
            player1: socket.id
        });
        games.push(game);

        socket.emit('new-game', game.toJson());
    });
});
