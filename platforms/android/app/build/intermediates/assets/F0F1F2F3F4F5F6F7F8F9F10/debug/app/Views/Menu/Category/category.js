var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var items;
var pageData = new Observable();

var loader = new LoadingIndicator();

var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: false,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
};

exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<menu page>>>>>>")
    page.bindingContext = pageData;


    items = new ObservableArray([]);

    items.push(
        {
            name: "Main Course",
            description: "basta"
        },
        {
            name: "Appetizers",
            description: "basta"
        },
        {
            name: "Soup",
            description: "basta"
        },
        {
            name: "Salads",
            description: "basta"
        },
        {
            name: "Side Dish",
            description: "basta"
        },
        {
            name: "Beverages",
            description: "basta"
        },
        {
            name: "Desserts",
            description: "basta"
        }
    )
    pageData.set("items", items);
};
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("tabs/tabs-page");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}

function isData(obj){
    return (obj == "no data")? 0: 1;
}

var foodArray = new Array();
/*exports.selectedItems = function(args){
    var tappedView = args.view,
    tappedItem = tappedView.bindingContext;
    console.log(tappedItem);
    foodArray.push(
        tappedItem
    );
}
*/
exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    var navigationOptions = {
        moduleName: "Views/Menu/menu",
        context: {
            category: tappedItem.name
        }
    }
    console.log("Tapped item: " + JSON.stringify(tappedItem));
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
  
}
exports.fabTap = function(args){//cart button
   
   

    var navigationOptions = {
        moduleName: "Views/checkout/checkout_menu",
        context: {
            category: 0
        }
    }
    console.log("Starting checkout menu activity...")
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
    /*page.showModal(modalPageModule, context, function closeCallback(grandTotal){
        //
        console.log(grandTotal);
    }, fullscreen)*/
}