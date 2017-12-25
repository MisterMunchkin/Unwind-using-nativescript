var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");

const picker = new ModalPicker();
var checkin_date;
var checkout_date;

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object


};


exports.nextTap = function(){
    if (new Date(checkin_date) >= new Date()) {//bug it returns false if check in is same as current date
        if (new Date(checkin_date) < new Date(checkout_date)) {
            var navigationOptions = {
                moduleName: "Views/AddBooking/AddQuantity/addquantity",
                context: {
                    checkin_date: checkin_date,
                    checkout_date: checkout_date
                }
            }

            var topmost = frameModule.topmost();
            topmost.navigate(navigationOptions);
        }else{
            console.log("enter valid dates");
        }
    }else{
        console.log("enter valid dates");
    }
}

exports.checkinTap = function(){
    picker.pickDate({
        title: "Check in Date",
        theme: "light",
        
    }).then((result) => {
        console.log("Date is: " + result.year + "/" + result.month + "/" + result.day);
        checkin_date = result.year + "/" + result.month + "/" + result.day;
        view.getViewById(page, "checkinDate").text = checkin_date;
    }).catch((error) => {
        console.log("Error: " + error);
    })

}

exports.checkoutTap = function(){
    picker.pickDate({
        title: "Check out Date",
        theme: "light",

    }).then((result) => {
        console.log("Date is: " + result.year + "/" + result.month + "/" + result.day);
        checkout_date = result.year + "/" + result.month + "/" + result.day;
        view.getViewById(page, "checkoutDate").text = checkout_date;
    }).catch((error) => {
        console.log("Error: " + error);
    })
}
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
            fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/addbooking.php",{
                method: "POST",
                body: formEncode(requestObject)
            }).then(function(response){
                then(response);
            }, function(error){
                console.log(JSON.stringify(error));
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

function then(response){
    var phpResponse = response._bodyText;

   // alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
    if(phpResponse == "booking added"){
        console.log(JSON.stringify(response));
        var topmost = frameModule.topmost();
        topmost.navigate("tabs/tabs-page");
    }else{
        console.log("fuck");
    }
    
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
