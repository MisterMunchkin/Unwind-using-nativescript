

var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var serviceContext;
var actionBar;

var loader;

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

var pageData = new Observable();
var items;
var listview;
var loadingBar;
var submitButton;
var cache;

exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< service detail page >>>>>>");
    page.bindingContext = pageData;
    actionBar = page.getViewById("actionBar");
    listview = page.getViewById("listview");
    loadingBar = page.getViewById("loadingBar");
    submitButton = page.getViewById("addToCart");
    
    submitButton.isEnabled = "false";
    submitButton.class = "disabled-btn"

    var pageDataContext = page.navigationContext;
    serviceContext = {
        service_name: pageDataContext.service_name,
        service_type: pageDataContext.service_type,
        service_id: pageDataContext.service_id
    };
    actionBar.title = serviceContext.service_name;
<<<<<<< HEAD

    items = new ObservableArray([]);
    

    var limit = global.roomsCheckedIn.length;
    for(var x = 0;x < limit;x++){
=======

    items = new ObservableArray([]);
    

    var limit = global.roomsCheckedIn.length;

    var itemImage = "~/images/Rooms/";
    for(var x = 0;x < limit;x++){

        switch (global.roomsCheckedIn[x].RoomName){
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
                roomNumber: global.roomsCheckedIn[x].roomNumber,
                roomType: global.roomsCheckedIn[x].RoomName,
<<<<<<< HEAD
                roomID: global.roomsCheckedIn[x].roomId
            }
        )
=======
                roomID: global.roomsCheckedIn[x].roomId,
                itemImage: itemImage
            }
        )

        itemImage = "~/images/Rooms/";
>>>>>>> New-Default-Development
    }
    pageData.set("items", items);
    
}

exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/services");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/services");
}

exports.addToCartTap = function(){
    console.log("selected rooms: " + JSON.stringify(listview.getSelectedItems()));

    var roomArray = listview.getSelectedItems();
    loader = new LoadingIndicator();
    var limit = roomArray.length;

    var date = new Date().toMysqlFormat();

    var requestObject = {roomArray: JSON.stringify(roomArray), service_id: serviceContext.service_id,
                        service_request_date: date, check_in_id: global.loginCred[2]};
    loader.show(options);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/insertServiceRequest.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
        var phpResponse = response._bodyText;
        console.log("rooms that will be serviced: " + phpResponse);
        if(phpResponse.indexOf("error") <= -1){
            alert({ message: "Service request sent!", okButtonText: "Close" });
            loader.hide();
            var topmost = frameModule.topmost();
            topmost.navigate("Views/Services/services");
        }else{
            loader.hide();
            alert({ message: phpResponse , okButtonText: "Close" });
        }
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
    })
    
}
exports.itemSelected = function(){
    var itemArray = listview.getSelectedItems();
    if(itemArray.length >= 1){
        submitButton.isEnabled = "true";
        submitButton.class = "blue-btn";
    }
}
exports.itemDeselected = function(){
    var itemArray = listview.getSelectedItems();

    if(itemArray.length < 1){
        submitButton.isEnabled = "false";
        submitButton.class = "disabled-btn";
    }
}
function twoDigits(d){
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function(){
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}