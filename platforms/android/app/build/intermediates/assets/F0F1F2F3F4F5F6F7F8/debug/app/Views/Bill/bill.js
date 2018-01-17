var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");


exports.onloaded = function (args) {
    page = args.object

    var items = {//accordion not working
        title: "Rooms", footer: "10", headerText: "first", footerText: "last",
        items: [
            {text: "regular"},
            {text: "shit"}
        ]
    }
    page.bindingContext = {
        items: items
    }
};