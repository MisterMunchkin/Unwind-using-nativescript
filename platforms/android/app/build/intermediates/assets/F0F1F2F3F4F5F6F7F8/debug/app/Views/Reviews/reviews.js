var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

var starReview = 0;
var reviewNew = [];
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
//error HERE>>>>>>>>>>>>>>>>>>>>>>
   /* fetchModule.fetch("https://unwindv2.000webhostapp.com/reviews/loadReviews.php", {

    }).then(function (response) {
        var phpResponse = response._bodyText;
        console.log("feedback: " + phpResponse);
       // phpResponse = JSON.parse(phpResponse);
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

    }, function (error) {
        console.log(JSON.stringify(error));
    })*/

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