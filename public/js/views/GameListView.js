
var gamesTemplate = require('../../templates/games.hogan'),
    Backbone = require('backbone');
    Backbone.$ = $;

var GameListView = Backbone.View.extend({

    initialize: function(config) {
        config = config || {};

        if(!config.el || !config.data) {
            throw new Error('required argument missing');
        }

        this.data = config.data;
        this.players = config.players;
    },

    render: function() {
        this.$el.html(gamesTemplate.render({games: this.data}));

        return this;
    },

    updateTileCount: function(player) {
        var el = this.el.querySelector('li[data-num="' + player.num + '"] .tiles');

        if(el) {
            el.innerHTML = player.tileCount;
        }
    }
});

module.exports = GameListView;
