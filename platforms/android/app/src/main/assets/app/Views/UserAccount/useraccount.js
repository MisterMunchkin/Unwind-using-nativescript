var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var userObject;
var pageUserObject;

exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<user account page>>>>>>");

    pageUserObject = {
        accountLName: page.getViewById("accountLName"),
        accountFName: page.getViewById("accountFName"),
        accountMName: page.getViewById("accountMName"),
        accountEmail: page.getViewById("accountEmail"),
        accountBirthdate: page.getViewById("accountBirthdate"),
        accountContact_no: page.getViewById("accountContact_no")
    }


    var requestObject = {user_id: global.loginCred[0]};
    fetchModule.fetch("https://unwindv2.000webhostapp.com/useraccount/getUserData.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        var phpResponse = response._bodyText;
        
        console.log("body: " + response._bodyText);
        if(phpResponse.indexOf("error") <= -1){
            userObject = JSON.parse(phpResponse);
            
            pageUserObject.accountLName.text = userObject.last_name;
            pageUserObject.accountFName.text = userObject.first_name;
            pageUserObject.accountMName.text = userObject.middle_initial;
            pageUserObject.accountEmail.text = userObject.email;
            pageUserObject.accountBirthdate.text = userObject.birthdate;
            pageUserObject.accountContact_no.text = userObject.contact_no;

        }else{
            alert({ message: "could not retrieve user info at this time, try again later", okButtonText: "Okay" });
        }
    }, function (error) {
        console.log(JSON.stringify(error));
        alert({ message: "please make sure your internet is stable", okButtonText: "Okay" });
    })
};

exports.backEvent = function(){
    args.cancel = true;

    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
function twoDigits(d){
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function(){
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
