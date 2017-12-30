var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var pageDataContext;


exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< add quantity page >>>>>>");

    pageDataContext = page.navigationContext;

};

exports.nextTap = function(){
   var password = page.getViewById("password").text;

    console.log("first name: " + pageDataContext.firstName);
    console.log("last name: " + pageDataContext.lastName);
    console.log("middle initial: " + pageDataContext.MI);
    console.log("birthdate: " + pageDataContext.birthday);
    console.log("contact number: " + pageDataContext.contact_no);
    console.log("gender: " + pageDataContext.gender);
    console.log("password: " + password);


    var navigationOptions = {
        moduleName: "Views/register/email/email",
        context: {
            firstName: pageDataContext.firstName,
            lastName: pageDataContext.lastName,
            MI: pageDataContext.MI,
            birthdate: pageDataContext.birthday,
            contact_no: pageDataContext.contact_no,
            gender: pageDataContext.gender,
            password: password
        }
    }

    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);

}
