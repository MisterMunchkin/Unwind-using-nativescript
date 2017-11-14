const BrowseViewModel = require("./booking-view-model");

exports.onLoaded = function(args) {
    const component = args.object;
    component.bindingContext = new BrowseViewModel();
}


