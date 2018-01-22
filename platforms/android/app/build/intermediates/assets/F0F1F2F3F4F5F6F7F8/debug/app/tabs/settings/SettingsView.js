const SearchViewModel = require("./settings-view-model");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

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

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new SearchViewModel();

    component.bindingContext = {
        loginCred: global.loginCred[0]
    }
}

exports.onLoaded = onLoaded;

exports.logOut = function(){
    loader.show(options);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/logout/logout.php", {

    }).then(function (response) {
        var phpResponse = response._bodyText;

        console.log(JSON.stringify(response));
        if(phpResponse == "logged out"){
            var topmost = frameModule.topmost();
            topmost.navigate("Views/login/login");
        }else{
            alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });
        }
        loader.hide();
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}