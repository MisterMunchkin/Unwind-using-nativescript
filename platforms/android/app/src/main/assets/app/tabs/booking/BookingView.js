const BrowseViewModel = require("./booking-view-model");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
var view = require("ui/core/view");
//var AwesomeLoaders = require('nativescript-awesome-loaders').AwesomeLoaders;

//var li = new AwesomeLoaders();
var items;
var pageData = new Observable();
var component;

var phpContext;
var requestLabel;
var reservationLabel;

var request;
var reserve;
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
/*
    li.width = 60;
    li.height = 60;
    li.indicator = "SemiCircleSpin";
    li.indicatorColor = "black";*/

    console.log("<<<<< booking view page >>>>>");
    component.bindingContext = pageData;
    loader = new LoadingIndicator();

    requestLabel = view.getViewById(component, "reqNavLabel");
    reservationLabel = view.getViewById(component, "resNavLabel");

    request = component.getViewById("reqNavLabel");
    reserve = component.getViewById("resNavLabel");
    //requestLabel.className = "ActiveNav";
   // reservationLabel.className ="inActiveNav";
    request.class = "inActiveNav";
    reserve.class = "ActiveNav";
  
  

    loadData("loadReservationData.php");
  
    
}

exports.pullToRefreshInit = function(){
    //find a way to overwrite listview data and refresh page with new data 
    console.log("request class: " + request.class);
    var dataRet;
    if(request.class == "ActiveNav"){
       dataRet = loadData("loadRequestData.php");
    }else{
        dataRet = loadData("loadReservationData.php");
    }

    if(dataRet == "loading done"){
        component.getViewById("listview").notifyPullToRefreshFinished();
    }
}

exports.requestNav = function (args) {
    console.log("request nav clicked");
    loader = new LoadingIndicator();
    request = component.getViewById("reqNavLabel");
    reserve = component.getViewById("resNavLabel");

    request.class = "ActiveNav";
    reserve.class= "inActiveNav";

 
    loadData("loadRequestData.php");
    
}
exports.reservationNav = function (args) {
    console.log("reservation nav clicked");
    loader = new LoadingIndicator();

    request = component.getViewById("reqNavLabel");
    reserve = component.getViewById("resNavLabel");

    request.class = "inActiveNav";
    reserve.class= "ActiveNav";

   
    loadData("loadReservationData.php");
 
}

function loadData(phpContext){
    var obj;
    items = new ObservableArray([]);
   // loader.show(uncancelable);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/" + phpContext, {

    }).then(function (response) {
        obj = response._bodyText;
        console.log(obj);
        
        if(obj != "no data"){
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
            var checkinMonthIndex;
            var checkoutMonthIndex;
            var newCheckin;
            var newCheckout;
            var MonthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];

            console.log("num of items: " + limit);
            for (var x = 0; x < limit; x++) {
                
                checkinMonthIndex = new Date(obj[x].checkinDate)
                checkoutMonthIndex = new Date(obj[x].checkoutDate);

                newCheckin = MonthNames[checkinMonthIndex.getMonth()] + " " + checkinMonthIndex.getDate() + ", " + checkinMonthIndex.getFullYear();
                newCheckout = MonthNames[checkoutMonthIndex.getMonth()] + " " + checkoutMonthIndex.getDate() + ", " + checkoutMonthIndex.getFullYear(); 
                console.log("newCheckin: " + newCheckin);
                items.push(
                    {
                        reservationDate: obj[x].reservationDate,
                        checkinDate:  newCheckin,
                        checkoutDate:  newCheckout,
                        reservationStatus: obj[x].reservationStatus,
                        itemImage: "",
                        reservationID:  obj[x].reservationRequestID,
                        adult_qty: obj[x].adult_qty,
                        child_qty: obj[x].child_qty

                    }

                );

            }
        }else{
            //label no data
        }
       // loader.hide();
        pageData.set("items", items);

    }, function (error) {
        console.log(JSON.stringify(error));
    })
    return "loading done";
}

exports.onItemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;
    
    var resDate = tappedItem.reservationDate;
    var checkinDate = tappedItem.checkinDate;
    var checkoutDate = tappedItem.checkoutDate;
    var resStatus = tappedItem.reservationStatus;
    var resID = tappedItem.reservationID;

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

