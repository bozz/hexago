
var Hex = require('./hex');

var HexTile = Hex.extend({
    init: function(config) {
        config = config || {};
        this._super(config);
        this.type = config.type || Hex.TYPE.green;
    }
});

module.exports = HexTile;
