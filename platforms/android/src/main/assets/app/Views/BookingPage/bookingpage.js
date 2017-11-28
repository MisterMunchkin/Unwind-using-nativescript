var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");


exports.onloaded = function (args) {
    page = args.object

    var pageDataContext = page.navigationContext;
/*
    console.log(pageDataContext.resDate);
    console.log(pageDataContext.checkinDate);
    console.log(pageDataContext.checkoutDate);
    console.log(pageDataContext.resStatus);
    console.log(pageDataContext.resID);
    */
    page.getViewById("resDateLabel").text = pageDataContext.resDate;
};

exports.cancelButton = function(args){
    var pageDataContext = page.navigationContext;

    var requestObject = {resDate: pageDataContext.resDate,
                         checkinDate: pageDataContext.checkinDate,
                         checkoutDate: pageDataContext.checkoutDate,
                         resStatus: pageDataContext.resStatus,
                         resID: pageDataContext.resID};
    
    console.log(pageDataContext.resDate);
    console.log(pageDataContext.checkinDate);
    console.log(pageDataContext.checkoutDate);
    console.log(pageDataContext.resStatus);
    console.log(pageDataContext.resID);

    fetchModule.fetch("https://unwindv2.000webhostapp.com/booking/cancelbooking.php", {
        method: "POST",
        body: formEncode(requestObject)
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })
}

function then(response){
    console.log(JSON.stringify(response));
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

