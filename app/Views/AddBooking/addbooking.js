var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");



exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object
};

exports.createBooking = function(){

    var checkIn = page.getViewById("checkin").year + "-" + page.getViewById("checkin").month
        + "-" + page.getViewById("checkin").day;

    var checkOut = page.getViewById("checkout").year + "-" + page.getViewById("checkout").month
        + "-" + page.getViewById("checkout").day;

    console.log(checkIn + " " + checkOut);
    if(new Date(checkIn) >= new Date()){//bug it returns false if check in is same as current date
        if(new Date(checkIn) < new Date(checkOut)){
            console.log("valid dates");

            var requestObject = {checkIn: checkIn, checkOut: checkOut};
            fetchModule.fetch("",{
                method: "POST",
                body: formEncode(requestObject)
            }).then(function(response){

            }, function(error){

            })
        }else{
            console.log("invalid dates");
            alert({ title: "Invalid dates", message: "make sure dates are valid", okButtonText: "Close" });
        }
    }else{
        console.log("living in the past");
        alert({ title: "Invalid check in", message: "check in is in the past", okButtonText: "Close" });
    }

}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
