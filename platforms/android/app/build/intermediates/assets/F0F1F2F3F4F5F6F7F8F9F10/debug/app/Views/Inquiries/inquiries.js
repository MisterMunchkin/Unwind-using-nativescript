var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var loadingBar;
var items;
var loadSec;

exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<user account page>>>>>>");

    loadingBar = page.getViewById("loadingBar");

    var requestObject = {user_id: global.loginCred[0]};
    if(loadSec == undefined){

        loadingBar.start();
        loadingBar.visibility = "visible";
        fetchModule.fetch("https://unwindv2.000webhostapp.com/logout/logout.php", {
            method: "POST",
            body: formEncode(requestObject)
        }).then(function (response) {
            var phpResponse = response._bodyText;

            var obj = JSON.parse(phpResponse);
            var limit = obj.length;
            for(var x = 0; x < limit;x++){
                items.push(
                    {
                        listName: "",
                        listMessage: obj.message,
                        listTimeStamp: obj.timestamp 
                    }
                )
            }   
            loadingBar.visibility = "collapse";
            loadingBar.stop();
            var listview = page.getViewById("listview");
            listview.items = items;
        }, function (error) {
            console.log(JSON.stringify(error));
        })
    }
};
exports.fabTap = function(){
    console.log("fab tap pressed");
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
