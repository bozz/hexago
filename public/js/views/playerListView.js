
var MicroEvent = require('../../lib/microevent.js');

var PlayerListView = function(config) {
    config = config || {};

    if(!config.el || !config.players) {
        throw new Error('required argument missing');
    }

    this.el = document.getElementById(config.el);
    this.players = config.players;

    this.render = function() {
        var html = '<h1>HEXAGO</h1>';
        html += '<ul>';

        this.players.forEach(function(player) {
            html += '<li data-num="' + player.num + '">';
            html += '<div class="color" style="background: ' + player.color + '"></div>';
            html += '<div class="name">' + player.name + '</div>';
            html += '<div class="tiles">' + player.tileCount + '</div>';
            html += '</li>';
        });

        html += '</ul>';

        this.el.innerHTML = html;

        this.el.style.display = '';
    }

    this.updateTileCount = function(player) {
        var el = this.el.querySelector('li[data-num="' + player.num + '"] .tiles');

        if(el) {
            el.innerHTML = player.tileCount;
        }
    }
};

module.exports = PlayerListView;
