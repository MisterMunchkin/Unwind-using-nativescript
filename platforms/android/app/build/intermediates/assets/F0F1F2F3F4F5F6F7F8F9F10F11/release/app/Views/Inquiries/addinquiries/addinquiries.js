var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var TNSFancyAlert = require("nativescript-fancyalert").TNSFancyAlert;
var TNSFancyAlertButton = require("nativescript-fancyalert").TNSFancyAlertButton;

var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;



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
var loader;


exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< add inquiries >>>>>>")
    

}

exports.submit = function () {
    console.log("submit pressed");
    var loader = new LoadingIndicator();

    var textInquiry = page.getViewById("textInquiry");

    var requestObject = {message: textInquiry.text};

    loader.show(options);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/inquiries/insertInquiry.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        var phpResponse = response._bodyText;
        console.log("add inquiry response: " + phpResponse);

        loader.hide();

        TNSFancyAlert.showSuccess("Inquiry sent!","", "Okay");
        var topmost = frameModule.topmost();
        topmost.navigate("Views/Inquiries/inquiries");

    }, function (error) {
        console.log(JSON.stringify(error));
        loader.hide();
        alert("Something went wrong", JSON.stringify(error) ,"Okay");
    })
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

exports.onNavBtnTap = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Inquiries/inquiries");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Inquiries/inquiries");
}
