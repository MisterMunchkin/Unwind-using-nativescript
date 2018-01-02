var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var pageDataContext;


exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< email address page >>>>>>");

    pageDataContext = page.navigationContext;

    page.bindingContext = {
        ValidEmail: "collapse"
    }

};

exports.nextTap = function(){
   var email = page.getViewById("email");
    console.log("email: " + page.getViewById("email").text);

    if(email.text != ""){
        if(validateEmail(email.text) == true){
            console.log("first name: " + pageDataContext.firstName);
            console.log("last name: " + pageDataContext.lastName);
            console.log("middle initial: " + pageDataContext.MI);
            console.log("birthdate: " + pageDataContext.birthday);
            console.log("contact number: " + pageDataContext.contact_no);
            console.log("gender: " + pageDataContext.gender);
            console.log("password: " + pageDataContext.password);
            console.log("email: " + email.text);

            /*var requestObject = {email: email, password: password, 
                fname: guest.fname, lname: guest.lname, MI: guest.MI, birthdate: guest.birthdate,
            gender: guest.gender, contact_no: guest.contact_no};   

            //loader.show(options); var of Loader.js, find a way to include it in this script
            fetchModule.fetch("https://unwindv2.000webhostapp.com/register/register.php", {
            method: "POST",
            body: formEncode(requestObject)
            }).then(function(response){

            then(response);

            }, function(error){
            console.log(JSON.stringify(error));
            })*/
        }else{
            page.bindingContext = {
                ValidEmail: "visible"
            }
        }
    }else{
        email.class = "requiredFields";

    }
}

function then(response){
    var phpResponse = response._bodyText;
    alert({ title: "POST response", message: phpResponse, okButtonText: "Close" }); //change this to a snackbar
    if (phpResponse == "user added") {
          
        var topmost = frameModule.topmost();
        topmost.navigate("Views/login/login");
    }
    console.log(JSON.stringify(response));
    page.getViewById("email").text = "";
    page.getViewById("password").text = "";
    page.getViewById("fname").text = "";
    page.getViewById("lname").text = "";
    page.getViewById("MI").text = "";
  
    page.getViewById("gender").text = "";
    page.getViewById("contact_no").text = "";
    
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("email validation return: " + re.test(email.toLowerCase()));

    return re.test(email.toLowerCase());
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
