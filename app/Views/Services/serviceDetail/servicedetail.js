var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var serviceContext;
var actionBar;

var pageData = new Observable();
var items;

exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< menu_detail page >>>>>>");
    page.bindingContext = pageData;
    actionBar = page.getViewById("actionBar");

    var pageDataContext = page.navigationContext;
    serviceContext = {
        service_name: pageDataContext.service_name,
        service_type: pageDataContext.service_type,
        service_id: pageDataContext.service_id
    };
    actionBar.title = serviceContext.service_name;
    console.log("       <<<<<<<<<<<<Check in id: " + global.loginCred[2]);
    var requestObject = {check_in_id: global.loginCred[2]};
    items = new ObservableArray([]);
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getRoomsFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
        var phpResponse = response._bodyText;
        console.log("QUERY RESPONSE: " + phpResponse);
        phpResponse = JSON.parse(phpResponse);

        var limit = phpResponse.length;
        for(var x = 0;x < limit;x++){
            items.push(
                {
                    roomNumber: phpResponse[x].roomNumber,
                    roomType: phpResponse[x].RoomName
                }
            )
        }

        pageData.set("items", items);
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
    })
    
}

exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/services");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/services");
}

exports.addToCartTap = function(){

}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}