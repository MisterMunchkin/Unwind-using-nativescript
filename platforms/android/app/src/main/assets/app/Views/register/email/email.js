var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
var pageDataContext;
var dialogs = require("tns-core-modules/ui/dialogs");

var loader = new LoadingIndicator();

var optionsModule = {
    title: "Are you sure you want to do this?",
    message: "this will go back to the login page, and clear your progress",
    cancelButtonText: "Cancel",
    okButtonText: "Yes, I'm sure"
};

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

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< email address page >>>>>>");

    pageDataContext = page.navigationContext;

    page.bindingContext = {
        ValidEmail: "collapse"
    }

};
exports.onNavBtnTap = function(){
    dialogs.confirm(optionsModule).then((result) =>{
        if(result == true){
            var topmost = frameModule.topmost();
            topmost.navigate("Views/login/login");
        }else{
            console.log(result);
        }
   })
}


exports.nextTap = function(){
   var email = page.getViewById("email");
    console.log("email: " + page.getViewById("email").text);

    if(email.text != ""){
        if(validateEmail(email.text) == true){
            console.log("first name: " + pageDataContext.firstName);
            console.log("last name: " + pageDataContext.lastName);
            console.log("middle initial: " + pageDataContext.MI);
            console.log("birthdate: " + pageDataContext.birthdate);
            console.log("contact number: " + pageDataContext.contact_no);
            console.log("gender: " + pageDataContext.gender);
            console.log("password: " + pageDataContext.password);
            console.log("email: " + email.text);

            var requestObject = {email: email.text, password: pageDataContext.password, 
                fname: pageDataContext.firstName, lname: pageDataContext.lastName, 
                MI: pageDataContext.MI, birthdate: pageDataContext.birthdate,
                gender: pageDataContext.gender, contact_no: pageDataContext.contact_no};   

            //loader.show(options); var of Loader.js, find a way to include it in this script
            loader.show(options);
            fetchModule.fetch("https://unwindv2.000webhostapp.com/register/register.php", {
            method: "POST",
            body: formEncode(requestObject)
            }).then(function(response){

                then(response);
                
            }, function(error){
                console.log(JSON.stringify(error));
                alert({message: "please check your internet connectivity", okButtonText: "Okay"});
                loader.hide();
            })
        }else{
            page.bindingContext = {
                ValidEmail: "visible"
            }
        }
    }else{
        email.class = "requiredFields";

    }
}

function then(response){
    var phpResponse = response._bodyText;
    alert({ title: "POST response", message: phpResponse, okButtonText: "Close" }); //change this to a snackbar
    if (phpResponse == "user added") {
        loader.hide();
        var topmost = frameModule.topmost();
        topmost.navigate("Views/login/login");
    }
    console.log(JSON.stringify(response));
    page.getViewById("email").text = "";
    page.getViewById("password").text = "";
    page.getViewById("fname").text = "";
    page.getViewById("lname").text = "";
    page.getViewById("MI").text = "";
  
    page.getViewById("gender").text = "";
    page.getViewById("contact_no").text = "";
    
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("email validation return: " + re.test(email.toLowerCase()));

    return re.test(email.toLowerCase());
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
