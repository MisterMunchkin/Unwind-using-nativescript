var page;
var email;
var password;
var http = require("http");


exports.loaded = function(args){
    page = args.object;
    console.log("shit");
}

exports.AccountCreate = function(){
    email = String(page.getViewById("email"));
    password = String(page.getViewById("password"));

    /*http.request({
        url: "../../Models/register/register.php",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        content: JSON.stringify({emailAdd: email, password: password})
    }).then(function(result){
        console.log(JSON.stringify(result));
    }, function(error){
        console.log(JSON.stringify(error));
    });*/

   /* $.ajax({
        url: "../../Models/register/register.php",
        method: "POST",
        data: {emailAdd: email, password: password},
        success: function(result){
            console.log(JSON.stringify(result));
        },
        error: function(error){
            console.log(JSON.stringify(error));
        }
    })*/
    
}


