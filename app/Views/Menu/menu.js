var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var items;
var pageData = new Observable();

var loader = new LoadingIndicator();

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
};

exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<menu page>>>>>>")
    page.bindingContext = pageData;

    var obj;
    items = new ObservableArray([]);

    loader.show(options);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/loadMenuData.php", {
        
    }).then(function (response) {
        obj = response._bodyText;
       

        if(isData(obj) > 0){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
           
            for(var x = 0; x < limit;x++){
                items.push(
                    {
                        name: obj[x].name,
                        description: obj[x].description,
                        price: obj[x].price,
                        tapped: 0
                    
                    }

                );
                console.log(obj[x].name);
            }
            pageData.set("items", items);
        }else{
            console.log("put viible no data confirmation here");
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    })
    loader.hide();
    console.log("total food:" + JSON.stringify(global.foodArray));
};
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("tabs/tabs-page");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}

function isData(obj){
    return (obj == "no data")? 0: 1;
}

var foodArray = new Array();
/*exports.selectedItems = function(args){
    var tappedView = args.view,
    tappedItem = tappedView.bindingContext;
    console.log(tappedItem);
    foodArray.push(
        tappedItem
    );
}
*/
exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    var navigationOptions = {
        moduleName: "Views/Menu/MenuDetail/menu_detail",
        context: {
            name: tappedItem.name,
            description: tappedItem.description,
            price: tappedItem.price
        }
    }
    console.log("Tapped item: " + JSON.stringify(tappedItem));
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
    /*if(tappedItem.tapped == 0){
        console.log("tapped");
        tappedItem.tapped = 1;
        foodArray.push(tappedItem);
        console.log(JSON.stringify(foodArray));
    }else{
        console.log("untapped");
        tappedItem.tapped = 0;
        var limit = foodArray.length;
        for(var x = 0;x < limit && tappedItem.name != foodArray[x].name;x++){}
        if(tappedItem.name == foodArray[x].name){
            foodArray.splice(x, 1);
        }
    }*/
}
exports.fabTap = function(args){//cart button
   
   

   /* var navigationOptions = {
        moduleName: "Views/checkout/checkout_menu",
        context: {
            foodArray: foodArray
        }
    }*/
    console.log("Starting checkout menu activity...")
    var topmost = frameModule.topmost();
    topmost.navigate("Views/checkout/checkout_menu");
    /*page.showModal(modalPageModule, context, function closeCallback(grandTotal){
        //
        console.log(grandTotal);
    }, fullscreen)*/
}