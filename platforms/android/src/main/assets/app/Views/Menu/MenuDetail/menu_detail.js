var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var foodContext;
var foodItem;

exports.onloaded = function (args) {
    page = args.object

    var pageDataContext = page.navigationContext;
    foodContext = {
        name: pageDataContext.name,
        description: pageDataContext.description,
        price: pageDataContext.price 
    };
    console.log(foodContext.name);
    page.bindingContext = {
        name: foodContext.name
    }
    
}

exports.addToCartTap = function(){

    var itemQty = view.getViewById(page, "foodQty").text;
    var remarks = view.getViewById(page, "remarks").text;
    console.log(itemQty + " " + remarks)
    ;
    foodItem = {
        name: foodContext.name,
        description: foodContext.description,
        price: parseInt(foodContext.price),
        qty: parseInt(itemQty),
        remarks: remarks
    }
    global.foodArray.push(foodItem);

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Menu/menu");
}