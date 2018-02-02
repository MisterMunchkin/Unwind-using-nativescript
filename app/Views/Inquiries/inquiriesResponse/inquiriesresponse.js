var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var pageDataContext;
var loadingBar;
var noData;
var items;
var listview;

exports.onloaded = function (args) {
    page = args.object
    console.log("<<<<<<inquiries response page>>>>>>");
    pageDataContext = page.navigationContext;
    loadingBar = page.getViewById("loadingBar");
    noData = page.getViewById("noData");
    listview = page.getViewById("listview");

    console.log("fishing for inquiries response");

   // loadingBar.start();
  //  loadingBar.visibility = "visible";

    var requestObject = { inquiry_id: pageDataContext.inquiryID };
    fetchModule.fetch("https://unwindv2.000webhostapp.com/inquiries/loadResponse.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        var items = [];
        var phpResponse = response._bodyText;

        console.log("load response: " + phpResponse);

        console.log("done fishing for inquiries response");
        if(phpResponse.indexOf("error") == -1){
            if(phpResponse.indexOf("no responses") == -1){
                //binding here
                items = [];
                var obj = JSON.parse(phpResponse);
                var limit = obj.length;
                for(var x = 0;x < limit;x++){
                    console.log("messages: " + obj[x].message);
                    items.push(
                        {
                            inquiryID: obj[x].inquiryID,
                            message: obj[x].message,
                            userID: obj[x].userID,
                            day: obj[x].day,
                            year: obj[x].year,
                            month: obj[x].month,
                            name: obj[x].name,
                            employeeName: obj[x].employeeName
                            
                        }
                    )
                }
                listview.items = items;
            }else{
                noData.class = "page-placeholder";
            }
        }else{
            alert({ message: phpResponse, okButtonText: "Okay" });
        }
        console.log("collapsing loading bar...");
        loadingBar.visibility = "collapse";
        loadingBar.stop();
    }, function (error) {
        console.log(JSON.stringify(error));
        alert({ message: "please make sure your internet is stable", okButtonText: "Okay" });
    })
};

exports.onNavBtnTap = function () {
    frameModule.topmost().goBack();
}
exports.backEvent = function (args) {
    args.cancel = true;
    frameModule.topmost().goBack();
}
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}

function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}
