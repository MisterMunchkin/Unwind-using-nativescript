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

var listview;
var actionBar;
var pageDataContext;
var noData;

exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<menu page>>>>>>");
    pageDataContext = page.navigationContext;

    page.bindingContext = pageData;
    listview = page.getViewById("listview");
    actionBar = page.getViewById("actionBar");
    noData = page.getViewById("noData");
    var obj;
    items = new ObservableArray([]);

    actionBar.title = pageDataContext.category;
    var requestedObject = {category: pageDataContext.category}
    loader.show(options);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/loadMenuDataByCategory.php", {
        method: "POST",
        body: formEncode(requestedObject)
    }).then(function (response) {
        obj = response._bodyText;
       

        if(isData(obj) > 0){

           // items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
           
            for(var x = 0; x < limit;x++){
                items.push(
                    {
                        food_id: obj[x].food_id,
                        name: obj[x].name,
                        description: obj[x].description,
                        price: obj[x].price,
                        currency: "PHP",
                        tapped: 0,
                        category: obj[x].category
                    
                    }

                );
                console.log("food in category: " + obj[x].name);
            }
            pageData.set("items", items);
        }else{
            pageData.set("items", items);
            noData.class = "page-placeholder";
            console.log("put visible no data confirmation here");
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    })
    loader.hide();
    console.log("total food:" + JSON.stringify(global.foodArray));
};
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("Views/Menu/Category/category");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Menu/Category/category");
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
            food_id: tappedItem.food_id,
            name: tappedItem.name,
            description: tappedItem.description,
            price: tappedItem.price,
            category: tappedItem.category
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
   
   

    var navigationOptions = {
        moduleName: "Views/checkout/checkout_menu",
        context: {
            category: pageDataContext.category
        }
    }
   // console.log("Tapped item: " + JSON.stringify(tappedItem));
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
    console.log("Starting checkout menu activity...")
  
    /*page.showModal(modalPageModule, context, function closeCallback(grandTotal){
        //
        console.log(grandTotal);
    }, fullscreen)*/
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}