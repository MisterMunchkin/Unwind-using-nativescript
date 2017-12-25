var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");

var pageDataContext;

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;

    pageDataContext = page.navigationContext;

};

exports.submit = function () {

    var requestObject = { checkIn: pageDataContext.checkin_date, 
                            checkOut: pageDataContext.checkout_date,
                                adultQty: pageDataContext.adultQty,
                                    childQty: pageDataContext.childQty};
    console.log("checkin: " + requestObject.checkIn +
        "\n checkout: " + requestObject.checkOut +
        "\n adult quantity: " + requestObject.adultQty +
        "\n child quantity: " + requestObject.childQty);


    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/addbooking.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })

}

function then(phpResponse) {
   // var phpResponse = response._bodyText;

    // alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
    if (phpResponse == "booking added") {
        //console.log(JSON.stringify(response));
        var topmost = frameModule.topmost();
        topmost.navigate("tabs/tabs-page");
    } else {
        console.log(phpResponse);
    }

}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
