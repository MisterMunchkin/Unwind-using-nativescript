var page;
var foodArray;
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var view = require("ui/core/view");

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
                    price: obj[x].price,
                    qty: obj[x].qty,
                    remarks: obj[x].remarks
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
        console.log("inside for loop");
        grandTotal += (global.foodArray[x].price * global.foodArray[x].qty);
    }
    /*page.bindingContext = {
        grandTotal: grandTotal
    }*/
    console.log(grandTotal);
    view.getViewById(page, "grandTotal").text = grandTotal;
}

exports.checkoutTap = function(){
    console.log("food Array: " + JSON.stringify(global.foodArray));
    console.log("grand total: " + grandTotal);


}
exports.remove = function(args){
    var btn = args.object;
    var food = btn.bindingContext;

    console.log("attempting to remove " + food.name);
    var limit = global.foodArray.length;

    for(var x = 0;x < limit && food.name != global.foodArray[x].name;x++){}
    if(food.name == global.foodArray[x].name){
        grandTotal -= (global.foodArray[x].price * global.foodArray[x].qty);
        console.log(grandTotal);

        items.splice(x, 1);
        global.foodArray.splice(x, 1);
    }
    console.log("after remove (global): " + JSON.stringify(global.foodArray));
    //console.log("after remove (checkout items): " + items);
    //console.log("successfully removed " + food.name);

}

exports.backEvent = function(args){
    grandTotal = 0;
    
    console.log("back pressed");
}