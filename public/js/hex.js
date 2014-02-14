
var Class = require('../lib/class');

var Hex = Class.extend({
    init: function(config) {
        this.config = config;
        this.type = Hex.TYPE.empty;
        this.q = config.q;
        this.r = config.r;
    },
    delete: function() {
        // cleanup
    }
});

Hex.TYPE = {
    empty: 0,
    green: 1,
    blue: 2
}

module.exports = Hex;
