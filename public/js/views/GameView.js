
var template = require('../../templates/game.hogan'),
    Workspace = require('Workspace'),
    hx = require('hx'),
    Backbone = require('backbone');
    Backbone.$ = $;

var GameView = Backbone.View.extend({

    initialize: function(config) {
        config = config || {};

        if(!config.el || !config.data) {
            throw new Error('required argument missing');
        }

        this.data = config.data;
    },

    render: function() {
        this.$el.html(template.render());

        // var playerListView = new hx.views.PlayerListView({
        //     el: 'player-list',
        //     players: players
        // });
        // playerListView.render();

        this.boardView = new hx.views.BoardView({
            boardHexes: this.data.boardHexes
        });
        this.boardView.render();

        return this;
    }

});

module.exports = GameView;
