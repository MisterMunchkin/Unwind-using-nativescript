var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");


exports.onloaded = function (args) {
    page = args.object

    var pageDataContext = page.navigationContext;

    console.log(pageDataContext.resDate);

    page.getViewById("resDateLabel").text = pageDataContext.resDate;
};

exports.cancelButton = function(args){

}