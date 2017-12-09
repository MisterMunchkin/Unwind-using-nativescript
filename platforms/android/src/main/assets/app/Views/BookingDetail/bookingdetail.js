var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var pageDataContext;
var requestObject;
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

exports.onloaded = function(args) {
    page = args.object

    var pageDataContext = page.navigationContext;
    requestObject = {
        resDate: pageDataContext.resDate,
        checkinDate: pageDataContext.checkinDate,
        checkoutDate: pageDataContext.checkoutDate,
        resStatus: pageDataContext.resStatus,
        resID: pageDataContext.resID
    };

    var cancelBookingButton = page.getViewById("cancelBookingID");
    var checkinButton = page.getViewById("checkinButtonID");
    //var dateNow = new Date();
    //var cancelcheckinValidation = dateNow.valueOf() - requestObject.checkinDate.valueOf();

    //console.log(cancelcheckinValidation);
    if(requestObject.resStatus == "Cancelled"){
        console.log("Booking is currently cancelled");
        page.bindingContext = {
            cancelText: "Uncancel Booking",
            checkinisEnabled: "false"
           // cancelUncancelTap: uncancelBooking()
        }
    }else{
        console.log("Booking is currently not cancelled");
        page.bindingContext = {
            cancelText: "Cancel Booking",
            checkinisEnabled: "true"
            //cancelUncancelTap: cancelBooking()
        }
    }
    /*if(requestObject.checkinDate){
        //also need code that checks if booking is 24 hours before the check in date, if within the 24 hours then user cannot cancel booking
    }*/
    page.getViewById("resDateLabel").text = requestObject.resDate;
};

exports.checkinButton = function(){
    console.log("check in button clicked");
    
}
exports.cancelUncancelTap = function(){
    loader.show(options);
    if(requestObject.resStatus == "Cancelled"){
        uncancelBooking();
    }else{
        cancelBooking();
    }//add conditions for rejected, and accepted
}

function uncancelBooking(){
    console.log("uncancel button pressed...");

    console.log(requestObject.resDate);
    console.log(requestObject.checkinDate);
    console.log(requestObject.checkoutDate);
    console.log(requestObject.resStatus);
    console.log(requestObject.resID);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/uncancelbooking.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}


function cancelBooking(){
    console.log("cancel button pressed...");

    console.log(requestObject.resDate);
    console.log(requestObject.checkinDate);
    console.log(requestObject.checkoutDate);
    console.log(requestObject.resStatus);
    console.log(requestObject.resID);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/cancelbooking.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}

function then(response){
    console.log(JSON.stringify(response));
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
    loader.hide();
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

