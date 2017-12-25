var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var foodContext;

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
    global.foodArray.push(foodContext);

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Menu/menu");
}