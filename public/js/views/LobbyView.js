
var template = require('../../templates/lobby.hogan'),
    Workspace = require('Workspace'),
    Backbone = require('backbone');
    Backbone.$ = $;

var LobbyView = Backbone.View.extend({

    events: {
        'click .new-game': 'newGameClicked'
    },

    initialize: function(config) {
        config = config || {};

        // if(!config.el || !config.data) {
        //     throw new Error('required argument missing');
        // }

    },

    render: function() {
        this.$el.html(template.render());

        return this;
    },

    newGameClicked: function(e) {
        console.log("create new game...");
        // newGameButton.disabled = true;

        Workspace.socket.emit('create-game', {my: 'data'});
    }

});

module.exports = LobbyView;
