var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var dialogs = require("tns-core-modules/ui/dialogs");

var pageDataContext;

var options = {
    title: "Are you sure you want to do this?",
    message: "this will go back to the login page, and clear your progress",
    cancelButtonText: "Cancel",
    okButtonText: "Yes, I'm sure"
};

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< contact number page >>>>>>");

    pageDataContext = page.navigationContext;

};

exports.onNavBtnTap = function(){
    dialogs.confirm(options).then((result) => {
        if(result == true){
            var topmost = frameModule.topmost();
            topmost.navigate("Views/login/login");        
        }else{
            console.log(result);
        }
    })
    
}
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
