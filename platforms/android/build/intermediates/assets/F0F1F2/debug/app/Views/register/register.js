var page;

var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var loaderModule = require("Loader");

exports.loaded = function(args){
    page = args.object;
}

exports.AccountCreate = function(){
    var email;
    var password;
    var fname;
    var lname;

    email = page.getViewById("email").text;
    password = page.getViewById("password").text;
    fname = page.getViewById("fname").text;
    lname = page.getViewById("lname").text;
    console.log(email + " " + password);

    var requestObject = {email: email, password: password, 
                        fname: fname, lname: lname};   
    
    loaderModule.loader.show(options);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/register/register.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function(response){
        //alert({title: "POST response", message: JSON.stringify(response), okButtonText: "Close"});
        loaderModule.loader.hide();
        if(JSON.stringify(response) == "user added"){
            alert({ title: "POST response", message: JSON.stringify(response), okButtonText: "Close" });
        }else{
            console.log(JSON.stringify(response));
        }
    }, function(error){
        console.log(JSON.stringify(error));
    })

  

}

exports.signin = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/login/login");
}

function formEncode(obj){ //to convert urlencoded form data to JSON
    var str = [];
    for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");   
}

