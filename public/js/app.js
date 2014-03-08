
window.$ = require('jquery');

var Workspace = require('Workspace'),
    Backbone = require('backbone');
    Backbone.$ = $;



$(function() {
    console.log("000000000000", Workspace);
    Workspace.init();
    Backbone.history.start();
});

