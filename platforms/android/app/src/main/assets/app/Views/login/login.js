var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
var application = require('application');
require("nativescript-master-technology");
//var connection = require("tns-core-modules/connectivity");

//var connType = connection.getConnectionType();
var loader;

var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
};

exports.loaded = function(args){ //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object
    console.log("<<<<<login page>>>>>");
   /* if (application.android) {
        application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
    }*/
};

exports.backEvent = function (args) {

    args.cancel = true;

}

exports.signIn = function(){
    
   /* switch(connType){
        case connType.connectionType.none:
            console.log("no internet connection");
            break;
        case connType.connectionType.wifi:
            console.log("connection: wifi");
            signInfetch()
            break;
        case connType.connectionType.mobile:
            console.log("connection: mobile");
            signInfetch()
            break;  
    }*/
    var email;
    var password;

    email = page.getViewById("email");
    password = page.getViewById("password");

    if(email.text != "" && password.text != ""){
        if(validateEmail(email.text) == true){    
            console.log("email: " + email.text);
            console.log("password: " + password.text);
            loader = new LoadingIndicator();

            loader.show(options);
            var requestObject = { email: email.text, password: password.text };
            console.log("attempting to connect to php server");
            fetchModule.fetch("https://unwindv2.000webhostapp.com/login/login.php", {
                method: "POST",
                body: formEncode(requestObject)

            }).then(function (response) {
                then(response);
                loader.hide();
            }, function (error) {
                console.log("ERROR");
                console.log(JSON.stringify(error));
            })
        }else{
            //email validation notif
        }
    }else{
        password.class = email.class = "requiredFields";
    }
};

/*function signInfetch(){
    var email;
    var password;

    email = page.getViewById("email").text;
    password = page.getViewById("password").text;

    loader.show(options);
    var requestObject = { email: email, password: password };
    console.log("attempting to connect to php server");
    fetchModule.fetch("https://unwindv2.000webhostapp.com/login/login.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}*/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("email validation return: " + re.test(email.toLowerCase()));

    return re.test(email.toLowerCase());
}
function then(response){
    var phpResponse = response._bodyText;

   
    console.log(phpResponse);

    /*phpResponse != "user wrong password" && phpResponse != "user does not exist"
                            && phpResponse != "post failed"*/
    if(phpResponse.indexOf("true") > -1){
        console.log("inside user login secured");
        global.loginCred = JSON.parse(phpResponse);

        console.log("userID: " + global.loginCred[0]);
        console.log("isActive: " + global.loginCred[1]);
        console.log("checkInID: " + global.loginCred[2]);
        

        var topmost = frameModule.topmost();
        topmost.navigate("tabs/tabs-page");
        
    }else{
        page.getViewById("email").text = "";
        page.getViewById("password").text = "";
        alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });     
    }

    
}

exports.register = function(){//used to navigate to another view
    var topmost = frameModule.topmost();
    topmost.navigate("Views/register/register");//sometings wrong with the navigation
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

