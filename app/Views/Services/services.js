var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var items;
var pageData = new Observable();

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
};

exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<service page>>>>>>")
    page.bindingContext = pageData;

    var obj;
   
    
    loader = new LoadingIndicator();
    loader.show(options);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/loadServiceData.php", {
        
    }).then(function (response) {
        obj = response._bodyText;
       

        if(obj != "no data" && obj != "query error"){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
           
            for(var x = 0; x < limit;x++){
                items.push(
                    {
                        service_name: obj[x].service_name,
                        service_type: obj[x].service_type
                    }

                );
      
            }
            pageData.set("items", items);
        }else{
            alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    })

    loader.hide();
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



exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("tapped Item: " + tappedItem.service_name);
    /*var navigationOptions = {
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
    if(tappedItem.tapped == 0){
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
