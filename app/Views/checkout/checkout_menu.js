var page;
var foodArray;
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var view = require("ui/core/view");
var fetchModule = require("fetch");


var items;
var pageData;
var grandTotal;

exports.onLoaded = function(args){
    page = args.object;

    console.log("<<<<<< checkout_menu page >>>>>>");
    pageData = new Observable();
    page.bindingContext = pageData;

    loadItems();

}
exports.onNavBtnTap = function(){
    // the top back button will lead back to the main page
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Menu/menu");
}

function loadItems(){
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
    var date = new Date().toMysqlFormat();

    console.log("food Array: " + JSON.stringify(global.foodArray));
    console.log("grand total: " + grandTotal);
    console.log("timestamp: " + date);
    

    global.checkOutGrandTotal += grandTotal;//adds to the total hotel check out


    requestObject = {timestamp_ordered: date,
                     grandTotal: grandTotal,
                     foodArray: foodArray};
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/insertFoodOrder.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
        var phpResponse = response._bodyText;

            alert({ title: "POST response", message: "Food Added", okButtonText: "Close" });
            console.log("Full response: " + JSON.stringify(response))
            console.log(phpResponse);
            var topmost = frameModule.topmost();
            topmost.navigate("Views/Menu/menu");
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
    })

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

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
