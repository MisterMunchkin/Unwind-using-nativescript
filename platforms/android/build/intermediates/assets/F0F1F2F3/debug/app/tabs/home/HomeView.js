const HomeViewModel = require("./home-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

//var page;
var items = new ObservableArray([]);
var pageData = new Observable();

exports.onLoaded = function(args) {
    const component = args.object;
    component.bindingContext = new HomeViewModel();

    //page = args.object;
    //page.bindingContext = pageData;
    component.bindingContext = pageData;

    items.push(
        {
            pageName: "Services",
            pageDesc: "list of services",
            itemImage: ""
        },
        {
            pageName: "Menu",
            pageDesc: "list of food of the menu",
            itemImage: ""
        },
        {
            pageName: "Bill",
            pageDesc: "bill",
            itemImage: ""
        },
        {
            pageName: "Inquiries",
            pageDesc: "help center",
            itemImage: ""
        }
    )

    pageData.set("items", items);
}


