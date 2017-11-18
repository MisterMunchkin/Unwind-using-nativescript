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

    listView(component);

    //
}

exports.fabTap = function(){
    console.log("shit");
    var topmost = frameModule.topmost();
    topmost.navigate("Views/AddBooking/addbooking");
}

function listView(component){
    component.bindingContext = pageData;

    var content = loadBookingData();
    var limit = Object.keys(content).length;

    /*for(var x = 0;x < limit;x++){
        items.push(
            {
                reservationDate: content["reservationDate"],
                checkinDate: content["checkinDate"],
                checkoutDate: content["checkoutDate"],
                reservationStatus: content["reservationStatus"]
            }
        )
    }
    
    pageData.set("items", items);*/
}

function loadBookingData(){
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/loadBookingData.php", {
       // method: "POST",
       // body: formEncode(requestObject)
    }).then(function (response) {

        console.log(JSON.parse(response._bodyText));
        //return JSON.parse(response._bodyText);

    }, function (error) {
        console.log(JSON.stringify(error));
    })
}
