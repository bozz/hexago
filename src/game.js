var crypto = require('crypto'),
    Board = require('./board');

var Game = function(config) {
    config = config || {};

    this.status = 'waiting';
    this.player1 = config.player1;
    this.player2 = config.player2;
    this.turn = 0;
    this.board;

    this.init = function() {
        this.board = new Board();
    }

    this.generateId = function() {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

    this.toJson = function() {
        return {
            id: this.id,
            status: this.status,
            player1: this.player1,
            player2: this.player2,
            turn: this.turn,
            boardHexes: this.board.getBoardHexes()
        }
    }

    this.id = this.generateId();

    this.init();
}

module.exports = Game;
