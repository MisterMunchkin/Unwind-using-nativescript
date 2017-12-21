var page;
var foodArray;
var frameModule = require("ui/frame");

exports.onLoaded = function(args){
    page = args.object;
    
    var pageDataContext = page.navigationContext;

    foodArray = pageDataContext.foodArray;
    console.log(JSON.stringify(foodArray));
    var grandTotal = 0;
    var limit = foodArray.length;
    for(var x = 0;x < limit;x++){
        grandTotal += parseInt(foodArray.price);
    }
    console.log(grandTotal);
}
