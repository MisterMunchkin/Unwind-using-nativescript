var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var starReview = 0;
var review;
exports.onloaded = function (args) {
    page = args.object

     review = [
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
exports.fabTap = function(){
    console.log("<<<<<redirecting to write feedback module >>>>>");

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Reviews/addReviews/addreviews");
}

exports.longpressed = function(){
    alert({ title: "Inquries", message: "long pressed", okButtonText: "Close" });
}
exports.userTap = function(){
    alert({ title: "Inquries", message: "tapped", okButtonText: "Close" });
}