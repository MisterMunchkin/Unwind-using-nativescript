var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var dialogs = require("ui/dialogs");

var pageDataContext;
var requestObject;
var bookingObject;

var items;
var pageData = new Observable();

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    console.log("<<<<<add room page >>>>>>");
    page = args.object;

    pageDataContext = page.navigationContext;
    

    requestObject = {
        check_in_date: pageDataContext.check_in_date,
        check_out_date: pageDataContext.check_out_date,
        numAdult: pageDataContext.numAdult,
        numChild: pageDataContext.numChild
    };
   
    console.log("check in date: " + requestObject.check_in_date);
    console.log("check out date: " + requestObject.check_out_date);
    console.log("numAdult: " + requestObject.numAdult);
    console.log("numChild: " + requestObject.numChild);
    page.bindingContext = pageData;

    var obj;
    items = new ObservableArray([]);
    console.log("entering room query");
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/getCountFilterRoomType.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        obj = response._bodyText;
        
       // console.log("BODY: " + obj);
        if(obj != "no data"){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
           // console.log("inside if condition");
            var limit = obj.length;
           
            for(var x = 0; x < limit;x++){
                items.push(
                    {
                        roomTypeID: obj[x].roomTypeID,
                        roomTypeName: obj[x].roomTypeName,
                        roomTypePrice: obj[x].roomTypePrice,
                        roomTypeDescription: obj[x].roomTypeDescription,
                        roomTypeCount: obj[x].roomTypeCount,
                        itemImage: ""
                    }

                );
               // console.log(obj[x].roomTypeName);
            }
            pageData.set("items", items);
        }else{
            console.log("put viSible no data confirmation here");
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    })
    console.log("exiting room query");
};

exports.itemSelected = function(args){// turn quantity into an input
    console.log("<<<<<<item selected>>>>>>>");
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;
   
    var navigationOptions = {
        moduleName: "Views/AddBooking/AddRooms/AddRoomDetails/addroomdetails",
        context: {
            roomTypeID: tappedItem.roomTypeID,
            roomTypeName: tappedItem.roomTypeName,
            roomTypePrice: tappedItem.roomTypePrice,
            roomTypeDescription: tappedItem.roomTypeDescription,
            roomTypeCount: tappedItem.roomTypeCount,
            itemImage: "",
            bookingDetails: requestObject
        }
    }
    console.log("Tapped item: " + JSON.stringify(tappedItem));
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
   /* var quantity;

    dialogs.prompt({
        title: "Room Quantity",
        message: "add room quantity",
        okButtonText: "Submit",
        cancelButtonText: "Cancel",
        inputType: dialogs.inputType.text
    }).then(function(r){
        console.log("Dialog result: " + r.result + ", quantity: " + r.text);
        quantity = r.text;

        if(/^\d*$/.test(quantity)){//integer regex
            console.log("is number")
            console.log("Before parsing quantity: " + quantity);
            quantity = parseInt(quantity);//something wrong here
            //console.log("After parsing quantity: " + quantity);
            limit = parseInt(tappedItem.roomTypeCount);
            console.log("quantity after parseInt: " + quantity);
            console.log("limit: " + limit);
            if(quantity <= limit){
                console.log("valid input");
                bookingObject = {
                    checkin_date: requestObject.check_in_date,
                    checkout_date: requestObject.check_out_date,
                    room_type_id: tappedItem.roomTypeID,
                    quantity: quantity
                }
                
            }else{
                console.log("invalid input");
            }
        }else{
            console.log("not number");
        }
    });

    //console.log("roomTypeDescription: " + tappedItem.roomTypeDescription);//add the price of the room to grand total during check in!

    console.log("checkin_date: " + bookingObject.checkin_date);
    console.log("checkout_date: " + bookingObject.checkout_date);
    console.log("room_type_id: " + bookingObject.room_type_id);
    console.log("quantity: " + bookingObject.quantity);*/
}
exports.submit = function () {
    console.log("checkin: " + requestObject.check_in_date +
        "\n checkout: " + requestObject.check_out_date +
        "\n adult quantity: " + requestObject.numAdult +
        "\n child quantity: " + requestObject.numChild);

    bookingObject = {
        check_in_date: requestObject.check_in_date,
        check_out_date: requestObject.check_out_date,
        room_type_id: global.roomOrdered[0].roomTypeID,
        quantity: global.roomOrdered[0].quantity
    }

    if(global.roomOrdered[0].roomTypeID != undefined){
        console.log("<<<<<<<<Entering addbooking.php>>>>>>>>>>>");
        
        console.log("Booking Object...");
        console.log("       checkin_date: " + bookingObject.check_in_date);
        console.log("       checkout_date: " + bookingObject.check_out_date);
        console.log("       room_type_id: " + bookingObject.room_type_id);
        console.log("       quantity: " + bookingObject.quantity);

        console.log("Request Object...");
        console.log("       checkin_date: " + requestObject.check_in_date);
        console.log("       checkout_date: " + requestObject.check_out_date);
        console.log("       numAdult: " + requestObject.numAdult);
        console.log("       numChild: " + requestObject.numChild);

        fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/addbooking.php", {
            method: "POST",
            body: formEncode(requestObject)
        }).then(function (response) {
            var phpResponse = response._bodyText;

            // alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
            if (phpResponse.indexOf("error") <= -1) {
                var reservation_request_id = phpResponse;
                console.log("<<<<<<<<Entering getAvailableRoomsByType>>>>>>>>>>>>");
                fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/getAvailableRoomsByType.php", {
                    method: "POST",
                    body: formEncode(bookingObject)
                }).then(function (response) {
                    console.log("response: " + JSON.stringify(response));
                    
                    var AvailRoomResult = JSON.parse(response._bodyText);
                    var count = 0, x, limit = AvailRoomResult.length;
                    console.log("limit: " + limit);

                    for(x = 0;x < limit;x++){
                       
                        var insRoomObject = {
                            reservationRequestId: reservation_request_id,
                            roomId: AvailRoomResult[x].roomID
                        }
                        console.log("insRoomObject...");
                        console.log("   Room Ids: " + insRoomObject.roomId);
                        console.log("   reservation_request_id: " + insRoomObject.reservationRequestId);

                        console.log("<<<<<Entering insertRoomReserved>>>>>>>>>>");
                        fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/insertRoomReserved.php", {
                            method: "POST",
                            body: formEncode(insRoomObject)
                        }).then(function (response) {
                            
                            console.log("ECHO :: " + response._bodyText);
                            if(response._bodyText == "Room reserved"){
                                count++;
                                console.log("in");
                            }else{
                                console.log("failed: " + JSON.stringify(response));
                            }
                        }, function (error) {
                            console.log(JSON.stringify(error));
                        })
                    }
                    console.log("count = " + count);
                    console.log("x = " + x);
                    if(count == x){
                        alert({ title: "Success!", message: phpResponse, okButtonText: "Close" });
                        var topmost = frameModule.topmost();
                        topmost.navigate("tabs/tabs-page");
                    }
                }, function (error) {
                    console.log(JSON.stringify(error));
                })
        
                //console.log(JSON.stringify(response));
            } else {
                alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
                console.log(phpResponse);
            }
        
        }, function (error) {
            console.log(JSON.stringify(error));
        })
    }else{
        console.log("please select a room");
    }

}
/*
function then(response) {
    var phpResponse = response._bodyText;

    // alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
    if (phpResponse.indexOf("error") <= -1) {
        var reservation_request_id = phpResponse;
        console.log("<<<<<<<<Entering getAvailableRoomsByType>>>>>>>>>>>>");
        fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/getAvailableRoomsByType.php", {
            method: "POST",
            body: formEncode(bookingObject)
        }).then(function (response) {
            console.log("response: " + JSON.stringify(response));

            var AvailRoomResult = JSON.parse(response._bodyText);
            var count = 0, x, limit = AvailRoomResult.length;
            console.log("limit: " + limit);
            for(x = 0;x < limit;x++){
                console.log("Room Ids: " + AvailRoomResult[x].roomID);
                console.log("reservation_request_id: " + reservation_request_id);
                var insRoomObject = {
                    reservationRequestId: reservation_request_id,
                    roomId: AvailRoomResult[x].RoomID
                }
                console.log("<<<<<Entering insertRoomReserved>>>>>>>>>>");
                fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/insertRoomReserved.php", {
                    method: "POST",
                    body: formEncode(insRoomObject)
                }).then(function (response) {
                    
                    if(response._bodyText == "Room reserved"){
                        count++;
                    }else{
                        console.log("failed: " + JSON.stringify(response));
                    }
                }, function (error) {
                    console.log(JSON.stringify(error));
                })
            }
            if(count == x){
                alert({ title: "Success!", message: phpResponse, okButtonText: "Close" });
                var topmost = frameModule.topmost();
                topmost.navigate("tabs/tabs-page");
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        })

        //console.log(JSON.stringify(response));
    } else {
        alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
        console.log(phpResponse);
    }

}*/

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
