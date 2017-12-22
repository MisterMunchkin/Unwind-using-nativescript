var page;
var foodArray;
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items;
var pageData;
var grandTotal;

exports.onLoaded = function(args){
    page = args.object;

    pageData = new Observable();
    page.bindingContext = pageData;

    loadItems();
}

function loadItems(page){
    var obj;

    items = new ObservableArray([]);

    obj = global.foodArray;

    if (obj.length > 0) {
        var limit = obj.length;

        for (var x = 0; x < limit; x++) {
            items.push(
                {
                    name: obj[x].name,
                    description: obj[x].description,
                    price: obj[x].price
                }
            )
            console.log(obj[x].name);
        }
        pageData.set("items", items);
    }


  
    console.log(JSON.stringify(global.foodArray));
    grandTotal = 0;
    var limit = global.foodArray.length;
    for (var x = 0; x < limit; x++) {

        grandTotal += parseInt(global.foodArray[x].price);
    }
    console.log(grandTotal);

}
exports.remove = function(args){
    var btn = args.object;
    var food = btn.bindingContext;

    console.log("attempting to remove " + food.name);
    var limit = global.foodArray.length;

    for(var x = 0;x < limit && food.name != global.foodArray[x].name;x++){}
    if(food.name == global.foodArray[x].name){
        items.splice(x, 1);
        global.foodArray.splice(x, 1);
 
    }
    console.log("after remove (global): " + JSON.stringify(global.foodArray));
    //console.log("after remove (checkout items): " + items);
    //console.log("successfully removed " + food.name);
    grandTotal -= parseInt(food.price);
    console.log(grandTotal);

}

exports.backEvent = function(args){
    grandTotal = 0;
    
    console.log("back pressed");
}