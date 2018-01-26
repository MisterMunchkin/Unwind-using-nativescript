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
    console.log("<<<<< add booking page >>>>>>")

};

/*exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("tabs/tabs-page");//find a way to navigate to a specific tab
}*/
exports.backEvent = function(){
    console.log("Should have an are you sure? data you input will be lost.");
}

exports.nextTap = function(){

    var checkinTextView = page.getViewById("checkinDate");
    var checkoutTextView = page.getViewById("checkoutDate");
    
    if(checkinTextView.text != "" && checkoutTextView.text != ""){
        if (new Date(checkin_date) >= new Date()) {//bug it returns false if check in is same as current date
            if (new Date(checkin_date) < new Date(checkout_date)) {
                //adding security to check if user has existing booking with the same interval

                
                var navigationOptions = {
                    moduleName: "Views/AddBooking/AddQuantity/addquantity",
                    context: {
                        check_in_date: checkin_date,
                        check_out_date: checkout_date
                    }
                }

                var topmost = frameModule.topmost();
                topmost.navigate(navigationOptions);
            }else{
                console.log("enter valid dates");
                alert({ message: "please enter valid dates", okButtonText: "Close" });
            }
        }else{
            console.log("enter valid dates");
            alert({ message: "Sorry but walk in guest are handled by the receptionist", okButtonText: "Okay" });
        }
    }else{
        checkoutTextView.class = checkinTextView.class = "requiredFields";
    }
}

exports.checkinTap = function(){
    picker.pickDate({
        title: "Check in Date",
        theme: "light",
        
    }).then((result) => {
        console.log("Date is: " + result.year + "-" + result.month + "-" + result.day);
        
        var formattedMonth;
        var formattedDay;

        (parseInt(result.month) < 10)? formattedMonth = "0" + result.month: formattedMonth = result.month;
        (parseInt(result.day) < 10)? formattedDay = "0" + result.day: formattedDay = result.day;
        checkin_date = result.year + "-" + formattedMonth + "-" + formattedDay;
        console.log("checkin_date: " + checkin_date);
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
        console.log("Date is: " + result.year + "-" + result.month + "-" + result.day);
        (parseInt(result.month) < 10)? formattedMonth = "0" + result.month: formattedMonth = result.month;
        (parseInt(result.day) < 10)? formattedDay = "0" + result.day: formattedDay = result.day;
        checkout_date = result.year + "-" + formattedMonth + "-" + formattedDay;
        view.getViewById(page, "checkoutDate").text = checkout_date;
    }).catch((error) => {
        console.log("Error: " + error);
    })
}
/*
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
    
}*/
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
