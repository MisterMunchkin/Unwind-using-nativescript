var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var foodContext;
var foodItem;

exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< menu_detail page >>>>>>")
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
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("Views/Menu/menu");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Menu/menu");
}

exports.addToCartTap = function(){

    var itemQty = view.getViewById(page, "foodQty").text;
    var remarks = view.getViewById(page, "remarks").text;

    if(itemQty != ""){
        console.log(itemQty + " " + remarks);
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
    }else{
        console.log("please enter item quantity and remarks!");
        //add UI for this soon
    }
}