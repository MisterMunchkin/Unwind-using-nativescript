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
global.checkOutGrandTotal = 0;
global.loginCred;
//application.start({ moduleName: "./tabs/tabs-page" });
application.start({ moduleName: "Views/login/login" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
