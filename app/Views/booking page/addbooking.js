var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");



exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object
};

