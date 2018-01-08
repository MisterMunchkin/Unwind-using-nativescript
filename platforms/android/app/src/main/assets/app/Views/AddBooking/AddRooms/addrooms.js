var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

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
        check_in_date: pageDataContext.checkin_date,
        check_out_date: pageDataContext.checkout_date,
        numAdult: pageDataContext.adultQty,
        numChild: pageDataContext.childQty
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
        
        console.log("BODY: " + obj);
        if(obj != "no data"){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            console.log("inside if condition");
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
                console.log(obj[x].roomTypeName);
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

exports.itemSelected = function(args){
    console.log("<<<<<<item selected>>>>>>>");
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("Room name: " + tappedItem.roomTypeName);

   // global.roomOrdered = tappedItem;

    console.log("roomTypeID: " + tappedItem.roomTypeID);
    
    console.log("roomTypePrice: " + tappedItem.roomTypePrice);
    console.log("roomTypeDescription: " + tappedItem.roomTypeDescription);//add the price of the room to grand total during check in!


    bookingObject = {
        checkin_date: requestObject.check_in_date,
        checkout_date: requestObject.check_out_date,
        room_type_id: tappedItem.roomTypeID,
        quantity: tappedItem.roomTypeCount
    }
}
exports.submit = function () {
    console.log("checkin: " + requestObject.check_in_date +
        "\n checkout: " + requestObject.check_out_date +
        "\n adult quantity: " + requestObject.numAdult +
        "\n child quantity: " + requestObject.numChild);

    console.log("<<<<<<<<Entering addbooking.php>>>>>>>>>>>");
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/addbooking.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })

}

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

}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
