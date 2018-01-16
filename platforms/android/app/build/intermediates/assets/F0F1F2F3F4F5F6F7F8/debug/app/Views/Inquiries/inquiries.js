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
    topmost.navigate("Views/Inquiries/addInquiries/addinquiries");
}
/*
exports.done = function(){
    var reviewText = page.getViewById("reviewText");
    console.log("text: " + reviewText.text);
    console.log("star: " + starReview);
}

exports.star1 = function(){
    starReview = 1;
    var imageSet = page.bindingContext.starImage1;
    console.log("imageSet: " + imageSet);
    if(imageSet.indexOf("empty") > -1){
        console.log("turning filled");
        page.bindingContext.starImage1 = "~/images/inquiries/star.png"
        page.bindingContext.test = "shit";
        console.log("bindingContext: " + JSON.stringify(page.bindingContext));
    }else{
        console.log("turning empty")
        page.bindingContext.starImage1 = "~/images/inquiries/Star_empty.png";
        page.bindingContext.starImage2 = "~/images/inquiries/Star_empty.png";
        page.bindingContext.starImage3 = "~/images/inquiries/Star_empty.png";
        page.bindingContext.starImage4 = "~/images/inquiries/Star_empty.png";
        page.bindingContext.starImage5 = "~/images/inquiries/Star_empty.png";
        page.bindingContext.test = "fuck";
        console.log("bindingContext: " + JSON.stringify(page.bindingContext));
    }
}
exports.star2 = function(){
    starReview = 2;
}
exports.star3 = function(){
    starReview = 3;
}
exports.star4 = function(){
    starReview = 4;
}
exports.star5 = function(){
    starReview = 5;
}*/
exports.longpressed = function(){
    alert({ title: "Inquries", message: "long pressed", okButtonText: "Close" });
}
exports.userTap = function(){
    alert({ title: "Inquries", message: "tapped", okButtonText: "Close" });
}