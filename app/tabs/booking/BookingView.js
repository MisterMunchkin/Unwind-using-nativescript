const BrowseViewModel = require("./booking-view-model");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
var view = require("ui/core/view");

var items;
var pageData = new Observable();
var component;

var phpContext;
var requestLabel;
var reservationLabel;

var loader;

var cancelable = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
};

var uncancelable = {
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

exports.onLoaded = function(args) {
    component = args.object;
    component.bindingContext = new BrowseViewModel();

    component.bindingContext = pageData;
    loader = new LoadingIndicator();

    requestLabel = view.getViewById(component, "reqNavLabel");
    reservationLabel = view.getViewById(component, "resNavLabel");

    //requestLabel.className = "ActiveNav";
   // reservationLabel.className ="inActiveNav";

    loader.show(uncancelable);
    loadData("loadRequestData.php");
    loader.hide();
    
}


exports.requestNav = function (args) {
    console.log("request nav clicked");
    loader = new LoadingIndicator();

    loader.show(cancelable);
    loadData("loadRequestData.php");
    loader.hide();
}
exports.reservationNav = function (args) {
    console.log("reservation nav clicked");
    loader = new LoadingIndicator();

    loader.show(cancelable)
    loadData("loadReservationData.php");
    loader.hide();
}

function loadData(phpContext){
    var obj;
    items = new ObservableArray([]);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/" + phpContext, {

    }).then(function (response) {
        obj = response._bodyText;
        console.log(obj);
        
        if(obj != "no data"){
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;

            console.log("num of items: " + limit);
            for (var x = 0; x < limit; x++) {

                items.push(
                    {
                        reservationDate: "Reservation Date:" + obj[x].reservationDate,
                        checkinDate: "check in Date:" + obj[x].checkinDate,
                        checkoutDate: "check out Date:" + obj[x].checkoutDate,
                        reservationStatus: "status:" + obj[x].reservationStatus,
                        itemImage: "",
                        reservationID: "Reservation ID:" + obj[x].reservationRequestID,
                        adult_qty: "adult qty." + obj[x].adult_qty,
                        child_qty: "child qty." + obj[x].child_qty

                    }

                );

            }
        }else{
            //label no data
        }
        pageData.set("items", items);

    }, function (error) {
        console.log(JSON.stringify(error));
    })
}

exports.onItemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;
    
    var resDate = tappedItem.reservationDate.substring(tappedItem.reservationDate.indexOf(":") + 1);
    var checkinDate = tappedItem.checkinDate.split(":")[1];
    var checkoutDate = tappedItem.checkoutDate.split(":")[1];
    var resStatus = tappedItem.reservationStatus.split(":")[1];
    var resID = tappedItem.reservationID.split(":")[1];

    var navigationOptions = {
        moduleName: "Views/BookingDetail/bookingdetail",
        context: {resDate: resDate,
                  checkinDate: checkinDate,
                  checkoutDate: checkoutDate,
                  resStatus: resStatus,
                  resID: resID}
    }
    console.log(resDate);
    console.log(checkinDate);
    console.log(checkoutDate);
    console.log(resStatus);
    console.log(resID);
   

    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);

    //console.log("tapped: " + tappedItem.reservationDate);
}


exports.fabTap = function(){
    console.log("shit");
    var topmost = frameModule.topmost();
    topmost.navigate("Views/AddBooking/addbooking");
}

exports.pullToRefreshInit = function(){
    //find a way to overwrite listview data and refresh page with new data 
    var obj;
    items = new ObservableArray([]);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/loadBookingData.php", {

    }).then(function (response) {
        obj = response._bodyText;
        obj = JSON.parse(obj);
        //console.log("inside then function: " + obj);
        var limit = obj.length;

        for(var x = 0; x < limit;x++){
            items.push(
                {
                    reservationDate: "Reservation Date:" + obj[x].reservationDate,
                    checkinDate: "check in Date:" + obj[x].checkinDate,
                    checkoutDate: "check out Date:" + obj[x].checkoutDate,
                    reservationStatus: "status:" + obj[x].reservationStatus,
                    itemImage: "",
                    reservationID: "Reservation ID:" + obj[x].reservationRequestID
    
                }

            );
        }
        pageData.set("items", items);

    }, function (error) {
        console.log(JSON.stringify(error));
    })

    component.getViewById("listview").notifyPullToRefreshFinished();
    
}
