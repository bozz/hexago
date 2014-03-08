var io = require('socket.io-browserify'),
    Backbone = require('backbone');
    Backbone.$ = $;

var hx, lobbyView;
var game, gameView, player;

var initSocket = function() {
    // socket.on('news', function(data){
    //     console.log(data);
    //     socket.emit('my other event', {my: 'data'});
    // });

    Workspace.socket.on('game-list', function(data) {
        console.log("game-list:", data);

        var gameListView = new hx.views.GameListView({
            el: '#game-list',
            data: data
        });

        gameListView.render();
    });

    Workspace.socket.on('new-game', function(data) {
        game = data;
        console.log("new game: ", data);

        move('#lobby').set('opacity', 0).duration('0.3s').then(initGame).end();
    });
};

var initGame = function() {
    var players = [];

    if(game) {
        player = new hx.models.Player(game.player1);
        players.push(player);

        _instance.navigate('game/' + game.id, {trigger: true});
    }

    // boardView.bind('addHex', function() {
    //     activePlayer.tileCount -= 1;
    //     playerListView.updateTileCount(activePlayer);
    // });
    // boardView.bind('removeHex', function() {
    //     activePlayer.tileCount += 1;
    //     playerListView.updateTileCount(activePlayer);
    // });
}

var _instance;

var Workspace = Backbone.Router.extend({


    initialize: function(config) {
        Workspace.socket = io.connect('http://localhost:3000');
        initSocket();
    },

    routes: {
        "": "lobby",
        "lobby": "lobby",
        "game/:id": "game",
        "*path": "lobby"
    },

    lobby: function() {
        if(!lobbyView) {
            lobbyView = new hx.views.LobbyView({
                el: '#lobby'
            });
        }
        lobbyView.render();
    },

    game: function(id) {
        if(!gameView) {
            gameView = new hx.views.GameView({
                el: '#game',
                data: game
            });
        }
        gameView.render();
    }

}, {
    init: function(config) {
        hx = require('hx');
        hx.init();

        if(_instance === undefined) {
            _instance = new Workspace(config);
        }
    }
});

module.exports = Workspace;
