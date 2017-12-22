var page;
var foodArray;
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items;
var pageData = new Observable();


exports.onLoaded = function(args){
    page = args.object;
    
    page.bindingContext = pageData;

    var obj;
    items = new ObservableArray([]);

    obj = global.foodArray;

    if(obj.length > 0){
        var limit = obj.length;

        for(var x = 0;x < limit;x++){
            items.push(
                {
                    name: obj[x].name,
                    description: obj[x].description,
                    price: obj[x].price
                }
            )
            console.log(obj[x].name);
        }
        pageData.set("items",items);
    }


    foodArray = global.foodArray;
    console.log(JSON.stringify(foodArray));
    var grandTotal = 0;
    var limit = foodArray.length;
    for(var x = 0;x < limit;x++){

        grandTotal += parseInt(foodArray[x].price);
    }
    console.log(grandTotal);

    /*page.bindingContext = {
        grandTotal: grandTotal
    }*/
}

exports.remove = function(args){
    var btn = args.object;
    var item = btn.bindingContext;

    console.log(item.name);
}

exports.backEvent = function(args){
    grandTotal = 0;
    
    console.log("back pressed");
}