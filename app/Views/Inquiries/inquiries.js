var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");


exports.onloaded = function (args) {
    page = args.object

    var review = [
        {
            id: 1,
            username: "Shibal",
            review: "this is the first review",
            rate: 5,
            datetime: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
    ]

    page.bindingContext = {
        reviews: review
    }
};

exports.longpressed = function(){
    alert({ title: "Inquries", message: "long pressed", okButtonText: "Close" });
}
exports.userTap = function(){
    alert({ title: "Inquries", message: "tapped", okButtonText: "Close" });
}