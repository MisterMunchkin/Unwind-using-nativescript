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
        food_id: pageDataContext.food_id,
        name: pageDataContext.name,
        description: pageDataContext.description,
        price: pageDataContext.price ,
        category: pageDataContext.category
    };
    console.log(foodContext.name);
    page.bindingContext = {
        name: foodContext.name
    }
    
}
exports.onNavBtnTap = function(){
    var navigationOptions = {
        moduleName: "Views/Menu/menu",
        context: { 
            category: foodContext.category
        }
    }
    var topmost = frameModule.topmost();
   topmost.navigate(navigationOptions);
}
exports.backEvent = function (args) {

    args.cancel = true;
    var navigationOptions = {
        moduleName: "Views/Menu/menu",
        context: { 
            category: foodContext.category
        }
    }
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
}

exports.addToCartTap = function(){

    var itemQty = view.getViewById(page, "foodQty").text;
    var remarks = view.getViewById(page, "remarks").text;

    if(itemQty != ""){
        console.log(itemQty + " " + remarks);
        foodItem = {
            food_id: foodContext.food_id,
            name: foodContext.name,
            description: foodContext.description,
            price: parseInt(foodContext.price),
            qty: parseInt(itemQty),
            remarks: remarks,
            category: foodContext.category
        }
        global.foodArray.push(foodItem);


        var navigationOptions = {
        moduleName: "Views/Menu/menu",
        context: { 
            category: foodContext.category
            }
        }
        var topmost = frameModule.topmost();
        topmost.navigate(navigationOptions);
    }else{
        console.log("please enter item quantity and remarks!");
        //add UI for this soon
    }
}