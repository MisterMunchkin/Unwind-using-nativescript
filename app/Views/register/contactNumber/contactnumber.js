var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var pageDataContext;


exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< contact number page >>>>>>");

    pageDataContext = page.navigationContext;

};

exports.nextTap = function(){
   var contact_no = page.getViewById("contact_no");

    if(contact_no.text != ""){
        console.log("first name: " + pageDataContext.firstName);
        console.log("last name: " + pageDataContext.lastName);
        console.log("middle initial: " + pageDataContext.MI);
        console.log("birthdate: " + pageDataContext.birthdate);
        console.log("contact number: " + contact_no.text);

        var navigationOptions = {
            moduleName: "Views/register/gender/gender",
            context: {
                firstName: pageDataContext.firstName,
                lastName: pageDataContext.lastName,
                MI: pageDataContext.MI,
                birthdate: pageDataContext.birthdate,
                contact_no: contact_no.text
            }
        }

        var topmost = frameModule.topmost();
        topmost.navigate(navigationOptions);
    }else{
        contact_no.class = "requiredFields";
    }
}
