var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");
var dialogs = require("tns-core-modules/ui/dialogs");

const picker = new ModalPicker();
var checkin_date;
var checkout_date;
var pageDataContext;

var options = {
    title: "Are you sure you want to do this?",
    message: "this will go back to the login page, and clear your progress",
    cancelButtonText: "Cancel",
    okButtonText: "Yes, I'm sure"
};

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object
    console.log("<<<<< add booking page >>>>>>")

    pageDataContext = page.navigationContext;
    if(pageDataContext != undefined){
        page.getViewById("checkinDate").text = pageDataContext.check_in_date;
        page.getViewById("checkoutDate").text = pageDataContext.check_out_date;
    }
};


exports.backEvent = function(){
    console.log("Should have an are you sure? data you input will be lost.");
}
exports.onNavBtnTap = function () {
    // frameModule.topmost().goBack();

    dialogs.confirm(options).then((result) => {
        if (result == true) {
            frameModule.topmost().goBack();
            
        } else {
            console.log(result);
        }
    })
}
exports.nextTap = function(){

    var checkinTextView = page.getViewById("checkinDate");
    var checkoutTextView = page.getViewById("checkoutDate");
    
    if(checkinTextView.text != "" && checkoutTextView.text != ""){
        if (new Date(checkin_date) >= new Date()) {//bug it returns false if check in is same as current date
            if (new Date(checkin_date) < new Date(checkout_date)) {
                //adding security to check if user has existing booking with the same interval

                console.log("Check In Date: " + checkin_date);
                console.log("Check Out Date:" + checkout_date);
                if(pageDataContext != undefined){
                    var navigationOptions = {
                        moduleName: "Views/AddBooking/AddQuantity/addquantity",
                        context: {
                            check_in_date: checkin_date,
                            check_out_date: checkout_date,
                            numAdult: pageDataContext.numAdult,
                            numChild: pageDataContext.numChild
                        }
                    }
                }else{
                    var navigationOptions = {
                        moduleName: "Views/AddBooking/AddQuantity/addquantity",
                        context: {
                            check_in_date: checkin_date,
                            check_out_date: checkout_date
                        }
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

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
