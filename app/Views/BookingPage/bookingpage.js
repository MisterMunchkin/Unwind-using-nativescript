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
        //code for disabling check in button and changing cancel button to an uncancel button
        //page.getViewById("cancelBookingID").text = "Uncancel Booking"
       // page.getViewById("cancelBookingID").tap = "uncancelButton";
        
        cancelBookingButton.text = "Uncancel Booking";
        checkinButton.isEnabled = "false";
    }else{
        //page.getViewById("cancelBookingID").text = "Cancel Booking";
       // page.getViewById("cancenBookingID").tap = "cancelButton";

        cancelBookingButton.text = "Cancel Booking";
        checkinButton.isEnabled = "true";
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
   // var pageDataContext = page.navigationContext;

    /*var requestObject = {resDate: pageDataContext.resDate,
                         checkinDate: pageDataContext.checkinDate,
                         checkoutDate: pageDataContext.checkoutDate,
                         resStatus: pageDataContext.resStatus,
                         resID: pageDataContext.resID};*/
    
    console.log(pageDataContext.resDate);
    console.log(pageDataContext.checkinDate);
    console.log(pageDataContext.checkoutDate);
    console.log(pageDataContext.resStatus);
    console.log(pageDataContext.resID);

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

