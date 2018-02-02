var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var loadingBar;
var items = [];
var listview;
//var messageLabel;

exports.onloaded = function(args){
    page = args.object;
    console.log("<<<<<<inquiries page>>>>>>");

    loadingBar = page.getViewById("loadingBar");
    listview = page.getViewById("listview");
   // messageLabel = page.getViewById("messageLabel");
    console.log("loading bar: " + loadingBar);
    var requestObject = {user_id: global.loginCred[0]};
    

    console.log("loading bar: " + loadingBar);
   // console.log("messageLabel: " + messageLabel);
   // messageLabel.textWrap = true;

    loadingBar.start();
    loadingBar.visibility = "visible";
    items = [];
    listview.visibility = "collapse";
    console.log("fishing for inquiries...");
    fetchModule.fetch("https://unwindv2.000webhostapp.com/inquiries/loadInquiries.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        var phpResponse = response._bodyText;
        console.log("load inquiry response: " + phpResponse);
        
        console.log("limit: " + limit);
        console.log("index of: " + phpResponse.indexOf("error"));
        if(phpResponse.indexOf("error") == -1){
            var obj = JSON.parse(phpResponse);
            var limit = obj.length;
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
          
            listview.visibility = "visible";
            listview.items = items;
            console.log("done fishing for inquiries...");
        }else{
            console.log("no data");
            loadingBar.visibility = "collapse";
            loadingBar.stop();
         
            var noData = page.getViewById("noData");
            noData.class = "page-placeholder";
        }
    }, function (error) {
        console.log(JSON.stringify(error));
        loadingBar.visibility = "collapse";
        loadingBar.stop();
    })
    
};
exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("message: " + tappedItem.message);
    var navigationOptions = {
        moduleName: "Views/Inquiries/inquiriesResponse/inquiriesresponse",
        context: {
            inquiryID: tappedItem.inquiryID,
            message: tappedItem.message,
            userID: tappedItem.userID,
            name: tappedItem.name
        }
    }

    var topmost = frameModule.topmost();
    topmost.navigate(navigationOptions);
}
exports.fabTap = function(){
    console.log("fab tap pressed");

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Inquiries/addinquiries/addinquiries");
}

exports.onNavBtnTap = function(){
    //frameModule.topmost().goBack();
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
exports.backEvent = function(args){
    args.cancel = true

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
