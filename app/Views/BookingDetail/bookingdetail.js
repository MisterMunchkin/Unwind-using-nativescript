var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var pageDataContext;
var requestObject;

exports.onloaded = function (args) {
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
        cancelBookingButton.text = "Uncancel Booking";
        checkinButton.isEnabled = "false";
        //cancelBookingButton.tap = "uncancelButton";
        cancelBookingButton.set("tap", "uncancelButton")
    }else{
        cancelBookingButton.text = "Cancel Booking";
        checkinButton.isEnabled = "true";
        //cancelBookingButton.tap = "cancelButton";
        cancelBookingButton.set("tap", "cancelButton");
    }

  
    /*if(requestObject.checkinDate){
        //also need code that checks if booking is 24 hours before the check in date, if within the 24 hours then user cannot cancel booking
    }*/
    
    page.getViewById("resDateLabel").text = pageDataContext.resDate;
};

exports.uncancelButton = function(args){
    console.log("uncancel button pressed...");
}
exports.cancelButton = function(args){
  
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
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

