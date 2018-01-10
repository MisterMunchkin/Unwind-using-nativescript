require("./bundle-config");
const application = require("application");

var frame = require('ui/frame');
if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}

function backEvent(args) {
    var currentPage = frame.topmost().currentPage;
    if (currentPage && currentPage.exports && typeof currentPage.exports.backEvent === "function") {
        currentPage.exports.backEvent(args);
    }
}

global.foodArray = new Array();
global.checkOutGrandTotal = 1250.00; //1250 generalizing pricing for the rooms
global.servicesOrdered = new Array();
global.roomOrdered = new Array();//will be filled during check in 
global.loginCred;
//when room is ready add it as a global to get the pricing

//application.start({ moduleName: "./tabs/tabs-page" });
application.start({ moduleName: "Views/login/login" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
