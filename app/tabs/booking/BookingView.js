const BrowseViewModel = require("./booking-view-model");
var frameModule = require("ui/frame");

var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

exports.onLoaded = function(args) {
    const component = args.object;
    component.bindingContext = new BrowseViewModel();
}

exports.fabTap = function(){
    console.log("shit");
    var topmost = frameModule.topmost();
    topmost.navigate("Views/AddBooking/addbooking");
}
