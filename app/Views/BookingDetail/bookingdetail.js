// The MIT License (MIT)
// 
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
var Observable = require("data/observable").Observable;
var PayPal = require("nativescript-paypal");

var pageDataContext;
var requestObject;
var loader = new LoadingIndicator();
var CurDate;


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

    CurDate = convertDateNow();
    var cancelBookingButton = page.getViewById("cancelBookingID");
    var checkinButton = page.getViewById("checkinButtonID");
    //var dateNow = new Date();
    //var cancelcheckinValidation = dateNow.valueOf() - requestObject.checkinDate.valueOf();/

    switch(requestObject.resStatus){
        case "Accepted": 
        console.log("Accepted");
        page.bindingContext = {
            cancelText: "Cancel Booking",
            checkoutVisible: "collapse",
            cancelVisible: "collapse",
            checkinVisible: "collapse",
            message: "please proceed to the reservation tab to check in on the day"
        }
        break;
        case "Pending": 
        console.log("Pending");
        page.bindingContext = {
            cancelText: "Cancel Booking",
            checkoutVisible: "collapse",
            cancelVisible: "visible",
            checkinVisible: "collapse",
            message: "you have created a request! please wait for admin to manage your requests!"
        }
        break;
        case "Cancelled": 
        console.log("Cancelled");
        page.bindingContext = {
            cancelText: "Uncancel Booking",
            checkoutVisible: "collapse",
            cancelVisible: "visible",
            checkinVisible: "collapse",
            message: "you have cancelled your reservations"
        }
        break;
        case "Checked-in": 
        console.log("Checked In");
        page.bindingContext = {
            cancelText: "Uncancel Booking",
            checkoutVisible: "visible",
            cancelVisible: "collapse",
            checkinVisible: "collapse",
            message: "you have checked in! enjoy your stay!"
        }
        break;
        case "Rejected":
        console.log("Rejected");
        page.bindingContext = {
            cancelText: "Cancel Booking",
            checkoutVisible: "collapse",
            cancelVisible: "collapse",
            checkinVisible: "collapse",
            message: "your request has been rejected, please contact our concierge"
        }
        break;
        case "Waiting":
        console.log("Waiting");
        page.bindingContext = {
            cancelText: "Cancel Booking",
            checkoutVisible: "collapse",
            cancelVisible: "visible",
            checkinVisible: "visible",
            message: "you've made it! now you just have to wait\n for your check in date to check in the hotel!"
        }
    }
    /*if(requestObject.checkinDate){
        //also need code that checks if booking is 24 hours before the check in date, if within the 24 hours then user cannot cancel booking
    }*/
    page.getViewById("resDateLabel").text = requestObject.resDate;
};

exports.checkoutTap = function(){
    console.log("<<<<<<<<<<<<check out tapped>>>>>>>>>");
    var vm = new Observable();

    vm.init = function(){
        PayPal.addLogger(function(msg){
            console.log('[nativescript-paypal] ' + msg);
        });

        //init paypal
        PayPal.init({
            clientId: '1',
            environment: 0
        });
    }

    vm.startPayPalCheckout = function(){
        var payment = PayPal.newPayment()
                .setDescription("check out of hotel")
                .setAmount(global.checkOutGrandTotal)
                .setCurrency('PHP');

        payment.start(function(result){
            var logPrefix = '[payment result] ';
            console.log(logPrefix + 'code: ' + result.code);

            switch(result.code){
                case 0:
                    console.log(logPrefix + 'Success: ' + result.key);
                    break;
                case 1: 
                    console.log(logPrefix + 'Operation was cancelled.');
                    break;
                case -1:
                    console.log(logPrefix + 'Checkout failed!');
                    break;
                case -2:
                    console.log(logPrefix + 'Unhandled exception!');
                    break;

                default:
                    console.log(logPrefix + 'UNKNOWN: ' + result.code);
                    break;
            }
        })
    }
}
exports.checkinButton = function(){
    console.log("check in button clicked");

    
    console.log("Current Date: " + CurDate + "Checkin Date: " + requestObject.checkinDate);
    
    if(requestObject.checkinDate == CurDate){
        var Obj = {resID: requestObject.resID};
        fetchModule.fetch("https://unwindv2.000webhostapp.com/checkin/activateCheckin.php", {
            method: "POST",
            body: formEncode(Obj)
        }).then(function (response) {
            //then(response);
            console.log(JSON.stringify(response));
            if(response._bodyText == "checkin activated"){
                

                alert({ title: "Check in Activated!", message: "Check in module is now unlocked!", okButtonText: "Close" });
                var topmost = frameModule.topmost();
                topmost.navigate("tabs/tabs-page");
            }else{
                alert({ title: "activation error", message: "please try again :(", okButtonText: "Close" });
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        })
    }else if(requestObject.checkinDate < CurDate){
        console.log("the user is late");  
    }else{
        alert({ title: "Premature ejaculation", message: "You are not at your check in date yet", okButtonText: "Close" });
    }
    
}

exports.checkoutButton = function(){
    //payments and database updates that guest has checked out
    //check out security    
        
    checkOutTime(CurDate, requestObject.checkoutDate);
}

function checkOutTime(CurDate, checkoutDate){
    var ret;

    if(CurDate == checkoutDate){
        ret = 0; //checkout on time
        console.log("check out on time");
    }else if(CurDate > checkoutDate){
        ret = 1; //chekout late
        console.log("check out late");
    }else{
        ret = 2 //checkout early
        console.log("check out early");//ask neil how check in functionality should work
    }
    return ret;
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

function convertDateNow() {
    /*var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);*/
    var d = new Date().toISOString().slice(0,10);

    return d;
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
   
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

