var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;
//var connection = require("tns-core-modules/connectivity");

//var connType = connection.getConnectionType();
var loader = new LoadingIndicator();

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

exports.loaded = function(args){ //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object
};

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
function then(response){
    var phpResponse = response._bodyText;

   
    console.log(phpResponse);

    if(phpResponse == "user login secured"){
        console.log("inside user login secured");
        loader.hide();
        var topmost = frameModule.topmost();
        topmost.navigate("tabs/tabs-page");
        
    }else{
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

