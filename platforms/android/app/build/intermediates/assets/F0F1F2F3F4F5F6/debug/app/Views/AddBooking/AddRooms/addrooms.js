var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var pageDataContext;
var requestObject;

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
    var bookingObject = {
        checkIn: requestObject.check_in_date,
        checkOut: requestObject.check_out_date,
        adultQty: requestObject.numAdult,
        childQty: requestObject.numChild

    }
}
exports.submit = function () {
    console.log("checkin: " + requestObject.check_in_date +
        "\n checkout: " + requestObject.check_out_date +
        "\n adult quantity: " + requestObject.numAdult +
        "\n child quantity: " + requestObject.numChild);


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
    if (phpResponse == "booking added") {
        //console.log(JSON.stringify(response));
        alert({ title: "Success!", message: phpResponse, okButtonText: "Close" });
        var topmost = frameModule.topmost();
        topmost.navigate("tabs/tabs-page");
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
