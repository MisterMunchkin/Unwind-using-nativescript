const BrowseViewModel = require("./booking-view-model");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
//require("nativescript-dom");

var items = new ObservableArray([]);
var pageData = new Observable();
var component;


exports.onLoaded = function(args) {
    component = args.object;
    component.bindingContext = new BrowseViewModel();

    component.bindingContext = pageData;
  
    var obj;
   // items = new ObservableArray([]);

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
