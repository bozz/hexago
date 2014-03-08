
var hx = {
    init: function() {
        hx.views = {
            LobbyView: require('./views/LobbyView'),
            GameListView: require('./views/GameListView'),
            GameView: require('./views/GameView'),
            BoardView: require('./views/boardView'),
            PlayerListView: require('./views/playerListView'),
            HexView: require('./views/hexView')
        };

        hx.models = {
            Player: require('./player')
        };
    }
};

module.exports = hx;
