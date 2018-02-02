var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;


var items = new ObservableArray([]);
var pageData = new Observable();


var loadingBar;

var listview;

var pageDataContext;
var rejectMessage;

exports.onloaded = function (args) {
    page = args.object
    console.log("<<<<<<service page>>>>>>")
    page.bindingContext = pageData;

    var obj;
    loadingBar = page.getViewById("loadingBar");
    rejectMessage = page.getViewById("rejectMessage");
    
    //listview = page.getViewById("listview");
    //loader = new LoadingIndicator();
    //loader.show(options);

    pageDataContext = page.navigationContext;

    console.log("new data fishing...");
    loadingBar.start();
    loadingBar.visibility = "visible";
    console.log("service request id: " + pageDataContext.service_request_id);
    var requestObject = { service_request_id: pageDataContext.service_request_id };

    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getServiceRejectResponse.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        obj = response._bodyText;

        console.log("finished fishing");
        console.log("OBJECT: " + obj);
        if (obj.indexOf("error") == -1) {
            obj = JSON.parse(obj);
            console.log("message: " + obj[0].message);

            rejectMessage.text = obj[0].message;
            //alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
        }else{
            alert({message: "Fatal error: " + obj, okButtonText: "Okay"});
        }
        loadingBar.visibility = "collapse";
        loadingBar.stop();
    }, function (error) {
        console.log(JSON.stringify(error));
    })

    // loader.hide();
};
exports.onNavBtnTap = function () {
    var topmost = frameModule.topmost();
    topmost.goBack();
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.goBack();
}



/*exports.itemTap = function (args) {
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("tapped Item: " + tappedItem.service_name);

}*/
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
