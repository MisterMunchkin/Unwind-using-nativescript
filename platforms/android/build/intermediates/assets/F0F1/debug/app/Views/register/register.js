var page;
var email;
var password;
var http = require("http");


exports.loaded = function(args){
    page = args.object;
  
}

exports.AccountCreate = function(){
    email = page.getViewById("email");
    password = page.getViewById("password");

    http.request({
        url: "../Models/register/register.php",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        content: JSON.stringify({emailAdd: email, password: password})
    }).then(function(result){
        console.log(JSON.stringify(result));
    }, function(error){
        console.log(JSON.stringify(error));
    });
}


