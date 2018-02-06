const SearchViewModel = require("./settings-view-model");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

var loader = new LoadingIndicator();
var items = [];

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

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new SearchViewModel();

    component.bindingContext = {
        loginCred: global.loginCred[0] //gets user id
    }
    items = [];
    items.push(
        {
            listName: "User Account"
        },
        {
            listName: "Reservation History"
        },

        {
            listName: "Inquiries"
        },
        {
            listName: "About Us"
        }
    )
    var listview = component.getViewById("listview");
    listview.items = items;
}

exports.onLoaded = onLoaded;

exports.onItemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("tapped item:" + tappedItem.listName);
    switch(tappedItem.listName){
        case "User Account":
        goToUserAccount();
        break;
        case "Inquiries":
        goToInquiries();
        break;
        case "About Us":
        goToAboutUs();
        break;
    }
}

<<<<<<< HEAD
=======
function goToReservationHistory(){
   
    var topmost = frameModule.topmost();
    topmost.navigate("Views/ReservationHistory/reservationhistory");
}
function goToServiceHistory(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/serviceHistory/servicehistory");
}
>>>>>>> New-Default-Development
function goToUserAccount(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/UserAccount/useraccount");
}
function goToInquiries(){
    console.log("not yet made");
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Inquiries/inquiries");
}
function goToAboutUs(){
    console.log("not yet made");
}
exports.logOut = function(){
    loader.show(options);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/logout/logout.php", {

    }).then(function (response) {
        var phpResponse = response._bodyText;

        console.log(JSON.stringify(response));
        if(phpResponse == "logged out"){
            global.checkinSec = 0;
            global.checkOutGrandTotal = 0;
            var topmost = frameModule.topmost();
            topmost.navigate("Views/login/login");
        }else{
            alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
        }
        loader.hide();
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}