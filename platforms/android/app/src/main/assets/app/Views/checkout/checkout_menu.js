var page;
var foodArray;
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var view = require("ui/core/view");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var loader;

var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: false,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
}

var items;
var pageData;
var grandTotal;
var listview;
var pageDataContext;

exports.onLoaded = function(args){
    page = args.object;

    console.log("<<<<<< checkout_menu page >>>>>>");
    pageData = new Observable();
    pageDataContext = page.navigationContext;

    page.bindingContext = pageData;
    listview = page.getViewById("listview");
    loadItems();

}
exports.onNavBtnTap = function(){
    // the top back button will lead back to the main page
    if(pageDataContext.category == 0){
        var topmost = frameModule.topmost();
        topmost.navigate("Views/Menu/Category/category");
    }else{
        var navigationOptions = {
            moduleName: "Views/Menu/menu",
            context: {
                category: pageDataContext.category
            }
        }
    
        var topmost = frameModule.topmost();
        topmost.navigate(navigationOptions);
    }
    
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
                    food_id: obj[x].food_id,
                    name: obj[x].name,
                    description: obj[x].description,
                    price: obj[x].price,
                    qty: obj[x].qty,
                    currency: "PHP",
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
    view.getViewById(page, "grandTotal").text = "PHP " + grandTotal;
}

exports.checkoutTap = function(){
    var date = new Date().toMysqlFormat();

    console.log("food Array: " + JSON.stringify(global.foodArray));
    console.log("grand total: " + grandTotal);
    console.log("timestamp: " + date);
    

    if(global.foodArray.length > 0){ 
        console.log("Grand Hotel Total: " + global.checkOutGrandTotal);

        requestObject = {timestamp_ordered: date,
                        grandTotal: grandTotal,
                        check_in_id: global.loginCred[2],
                        foodArray: JSON.stringify(global.foodArray)};//send global.foodArray and process insertFoodItem in the back end, 

        loader = new LoadingIndicator();

        loader.show(options);
        fetchModule.fetch("https://unwindv2.000webhostapp.com/food/insertFoodOrder.php", {
            method: "POST",
            body: formEncode(requestObject)

        }).then(function (response) {
            var phpResponse = response._bodyText;
        // console.log("Full response: " + JSON.stringify(response));
            
            if(phpResponse.indexOf("error") <= -1){
                console.log("<<<<<<<response: " + phpResponse);
                alert({ message: "Food Order sent!", okButtonText: "Close" });
                global.checkOutGrandTotal += grandTotal;//adds to the total hotel check out
                global.foodArray = new Array();
                var topmost = frameModule.topmost();
                topmost.navigate("tabs/tabs-page");
           /* var limit = global.foodArray.length;
            var count = 0;

            for(var x = 0;x < limit;x++){

                var requestFoodItem = {qty: global.foodArray[x].qty, 
                                    food_id: global.foodArray[x].food_id,
                                    food_order_id: phpResponse,
                                    check_in_id: global.loginCred[2]};
                fetchModule.fetch("https://unwindv2.000webhostapp.com/food/insertFoodItem.php",{
                    method: "POST",
                    body: formEncode(requestFoodItem)
                }).then(function(response){
                    var phpResponse = reponse._bodyText;
                    console.log("<<<<<<response>>>>>>>>" + JSON.stringify(response));
                    console.log("reply from insertFoodItem.php: " + phpResponse);
                    if(phpResponse.indexOf("error") <= -1){
                        count++;
                    }

                    if(count == limit){
                        alert({ title: "POST response", message: "Food Added", okButtonText: "Close" });
                        global.foodArray = new Array();
                        console.log(phpResponse);
                        var topmost = frameModule.topmost();
                        topmost.navigate("Views/Menu/menu");
                    }else{
                        alert({ title: "POST response", message: "Fatal Error", okButtonText: "Close" });
                        global.foodArray = new Array();
                        console.log(phpResponse);
                        var topmost = frameModule.topmost();
                        topmost.navigate("Views/Menu/menu");
                    }
                }, function(error){
                    console.log("ERROR");
                    console.log(JSON.stringify(error));
                });
            }*/
            /*alert({ title: "POST response", message: "Food Added", okButtonText: "Close" });
            global.foodArray = new Array();
            console.log(phpResponse);
            var topmost = frameModule.topmost();
            topmost.navigate("Views/Menu/menu");*/
            }else{
                alert({ title: "POST response", message: "error: please try again", okButtonText: "Close" });
                //global.foodArray = new Array();
                console.log(phpResponse);
            // var topmost = frameModule.topmost();
                //topmost.navigate("Views/Menu/menu");
            }
            loader.hide();
        }, function (error) {
            console.log("ERROR");
            console.log(JSON.stringify(error));
        })
    }else{
        alert({ message: "Please add atleast one food to the cart", okButtonText: "Okay" });
    }
}
exports.remove = function(args){
    var btn = args.object;
    var food = btn.bindingContext;

    console.log("attempting to remove " + food.name);
    var limit = global.foodArray.length;

    for(var x = 0;x < limit && food.name != global.foodArray[x].name;x++){}
    if(food.name == global.foodArray[x].name){
        if(global.foodArray[x].qty != 1){
            global.foodArray[x].qty--;
            items.getItem(x).qty--;
            
            grandTotal -= global.foodArray[x].price; //redundant because the else condition deletes the foodItem so I can no longer use the price outside
            listview.refresh();
        }else{
            //grandTotal -= (global.foodArray[x].price * global.foodArray[x].qty);
            grandTotal -= global.foodArray[x].price;
            console.log(grandTotal);
           
            items.splice(x, 1);
            global.foodArray.splice(x, 1);
        }
        page.getViewById("grandTotal").text = "PHP " + grandTotal;//updates grandTotal 
    }
    console.log("after remove (global): " + JSON.stringify(global.foodArray));
    //console.log("after remove (checkout items): " + items);
    //console.log("successfully removed " + food.name);

}

exports.backEvent = function(args){
   // grandTotal = 0;
    
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
