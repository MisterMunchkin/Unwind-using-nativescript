var page;
var email;
var password;
var http = require("http");
var fetchModule = require("fetch");

exports.loaded = function(args){
    page = args.object;
    console.log("fuck");
}

exports.AccountCreate = function(){
    email = page.getViewById("email").text;
    password = page.getViewById("password").text;
    //console.log(email + " " + password);

    var requestObject = {email: email, password: password};

    

    fetchModule.fetch("https://unwindv2.000webhostapp.com/register/register.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function(response){
        alert({title: "POST response", message: JSON.stringify(response), okButtonText: "Close"});
    }, function(error){
        console.log(JSON.stringify(error));
    })

    /*Https.request({
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
    })*/

}

function formEncode(obj){
    var str = [];
    for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");   
}

