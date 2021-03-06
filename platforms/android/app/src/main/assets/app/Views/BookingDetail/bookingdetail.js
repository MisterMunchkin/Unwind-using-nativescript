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
var roomArray;

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

    console.log("<<<<<<<<<Booking Details>>>>>>>>>>>>>>>");
    var pageDataContext = page.navigationContext;
    requestObject = {
        resDate: pageDataContext.resDate,
        checkinDate: pageDataContext.checkinDate,
        checkoutDate: pageDataContext.checkoutDate,
        resStatus: pageDataContext.resStatus,
        resID: pageDataContext.resID,
        adult_qty: pageDataContext.adult_qty,
        child_qty: pageDataContext.child_qty,
    };

<<<<<<< HEAD
    var resStatusUI = page.getViewById("resStatus");
    var checkinDateUI = page.getViewById("checkinDate");
    var checkoutDateUI = page.getViewById("checkoutDate");

    var MonthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];

    var checkinMonthIndex = new Date(requestObject.checkinDate);
    var checkoutMonthIndex = new Date(requestObject.checkoutDate);

    var newCheckin = MonthNames[checkinMonthIndex.getMonth()] + " " + checkinMonthIndex.getDate() + ", " + checkinMonthIndex.getFullYear();
    var newCheckout = MonthNames[checkoutMonthIndex.getMonth()] + " " + checkoutMonthIndex.getDate() + ", " + checkoutMonthIndex.getFullYear(); 
    
    resStatusUI.text = "Reservation Status: " + requestObject.resStatus;
    checkinDateUI.text = "Check In Date: " + newCheckin;
    checkoutDateUI.text = "Check Out Date: " + newCheckout;

    var roomDataRequest = {reservation_request_id: requestObject.resID};
=======
    var loadingBar = page.getViewById("loadingBar");

    var resStatusUI = page.getViewById("resStatus");
    var checkinDateUI = page.getViewById("checkinDate");
    var checkoutDateUI = page.getViewById("checkoutDate");
    var adult_qtyUI = page.getViewById("adult_qty");
    var child_qtyUI = page.getViewById("child_qty");
    var rejectionMessage = page.getViewById("rejectionMessage");
    var rejectionLabel = page.getViewById("rejectionLabel");

    rejectionMessage.visibility = "collapse";
    rejectionLabel.visibility = "collapse";
    resStatusUI.text = "Reservation Status: " + requestObject.resStatus;
    checkinDateUI.text = "Check In Date: " + requestObject.checkinDate;
    checkoutDateUI.text = "Check Out Date: " + requestObject.checkoutDate;
    adult_qtyUI.text = "Adult quantity: " + requestObject.adult_qty;
    child_qtyUI.text = "Child quantity: " + requestObject.child_qty;

    if (requestObject.resStatus == "Rejected"){

        rejectionMessage.visibility = "visible";
        rejectionLabel.visibility = "visible";

        var rejectObject = {reservation_request_id: requestObject.resID};
        fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/getReservationRejectResponse.php", {
            method: "POST",
            body: formEncode(rejectObject)

        }).then(function (response) {
            console.log("response: " + response._bodyText);
            var obj = JSON.parse(response._bodyText);
            rejectionMessage.text = obj[0].message;
        }, function (error) {
            console.log("ERROR");
            console.log(JSON.stringify(error));

            alert({ message: "please make sure you're connected to the internet and try again", okButtonText: "Okay" });
        })
    }

    var roomDataRequest = {reservation_request_id: requestObject.resID};
    
    loadingBar.start();
    loadingBar.visibility = "visible";

>>>>>>> New-Default-Development
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/getRoomDataFromRequest.php", {
        method: "POST",
        body: formEncode(roomDataRequest)

    }).then(function (response) {
        console.log("response: " + response._bodyText);
        
        roomArray = JSON.parse(response._bodyText);

        var items = [];
        var limit = roomArray.length;
<<<<<<< HEAD

        for(var x = 0;x < limit;x++){

=======
        var carouselArray = [];
        var itemImage = "~/images/Rooms/";

        for(var x = 0;x < limit;x++){

            switch (roomArray[x].name) {
                case "Regular":
                    itemImage += "singlebed.png";
                    break;

                case "Suite":
                    itemImage += "suite.png";
                    break;

                case "Twin Queen Bedroom":
                    itemImage += "twin.png";
                    break;

                case "Amazing":
                    itemImage += "amazing.png";
                    break;

                case "Superior Size King":
                    itemImage += "superiorKing.png";
                    break;

                case "Test":
                    itemImage += "test.png"
                    break;
            }

>>>>>>> New-Default-Development

            items.push(
                {
                    roomNumber: roomArray[x].roomNumber,
                    roomName: roomArray[x].name,
                    price: roomArray[x].price,
<<<<<<< HEAD
                    currency: "PHP"
                }
            )
            var carouselArray = [];

            carouselArray.push(
                {
                    image: roomArray[x].roomTypePicture
                }
            );

            
        }

        var carousel = page.getViewById("carousel"); //NOT WORKING 
=======
                    currency: "PHP",
                    itemImage: itemImage
                }
            )
            

            carouselArray.push(
                {
                    image: itemImage
                }
            );

            itemImage = "~/images/Rooms/";
        }

        

        loadingBar.visibility = "collapse";
        loadingBar.stop();
        var carousel = page.getViewById("carousel"); 
>>>>>>> New-Default-Development
        carousel.items = carouselArray;
        var listview = page.getViewById("listview");
        listview.items = items;
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
<<<<<<< HEAD
        loader.hide();
=======
        //loader.hide();
>>>>>>> New-Default-Development
        alert({message: "please make sure you're connected to the internet and try again", okButtonText: "Okay"});
    })

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
         
            checkoutVisible: "collapse",
            cancelVisible: "collapse",
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
        break;
        case "Checked-out":
        console.log("Checked-out");
        page.bindingContext = {
            cancelText: "Cancel Booking",
            checkoutVisible: "collapse",
            cancelVisible: "collapse",
            checkinVisible: "collapse",
            message: "You have succesfully checked out, hope to see you again soon!"
        }
    }
    
    /*if(requestObject.checkinDate){
        //also need code that checks if booking is 24 hours before the check in date, if within the 24 hours then user cannot cancel booking
    }*/
   // page.getViewById("resDateLabel").text = requestObject.resDate;
};

exports.onNavBtnTap = function(){
    frameModule.topmost().goBack();
}

function twoDigits(d){
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function(){
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}
exports.CarouselChangeEvent = function(args){
    var changeEventText = "Page changed to index: " + args.index;
    console.log(changeEventText);
}
exports.CarouselScrollingEvent = function(args){
   // console.log("Scrolling: " + args.state.offset);
}
/*
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();

}
*/
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

exports.checkoutTap = function(){
    console.log("<<<<<<<<<<<<check out tapped>>>>>>>>>");
    var clientID;
    //loader.show(options);
    var checkoutOnTime = checkOutTime(CurDate, requestObject.checkoutDate);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/PayPal/checkoutSecurity.php", {
           
    }).then(function (response) {
        console.log(JSON.stringify(response));
        clientID = response._bodyText;
        //loader.hide();
        console.log("<<<<<PayPal Initialization>>>>>>");
        PayPal.init({
            clientId: clientID,
            environment: 1
        });
        console.log("total check out: " + global.checkOutGrandTotal);

        var payment = PayPal.newPayment()
                        .setDescription('Grand Check Out')
                        .setAmount(global.checkOutGrandTotal)
                        .setCurrency('PHP');
                        
        payment.start(function(cbResult){
            switch (cbResult.code) {
                case 0:
                    // SUCCESS
                    // pay key is stored in 'cbResult.key'
                    console.log("Success");
                    var checkoutReqObject = {resID: requestObject.resID};
                    fetchModule.fetch("https://unwindv2.000webhostapp.com/checkout/activateCheckout.php", {
                        method: "POST",
                        body: formEncode(checkoutReqObject)

                    }).then(function (response) {
                        
                        console.log("response>>>>>" + JSON.stringify(response));
                        if(response._bodyText == "checkout activated"){
                            var updateCheckoutObj = {check_in_id: global.loginCred[2]};
                            fetchModule.fetch("https://unwindv2.000webhostapp.com/checkout/updateCheckInEnd.php", {
                                method: "POST",
                                body: formEncode(updateCheckoutObj)

                            }).then(function (response) {
                                
                                console.log("response>>>>>" + JSON.stringify(response));

                                if(response._bodyText == "checkInEnd Updated"){
                                    alert({ message: "successfully checked out!", okButtonText: "Okay"});
                                    global.checkinSec = 1;
                                    var topmost = frameModule.topmost();
                                    topmost.navigate("tabs/tabs-page");
                                }
                            }, function (error) {
                                console.log("ERROR");
                                console.log(JSON.stringify(error));
                                loader.hide();
                                alert({message: "please make sure you're connected to the internet and try again", okButtonText: "Okay"});
                            })
                    console.log("Success");
                        }
                    }, function (error) {
                        console.log("ERROR");
                        console.log(JSON.stringify(error));
                        loader.hide();
                        alert({message: "please make sure you're connected to the internet and try again", okButtonText: "Okay"});
                    })
                    
                    break;
                    
                case 1:
                    // operation was CANCELLED
                    console.log("Cancelled");
                    break;
                    
                case -1:
                    // checkout FAILED
                    alert({ title: "PayPal", message: "Request Failed", okButtonText: "Close" });
                    console.log("Failed");
                    break;
                    
                case -2:
                    // "unhandled exception"
                    alert({ title: "PayPal", message: "Request Failed", okButtonText: "Close" });
                    console.log("Unhandled Exception");
                    break;
            }
        });

        PayPal.addLogger(function(msg) {
            console.log('[nativescript-paypal]: ' + msg);
        });
        
    }, function (error) {
        console.log(JSON.stringify(error));
    })
    
   
}



exports.checkinButton = function(){
    console.log("check in button clicked");//add pricing of room to the grandtotal check out in global

    
    console.log("Current Date: " + CurDate + " Checkin Date: " + requestObject.checkinDate);
    
<<<<<<< HEAD
    if(requestObject.checkinDate <= CurDate){
=======
    if(Date(requestObject.checkinDate) <= Date(CurDate)){
>>>>>>> New-Default-Development
        console.log("userID: " + global.loginCred[0]);
        console.log("checkin is Active: " + global.loginCred[1]);
        console.log("checkin ID: " + global.loginCred[2]);
        if(global.loginCred[2] == undefined){
            var dateTime = new Date().toMysqlFormat();

            var Obj = {resID: requestObject.resID, check_in_start: dateTime};

            console.log("dateTime: " + Obj.check_in_start);
            console.log("resID: " + Obj.resID);

            loader.show(options);
            fetchModule.fetch("https://unwindv2.000webhostapp.com/checkin/activateCheckin.php", {
                method: "POST",
                body: formEncode(Obj)
            }).then(function (response) {
                //then(response);
               // console.log(JSON.stringify(response));
                phpResponse = response._bodyText;
                if(phpResponse.indexOf("error") <= -1){
                    console.log("checkIn ID: " + phpResponse);
                    global.loginCred[2] = phpResponse;
                    
                    var getRoomsObj = {check_in_id: global.loginCred[2]};
                    fetchModule.fetch("https://unwindv2.000webhostapp.com/checkin/getRoomsPerCheckIn.php", {
                        method: "POST",
                        body: formEncode(getRoomsObj)
                    }).then(function (response) {
                        var phpResponse = response._bodyText;
                        console.log("response: " + phpResponse);
                        if(phpResponse.indexOf("error") > -1){
                            loader.hide();
                            alert({ title: "activation error", message: phpResponse, okButtonText: "Close" });
                        }else{
                            phpResponse = JSON.parse(phpResponse);
                            global.loginCred = phpResponse;
                            global.checkOutGrandTotal += global.loginCred[4];
                            loader.hide();
                            console.log("grand total is now at: " + global.checkOutGrandTotal);
                            alert({ title: "Check in Activated!", message: "Check in module is now unlocked!", okButtonText: "Close" });
<<<<<<< HEAD
                            global.checkinSec = 2
=======
                            global.checkinSec = 1;
>>>>>>> New-Default-Development
                            var topmost = frameModule.topmost();
                            topmost.navigate("tabs/tabs-page");
                        }

                    }, function (error) {
                        console.log(JSON.stringify(error));
                    })
                }else{
                    alert({ title: "activation error", message: "please try again :(", okButtonText: "Close" });
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            })
            /* alert({ title: "Check in Activated!", message: "Check in module is now unlocked!", okButtonText: "Close" });
                    var topmost = frameModule.topmost();
                    topmost.navigate("tabs/tabs-page"); <<<still fixing back end>>>*/
        }else{
            console.log("cannot check in if you are still currently checked in");
        }
    }else {
        alert({ message: "You are not at your check in date yet, patience is key, young padawan", okButtonText: "Close" });
    }
    
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

