const BrowseViewModel = require("./booking-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new BrowseViewModel();
}

exports.onLoaded = onLoaded;
