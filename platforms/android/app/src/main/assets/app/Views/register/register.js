var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var observable = require("data/observable");
var viewModule = require("ui/core/view");
var dialogs = require("tns-core-modules/ui/dialogs");
var wrapLayoutModule = require("tns-core-modules/ui/layouts/wrap-layout");
//var observableArray = require("data/observable-array");
//var pageData = new observable.Observable();

var options = {
    title: "Are you sure you want to do this?",
    message: "this will go back to the login page, and clear your progress",
    cancelButtonText: "Cancel",
    okButtonText: "Yes, I'm sure"
};

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

    page.bindingContext = {
        requiredNotif: "collapse"
    }
    
    console.log("<<<<<register page>>>>>");

}
exports.onNavBtnTap = function(){
   // frameModule.topmost().goBack();
    
   dialogs.confirm(options).then((result) =>{
        if(result == true){
            var topmost = frameModule.topmost();
            topmost.navigate("Views/login/login");
        }else{
            console.log(result);
        }
   })
}

function validateName(name){
    var regex = /^[a-zA-Z]{2,30}$/;
    console.log("value: " + name.text);
    return regex.test(name.text);
}
exports.nextTap = function(){
    
    if(validateName(page.getViewById("fname")) == true && validateName(page.getViewById("lname")) == true){
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
     

        page.bindingContext = {
            requiredNotif: "visible"
        }
    }
}



function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
