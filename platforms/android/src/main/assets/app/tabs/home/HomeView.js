const HomeViewModel = require("./home-view-model");
var view = require("ui/core/view");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new HomeViewModel();

    var pages = [];

    items.push(
        {
            pageName: "Services",
            pageDesc: "list of services"
        },
        {
            pageName: "Menu",
            pageDesc: "list of food of the menu"
        },
        {
            pageName: "Bill",
            pageDesc: "bill"
        },
        {
            pageName: "Inquiries",
            pageDesc: "help center"
        }
    )

    var page = args.object;
    var listview = view.getViewById(page, "listview");
    listview.items = items;
}

exports.onLoaded = onLoaded;
