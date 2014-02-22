
var Class = require('../lib/class');

var playerColors = ['#339933', '#336699', '#993333', '#999933', '#996633'];

var Player = Class.extend({
    init: function(config) {
        config = config || {};

        // if(!config.num) {
        //     throw new Error('required argument missing');
        // }

        this.name = config; //config.name || 'Player' + config.num;
        this.color = playerColors[0];
        this.tileCount = 8;
    },

    delete: function() {
        // cleanup
    }
});

module.exports = Player;
