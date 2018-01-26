var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
var application = require('application');
require("nativescript-master-technology");
var connectivity = require("tns-core-modules/connectivity");
var SnackBar = require("nativescript-snackbar").SnackBar;

var snackBar = new SnackBar();
var connectionType = connectivity.getConnectionType();
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
  
        
};

exports.backEvent = function (args) {

    args.cancel = true;

}

exports.signIn = function(){
    
    var email;
    var password;

    email = page.getViewById("email");
    password = page.getViewById("password");

    if(email.text != "" && password.text != ""){
        if(validateEmail(email.text) == true){    
            console.log("email: " + email.text);
          //  console.log("password: " + password.text);
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
                loader.hide();
                alert({message: "please make sure you're connected to the internet and try again", okButtonText: "Okay"});
            })
            
        }else{
            //email validation notif
        }
    }else{
        password.class = email.class = "requiredFields";
    }
};


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("email validation return: " + re.test(email.toLowerCase()));

    return re.test(email.toLowerCase());
}
function then(response){
    var phpResponse = response._bodyText;

    if(!response.ok){
        alert({message: "an error has occured, please make sure you're connected to the internet and try again", okButtonText: "Okay"});
    }
   
    console.log(phpResponse);

    /*phpResponse != "user wrong password" && phpResponse != "user does not exist"
                            && phpResponse != "post failed"*/
    if(phpResponse.indexOf("true") > -1){
        
        console.log("inside user login secured");
        global.loginCred = JSON.parse(phpResponse);
      
        console.log("userID: " + global.loginCred[0]);
        console.log("isActive: " + global.loginCred[1]);
        console.log("checkInID: " + global.loginCred[2]);
        console.log("total food price: " + global.loginCred[3]);
        console.log("total room price: " + global.loginCred[4]);
        console.log("grandTotalCheckOut: " + global.checkOutGrandTotal);
        console.log("food Array: " + JSON.stringify(global.foodArray));
        console.log("serviceOrdered: " + JSON.stringify(global.servicesOrdered));
        console.log("roomOdered: " + JSON.stringify(global.roomOrdered));

        if(global.loginCred[3] == undefined && global.loginCred[4] == undefined){
            global.checkOutGrandTotal = 0;

            console.log("after adding food and room grandTotalCheckOut:" + global.checkOutGrandTotal);
            var topmost = frameModule.topmost();
            topmost.navigate("tabs/tabs-page");
        }else{
            global.checkOutGrandTotal += global.loginCred[3] + global.loginCred[4];
            
            var requestObject = {check_in_id: global.loginCred[2]};
            fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getRoomsFromCheckin.php", {
                method: "POST",
                body: formEncode(requestObject)
            }).then(function (response) {
                var phpResponse = response._bodyText;
                var obj = JSON.parse(phpResponse);

                console.log("rooms checked in : " + phpResponse);
                global.roomsCheckedIn = obj;

                console.log("after adding food and room grandTotalCheckOut:" + global.checkOutGrandTotal);
                var topmost = frameModule.topmost();
                topmost.navigate("tabs/tabs-page");
            }, function (error) {
                console.log(JSON.stringify(error));
            })
        }
        /*console.log("after adding food and room grandTotalCheckOut:" + global.checkOutGrandTotal);
        var topmost = frameModule.topmost();
        topmost.navigate("tabs/tabs-page");*/
        
    }else{
       // page.getViewById("email").text = "";
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

