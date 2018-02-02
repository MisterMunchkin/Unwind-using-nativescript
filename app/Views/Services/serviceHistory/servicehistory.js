var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;


var items = new ObservableArray([]);
var pageData = new Observable();


var loadingBar;
var noData;
var listview;
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
    noData = page.getViewById("noData");
    listview = page.getViewById("listview");
    //loader = new LoadingIndicator();
    //loader.show(options);

    console.log("new data fishing...");
    loadingBar.start();
    loadingBar.visibility = "visible";
    var requestObject = {check_in_id: global.loginCred[2]};
    //NOT WORKING YET
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getServicesHistory.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        obj = response._bodyText;
    
        console.log("finished fishing");
        console.log("OBJECT: " + obj);
        if(obj.indexOf("error") == -1){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
            var itemImage = "~/images/Booking/status/";
            for(var x = 0; x < limit;x++){

                switch(obj[x].serviceRequestStatus){
                    case "Pending":
                    itemImage += "waiting.png";
                    break;

                    case "Waiting":
                    itemImage += "waiting.png";
                    break;

                    case "Completed":
                    itemImage += "accept.png";
                    break;

                    case "Rejected":
                    itemImage += "reject.png";
                    break;
                }
                console.log("service_name: " + obj[x].serviceName)
                console.log("item image path: " + itemImage);
                items.push(
                    {
                        service_name: obj[x].serviceName,
                        serviceRequestId: obj[x].serviceRequestId,
                        serviceRequestStatus: obj[x].serviceRequestStatus,
                        serviceRequestDate: obj[x].serviceRequestDate,
                        employeeId: obj[x].employeeId,
                        itemImage: itemImage
                    }

                );
                itemImage = "~/images/Booking/status/";
    
            }
            pageData.set("items", items);
        }else{
            if(obj.indexOf("No services") == -1){
                alert({  message: obj, okButtonText: "Close" });  
            }else{
                listview.visibility = "collapse";
                noData.class = "page-placeholder";
            }
            //alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
        }
        loadingBar.visibility = "collapse";
        loadingBar.stop();
    }, function (error) {
        console.log(JSON.stringify(error));
    })

   // loader.hide();
}; 
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.goBack();
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.goBack();
}



exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("tapped Item: " + tappedItem.service_name);
    if(tappedItem.serviceRequestStatus == "Rejected"){
        var topmost = frameModule.topmost();
        console.log("service request id: " + tappedItem.serviceRequestId);
        var navigationOptions = {
            moduleName: "Views/Services/serviceReject/servicereject",
            context: { service_request_id: tappedItem.serviceRequestId}
        }

        topmost.navigate(navigationOptions);
    }
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
