var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");


exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< add inquiries >>>>>>")
    
    
}
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
   topmost.navigate("Views/Inquiries/inquiries");
}
exports.backEvent = function (args) {

    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Inquiries/inquiries");
}
