
var Class = require('resig-class');

var Hex = Class.extend({
    init: function(config) {
        this.config = config;
        this.type = Hex.TYPE.empty;
        this.q = config.q;
        this.r = config.r;
    },
    delete: function() {
        // cleanup
    },
    toJson: function() {
        return {
            type: this.type,
            q: this.q,
            r: this.r
        }
    }
});

Hex.TYPE = {
    empty: 0,
    green: 1,
    blue: 2
}

module.exports = Hex;
