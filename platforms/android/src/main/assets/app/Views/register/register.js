var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var observable = require("data/observable");
var viewModule = require("ui/core/view");

//var observableArray = require("data/observable-array");
//var pageData = new observable.Observable();

exports.loaded = function(args){
    page = args.object;
    //pageData.set("showPicker", true);
    //args.object.bindingContext = pageData;
}

exports.AccountCreate = function(){
    var email;
    var password;
    var fname;
    var lname;
    var MI;
    var birthdate;
    var gender;
    var contact_no;

    email = page.getViewById("email").text;
    password = page.getViewById("password").text;
    fname = page.getViewById("fname").text;
    lname = page.getViewById("lname").text;
    MI = page.getViewById("MI").text;
    birthdate = BirthdateFormat();
    gender = page.getViewById("gender").text;
    contact_no = page.getViewById("contact_no").text;

    MI = MI.charAt(0);
    console.log(email + " " + password + " " + MI + " " + birthdate + " " + 
    gender + " " + contact_no);

    var requestObject = {email: email, password: password, 
                        fname: fname, lname: lname, MI: MI, birthdate: birthdate,
                    gender: gender, contact_no: contact_no};   
    
    //loader.show(options); var of Loader.js, find a way to include it in this script
    fetchModule.fetch("https://unwindv2.000webhostapp.com/register/register.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function(response){

        then(response);

    }, function(error){
        console.log(JSON.stringify(error));
    })

}

function BirthdateFormat(){
    return page.getViewById("birthdate").year + "-" + page.getViewById("birthdate").month
     + "-" + page.getViewById("birthdate").day;
}
/*exports.birthdateTap = function(){
    pageData.set("showPicker", !pageData.get("showPicker"));
}*/

exports.signin = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/login/login");
}

function then(response){
    var phpResponse = response._bodyText;
    if (phpResponse == "user added") {
        alert({ title: "POST response", message: phpResponse, okButtonText: "Close" }); //change this to a snackbar
        console.log(JSON.stringify(response));
    } else {
        console.log(JSON.stringify(response));
    }
    page.getViewById("email").text = "";
    page.getViewById("password").text = "";
    page.getViewById("fname").text = "";
    page.getViewById("lname").text = "";
    page.getViewById("MI").text = "";
  
    page.getViewById("gender").text = "";
    page.getViewById("contact_no").text = "";

    var topmost = frameModule.topmost();
    topmost.navigate("Views/login/login");
}


function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
