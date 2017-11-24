const BrowseViewModel = require("./booking-view-model");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items = new ObservableArray([]);
var pageData = new Observable();

exports.onLoaded = function(args) {
    const component = args.object;
    component.bindingContext = new BrowseViewModel();

    //listView(component);

    //
    component.bindingContext = pageData;

    //var content = loadBookingData();

    var obj;
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/loadBookingData.php", {

    }).then(function (response) {
        obj = response._bodyText;
        obj = JSON.parse(obj);
        console.log("inside then function: " + obj);
        var limit = obj.length;

        for(var x = 0; x < limit;x++){
            items.push(
                {
                    reservationDate: "Reservation Date: " + obj[x].reservationDate,
                    checkinDate: "check in Date: " + obj[x].checkinDate,
                    checkoutDate: "check out Date: " + obj[x].checkoutDate,
                    reservationStatus: "status: " + obj[x].reservationStatus,
                    itemImage: ""
                    /*checkoutDate: "content.checkoutDate",
                    reservationStatus: "content.reservationStatus"*/
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

    console.log("tapped: " + tappedItem.reservationDate);
}

exports.fabTap = function(){
    console.log("shit");
    var topmost = frameModule.topmost();
    topmost.navigate("Views/AddBooking/addbooking");
}

