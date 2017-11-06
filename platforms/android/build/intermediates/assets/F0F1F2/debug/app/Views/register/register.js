var page;
var email;
var password;
var http = require("http");
import * as Https from 'nativescript-https';

exports.loaded = function(args){
    page = args.object;
    console.log("fuck");
}

exports.AccountCreate = function(){
    email = String(page.getViewById("email"));
    password = String(page.getViewById("password"));
    console.log(email + " " + password);

    /*http.request({
        url: "https://unwindv2.000webhostapp.com/register/register.php",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        content: JSON.stringify({emailAdd: email, password: password})
    }).then(function(result){
        //console.log("shit");
        var data = result.toString();
        console.log(data);
    }, function(error){
        console.log(JSON.stringify(error));
        console.log(error.toString());
    });*/

    Https.request({
        url: "https://unwindv2.000webhostapp.com/register/register.php",
        method: "POST",
        headers: {
            'Authorization': 'Basic ZWx1c3VhcmlvOnlsYWNsYXZl',
            'x-uuid': 'aHR0cHdhdGNoOmY',
            'x-version': '4.2.0',
            'x-env': 'DEVELOPMENT',
        },
        content: JSON.stringify({
            'email': email,
            'password': password
        })
    }).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.error(error);
    })

}


