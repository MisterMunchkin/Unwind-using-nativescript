var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var pageDataContext;


exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< birthday page >>>>>>");

    pageDataContext = page.navigationContext;

    var curDate = new Date();

    var datePicker = page.getViewById("birthdate");

    var yearLimit = parseInt(curDate.getFullYear()) - 10;
    console.log("current date year: " + curDate.getFullYear());
    console.log("year limit: " + yearLimit);
    datePicker.minDate = new Date(1920, 11, 31);
    datePicker.maxDate = new Date(yearLimit, 11, 31);
};

exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("Views/login/login");
}
exports.nextTap = function(){
    var birthday = BirthdateFormat();
  
    console.log("first name: " + pageDataContext.firstName);
    console.log("last name: " + pageDataContext.lastName);
    console.log("middle initial: " + pageDataContext.MI);
    console.log("birthdate: " + birthday);

    var navigationOptions = {
        moduleName: "Views/register/contactNumber/contactnumber",
        context: {
            firstName: pageDataContext.firstName,
            lastName: pageDataContext.lastName,
            MI: pageDataContext.MI,
            birthdate: birthday
        }
    }

    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);

}
function BirthdateFormat(){
    console.log("function birthdateFormat");
    return page.getViewById("birthdate").year + "-" + page.getViewById("birthdate").month
     + "-" + page.getViewById("birthdate").day;
}