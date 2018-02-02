require("./bundle-config");
const application = require("application");
var connectivity = require("tns-core-modules/connectivity");
var SnackBar = require("nativescript-snackbar").SnackBar;
var SnackBarOptions = require("nativescript-snackbar").SnackBarOptions;

var snackBar = new SnackBar();
var connectionType = connectivity.getConnectionType();

var snackBarOptions =  SnackBarOptions = {
    actionText: 'Okay',
    actionTextColor: "white",
    snackText: "You're not connected to the internet, alot of the functionalities will not work",
    hideDelay: 5500,
    textColor: "white",
    backgroundColor: "#323232"
}


connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType){
    switch(newConnectionType){
        case connectivity.connectionType.none:
        console.log("no interet");

        snackBar.action(snackBarOptions).then((args) => {
            if(args.command === "Action"){
                this.set('jsonResult', JSON.stringify(args));
                console.log("okay");
            }else{
                this.set('jsonResult', JSON.stringify(args));
                console.log("not okay");
            }
        })
        break;
        case connectivity.connectionType.wifi:
        snackBar.simple('Successfully connected to the internet', 'white', '#323232').then((args) => {
            this.set('jsonResult', JSON.stringify(args));
        });
        console.log("wifi");
        break;
        case connectivity.connectionType.mobile:
        snackBar.simple('Successfully connected to the internet', 'white', '#323232').then((args) => {
            this.set('jsonResult', JSON.stringify(args));
        });
        console.log("mobile");
        break;
    }
})

var frame = require('ui/frame');
if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}

function onBackNav(args){

}

function backEvent(args) {
    var currentPage = frame.topmost().currentPage;
    if (currentPage && currentPage.exports && typeof currentPage.exports.backEvent === "function") {
        currentPage.exports.backEvent(args);
    }
}


global.foodArray = new Array();//used for ordering food from menu
global.checkOutGrandTotal = 0; //1250 generalizing pricing for the rooms
global.servicesOrdered = new Array();
global.roomOrdered = new Array();//used for storing rooms in add booking
global.activeTab = 0;
global.activeTabBooking = 0;
global.checkinSec = 0;
global.roomsCheckedIn; //USE THIS TO CACHE ROOMS GET ROOMS FROM LOGIN


//when room is ready add it as a global to get the pricing
//console.log("check in id: " + global.loginCred[2]);
//application.start({ moduleName: "./tabs/tabs-page" });

application.start({ moduleName: "Views/login/login" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
