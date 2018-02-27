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

    items = [];
    console.log("fishing for inquiries response");

   // loadingBar.start();
  //  loadingBar.visibility = "visible";

    var requestObject = { inquiry_id: pageDataContext.inquiryID };
    fetchModule.fetch("https://unwindv2.000webhostapp.com/inquiries/loadResponse.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
      


        var phpResponse = response._bodyText;

        console.log("load response: " + phpResponse);

        console.log("done fishing for inquiries response");
        if(phpResponse.indexOf("error") == -1){
            if(phpResponse.indexOf("no responses") == -1){
                //binding here
                

                /*items.push(
                    {
                        inquiryID: pageDataContext.inquiryID,
                        message: pageDataContext.message,
                        userID: pageDataContext.userID,
                        day: "",
                        year: "",
                        month: "",
                        Username: pageDataContext.name,
                        employeeName: "",
                        employeeID: "",
                        Name: pageDataContext.name
                    }
                )*/

                var obj = JSON.parse(phpResponse);
                var limit = obj.length;
                console.log("response limit: " + limit);
                for(var x = 0;x < limit;x++){
                    console.log("messages: " + obj[x].message);
                    var titleName;

                    if(obj[x].employeeID != null){
                        titleName = "From Employee";
                    }else{
                        titleName = obj[x].name;
                    }
                    items.push(
                        {
                            inquiryID: obj[x].inquiryID,
                            message: obj[x].message,
                            userID: obj[x].userID,
                            day: obj[x].day,
                            year: obj[x].year,
                            month: obj[x].month,
                            Username: obj[x].name,
                            employeeName: obj[x].employeeName,
                            employeeID: obj[x].employee_id,
                            Name: titleName
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
exports.responseSubmit = function(){
    var message = page.getViewById("messageResponse");

    if(message.text != ""){
        console.log("submitting...");

        items.push(
            {
                inquiryID: pageDataContext.inquiryID,
                message: message.text,
                userID: pageDataContext.userID,
                day: "",
                year: "",
                month: "",
                Username: pageDataContext.name,
                employeeName: "",
                employeeID: "",
                Name: pageDataContext.name
            }
        )
        listview.items = items;
        
        var object = {message: message.text,inquiry_id: pageDataContext.inquiryID};
        fetchModule.fetch("https://unwindv2.000webhostapp.com/inquiries/insertResponse.php", {
            method: "POST",
            body: formEncode(object)
        }).then(function (response) {

            
            var phpResponse = response._bodyText;
            console.log("response: " + phpResponse);
            listview.refresh();
            message.text = "";

        }, function (error) {
            console.log(JSON.stringify(error));
            alert({ message: "please make sure your internet is stable", okButtonText: "Okay" });
        })
        console.log("submitted!");
    }else{
        alert({message: "Can't leave response blank", okButtonText:"Okay"});
    }
}
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
