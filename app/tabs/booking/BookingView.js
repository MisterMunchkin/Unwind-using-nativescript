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

    var content = loadBookingData();
    console.log(JSON.stringify(content));

    items.push(
        {
            reservationDate: content,
            checkinDate: "checkinDate",
            itemImage: ""
            /*checkoutDate: "content.checkoutDate",
            reservationStatus: "content.reservationStatus"*/
        },
        {
            reservationDate: "shit",
            checkinDate: "fuck",
            itemImage: ""
            /*checkoutDate: "content.checkoutDate",
            reservationStatus: "content.reservationStatus"*/
        }
        
    );
    pageData.set("items", items);
}

exports.fabTap = function(){
    console.log("shit");
    var topmost = frameModule.topmost();
    topmost.navigate("Views/AddBooking/addbooking");
}



function loadBookingData(){
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/loadBookingData.php", {

    }).then(function (response) {
        var obj = response._bodyText;
        obj = JSON.parse(obj);
        console.log(response._bodyText);
        return obj;//find a way to make json object valid for use
       
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}
