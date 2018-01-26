var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;


var items = new ObservableArray([]);
var pageData = new Observable();


var loadingBar;

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
    loadingBar = page.getViewById("loadingBar");

    
    //loader = new LoadingIndicator();
    //loader.show(options);
    if(items.length == 0){
        console.log("new data fishing...");
        loadingBar.start();
        loadingBar.visibility = "visible";
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
                            service_type: obj[x].service_type,
                            service_id: obj[x].service_id
                        }

                    );
        
                }
                pageData.set("items", items);
            }else{
                alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
            }
            loadingBar.visibility = "collapse";
            loadingBar.stop();
        }, function (error) {
            console.log(JSON.stringify(error));
        })
    }else{
        loadingBar.visibility = "collapse";
        loadingBar.stop();
    }
   // loader.hide();
};
exports.serviceHistoryTap = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/serviceHistory/servicehistory");
}
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

    var navigationOptions = {
        moduleName: "Views/Services/serviceDetail/servicedetail",
        context: {
            service_name: tappedItem.service_name,
            service_type: tappedItem.service_type,
            service_id: tappedItem.service_id
        }
    }
    console.log("Tapped item: " + JSON.stringify(tappedItem));
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);

}
function twoDigits(d){
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function(){
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
