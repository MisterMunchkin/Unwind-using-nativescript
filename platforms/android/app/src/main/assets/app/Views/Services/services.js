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
                        service_type: obj[x].service_type,
                        service_id: obj[x].service_id
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

    var date = new Date().toMysqlFormat();

    global.servicesOrdered.push(
        {
            service_name: tappedItem.service_name,
            service_type: tappedItem.service_type,
            service_id: tappedItem.service_id
        }
    );
    var requestedObject = {service_id: tappedItem.service_id, service_request_date: date, 
                            check_in_id: global.loginCred[2]};
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/insertServiceRequest.php", {
        method: "POST",
        body: formEncode(requestedObject)
    }).then(function (response) {
        
        if(response._bodyText == "service requested"){
            alert({ title: "POST response", message: "service requested!", okButtonText: "Close" }); 
        }else{
            alert({ title: "POST response", message: response._bodyText , okButtonText: "Close" }); 
            console.log("failed: " + JSON.stringify(response));
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    })
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
