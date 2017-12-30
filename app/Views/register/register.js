var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var observable = require("data/observable");
var viewModule = require("ui/core/view");

//var observableArray = require("data/observable-array");
//var pageData = new observable.Observable();


var guest = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    MI: "",
    birthdate: "",
    contact_no: "",
    gender: ""
}

exports.loaded = function(args){
    page = args.object;
    
    console.log("<<<<<register page>>>>>");

}
exports.onNavBtnTap = function(){
   // frameModule.topmost().goBack();
   var topmost = frameModule.topmost();
   topmost.navigate("Views/login/login");
}
exports.nextTap = function(){
    if(page.getViewById("fname").text != "" && page.getViewById("lname").text != "" && page.getViewById("MI").text){
        var navigationOptions = {
            moduleName: "Views/register/birthday/birthday",
            context: {
                firstName: page.getViewById("fname").text,
                lastName: page.getViewById("lname").text,
                MI: page.getViewById("MI").text.charAt(0)
            }
        }
        console.log("first name: " + page.getViewById("fname").text);
        console.log("last name: " + page.getViewById("lname").text);
        console.log("middle initial: " + page.getViewById("MI").text);

        var topmost = frameModule.topmost();
        topmost.navigate(navigationOptions);
    }else{
        console.log("enter credentials");
        page.getViewById("fname").class = "requiredFields";
        page.getViewById("lname").class = "requiredFields";
        page.getViewById("MI").class = "requiredFields";
    }
}
exports.AccountCreate = function(){

    
    guest.email = page.getViewById("email").text;
    guest.password = page.getViewById("password").text;
    guest.fname = page.getViewById("fname").text;
    guest.lname = page.getViewById("lname").text;
    guest.MI = page.getViewById("MI").text;
    guest.birthdate = BirthdateFormat();
    guest.gender = page.getViewById("gender").text;
    guest.contact_no = page.getViewById("contact_no").text;

    guest.MI = guest.MI.charAt(0);
    console.log(guest.email + " " + guest.password + " " + guest.MI + " " + guest.birthdate + " " + 
    guest.gender + " " + guest.contact_no);

    var requestObject = {email: guest.email, password: guest.password, 
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


function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
