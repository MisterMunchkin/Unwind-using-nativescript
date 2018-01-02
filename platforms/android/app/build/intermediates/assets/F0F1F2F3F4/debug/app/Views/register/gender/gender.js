var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var pageDataContext;


exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< gender page >>>>>>");

    pageDataContext = page.navigationContext;

};

exports.nextTap = function(){
   var gender = "gender";

    console.log("first name: " + pageDataContext.firstName);
    console.log("last name: " + pageDataContext.lastName);
    console.log("middle initial: " + pageDataContext.MI);
    console.log("birthdate: " + pageDataContext.birthdate);
    console.log("contact number: " + pageDataContext.contact_no);
    console.log("gender: " + gender);
    var navigationOptions = {
        moduleName: "Views/register/password/password",
        context: {
            firstName: pageDataContext.firstName,
            lastName: pageDataContext.lastName,
            MI: pageDataContext.MI,
            birthdate: pageDataContext.birthdate,
            contact_no: pageDataContext.contact_no,
            gender: gender
        }
    }

    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);

}
