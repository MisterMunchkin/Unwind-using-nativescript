var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;


var items = new ObservableArray([]);
var pageData = new Observable();


var loadingBar;



exports.onloaded = function(args){
    page = args.object
    console.log("<<<<<<service page>>>>>>")
    page.bindingContext = pageData;

    var obj;
    loadingBar = page.getViewById("loadingBar");

    
    //loader = new LoadingIndicator();
    //loader.show(options);

    console.log("new data fishing...");
    loadingBar.start();
    loadingBar.visibility = "visible";
    var requestedObject = {userID: global.loginCred[0]};
    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/loadReservationDataHistory.php", {
        method: "POST",
        body: formEncode(requestedObject)
    }).then(function (response) {
        obj = response._bodyText;
        console.log("done fishing...: " + obj);

        if(obj != "no data error" && obj != "query error"){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            console.log("object: " + JSON.stringify(obj));
            //console.log("inside then function: " + obj);
            var limit = obj.length;

            var MonthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];

            var checkinMonthIndex;
            var checkoutMonthIndex;
            
            var newCheckin;
            var newCheckout;

            for(var x = 0; x < limit;x++){
                checkinMonthIndex = new Date(obj[x].checkinDate);
                checkoutMonthIndex = new Date(obj[x].checkoutDate);

                newCheckin = MonthNames[checkinMonthIndex.getMonth()] + " " + checkinMonthIndex.getDate() + ", " + checkinMonthIndex.getFullYear();
                newCheckout = MonthNames[checkoutMonthIndex.getMonth()] + " " + checkoutMonthIndex.getDate() + ", " + checkoutMonthIndex.getFullYear(); 
    
                items.push(
                    {
                        check_in_date: newCheckin,
                        check_out_date: newCheckout,
                        ResStatus: obj[x].reservationStatus
                    }

                );
    
            }
          
            loadingBar.visibility = "collapse";
            loadingBar.stop();  
            pageData.set("items", items);
        }else{
            loadingBar.visibility = "collapse";
            loadingBar.stop();
            alert({ title: "POST response", message: phpResponse, okButtonText: "Close" });  
        }
        
    }, function (error) {
        console.log(JSON.stringify(error));
    })

   // loader.hide();
}; 
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.goBack();
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.goBack();
}



exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("tapped Item: " + tappedItem.service_name);

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
