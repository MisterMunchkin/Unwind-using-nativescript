var frameModule = require("ui/frame");


exports.loaded = function(){ //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    console.log("hello");
};

exports.signIn = function(){
    alert("Signing in");
};



exports.register = function(){//used to navigate to another view
    var topmost = frameModule.topmost();
    topmost.navigate("register/register");
}