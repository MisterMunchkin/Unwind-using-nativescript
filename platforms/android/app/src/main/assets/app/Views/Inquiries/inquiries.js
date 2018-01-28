var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var loadingBar;
var items = [];


exports.onloaded = function(args){
    page = args.object;
    console.log("<<<<<<inquiries page>>>>>>");

    loadingBar = page.getViewById("loadingBar");

    console.log("loading bar: " + loadingBar);
    var requestObject = {user_id: global.loginCred[0]};
    
    if(items.length < 1){
        loadingBar.start();
        loadingBar.visibility = "visible";
        items = [];
        console.log("fishing for inquiries...");
        fetchModule.fetch("https://unwindv2.000webhostapp.com/inquiries/loadInquiries.php", {
            method: "POST",
            body: formEncode(requestObject)
        }).then(function (response) {
            var phpResponse = response._bodyText;
            console.log("load inquiry response: " + phpResponse);
            var obj = JSON.parse(phpResponse);
            var limit = obj.length;
            if(limit >= 1){
                for(var x = 0; x < limit;x++){
                    var date = obj[x].month + " " + obj[x].day + ", " + obj[x].year;
                    items.push(
                        {
                            inquiryID: obj[x].inquiryID,
                            message: obj[x].message,
                            userID: obj[x].user_id,
                            name: obj[x].name
                        }
                    )
                    console.log("name: " + obj[x].name);
                }   
                loadingBar.visibility = "collapse";
                loadingBar.stop();
                var listview = page.getViewById("listview");
                listview.items = items;
                console.log("done fishing for inquiries...");
            }else{
                loadingBar.visibility = "collapse";
                loadingBar.stop();
                var listview = page.getViewById("listview");
                listview.visibility = "collapse";
                var noData = page.getViewById("noData");
                noData.class = "page-placeholder";
            }
        }, function (error) {
            console.log(JSON.stringify(error));
            loadingBar.visibility = "collapse";
            loadingBar.stop();
        })
    }else{
        console.log("data has been cached...");
    }
};
exports.fabTap = function(){
    console.log("fab tap pressed");

    
}

exports.onNavBtnTap = function(){
    frameModule.topmost().goBack();
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
