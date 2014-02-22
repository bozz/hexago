var crypto = require('crypto');

var Game = function(config) {
    config = config || {};

    this.status = 'waiting';
    this.player1 = config.player1;
    this.player2 = config.player2;
    this.turn = 0;
    this.board;

    this.generateId = function() {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

    this.id = this.generateId();
}

module.exports = Game;
