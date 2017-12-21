var page;
var foodArray;
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items;
var pageData = new Observable();


exports.onLoaded = function(args){
    page = args.object;


    var pageDataContext = page.navigationContext;
    page.bindingContext = pageData;
    
    foodArray = pageDataContext.foodArray;
    console.log(JSON.stringify(foodArray));
    var grandTotal = 0;
    var limit = foodArray.length;
    for(var x = 0;x < limit;x++){

        grandTotal += parseInt(foodArray[x].price);
    }
    console.log(grandTotal);
}

exports.backEvent = function(args){
    grandTotal = 0;
    
    console.log("back pressed");
}