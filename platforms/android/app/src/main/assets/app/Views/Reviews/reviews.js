var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var pageData = new Observable();
var items;

exports.onloaded = function (args) {
    page = args.object

    page.bindingContext = pageData;
    items = new ObservableArray([]);
//error HERE>>>>>>>>>>>>>>>>>>>>>>
    fetchModule.fetch("https://unwindv2.000webhostapp.com/reviews/loadReviews.php", {

    }).then(function (response) {
        var phpResponse = response._bodyText;
        console.log("feedback: " + phpResponse);
        
        var data = JSON.parse(phpResponse);
        var limit = data.length;
        console.log("limit: " + limit);
        for(var x = 0;x < limit;x++){
            items.push(
                {
                    id: data[x].id,
                    username: data[x].username,
                    rate: data[x].rate,
                    review: data[x].review
                }
            )
            //console.log("id: " + data[x].id);
        }
        pageData.set("items", items);
      

    }, function (error) {
        console.log(JSON.stringify(error));
    })

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