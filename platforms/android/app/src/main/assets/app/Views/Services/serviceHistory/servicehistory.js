var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;


var items = new ObservableArray([]);
var pageData = new Observable();


var loadingBar;
<<<<<<< HEAD

=======
var noData;
var listview;
>>>>>>> New-Default-Development
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
<<<<<<< HEAD

    
=======
    noData = page.getViewById("noData");
    listview = page.getViewById("listview");
>>>>>>> New-Default-Development
    //loader = new LoadingIndicator();
    //loader.show(options);

    console.log("new data fishing...");
    loadingBar.start();
    loadingBar.visibility = "visible";
<<<<<<< HEAD
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/loadServiceData.php", {
        
    }).then(function (response) {
        obj = response._bodyText;
    

        if(obj != "no data" && obj != "query error"){
=======
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
>>>>>>> New-Default-Development

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
        
            for(var x = 0; x < limit;x++){
<<<<<<< HEAD
                items.push(
                    {
                        service_name: obj[x].service_name,
                        service_type: obj[x].service_type,
                        service_id: obj[x].service_id
=======

                console.log("service_name: " + obj[x].serviceName)
                items.push(
                    {
                        service_name: obj[x].serviceName,
                        serviceRequestId: obj[x].serviceRequestId,
                        serviceRequestStatus: obj[x].serviceRequestStatus,
                        serviceRequestDate: obj[x].serviceRequestDate,
                        employeeId: obj[x].employeeId
>>>>>>> New-Default-Development
                    }

                );
    
            }
            pageData.set("items", items);
        }else{
<<<<<<< HEAD
            alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
=======
            if(obj.indexOf("No services") == -1){
                alert({  message: obj, okButtonText: "Close" });  
            }else{
                listview.visibility = "collapse";
                noData.class = "page-placeholder";
            }
            //alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
>>>>>>> New-Default-Development
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
