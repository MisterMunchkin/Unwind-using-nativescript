var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var pageData = new Observable();
var items = new ObservableArray([]);
var loadingBar;

exports.onloaded = function (args) {
    page = args.object

    page.bindingContext = pageData;
    
    loadingBar = page.getViewById("loadingBar");
    
    if(items.length == 0){
        loadingBar.start();
        loadingBar.visibility = "visible";
        
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
                        review: data[x].review,
                        user_Id: data[x].user_id
                    }
                )
                //console.log("id: " + data[x].id);
            }
            loadingBar.visibility = "collapse";
            loadingBar.stop();
            pageData.set("items", items);
            

        }, function (error) {
            console.log(JSON.stringify(error));
        })
    }else{
        loadingBar.visibility = "collapse";
        loadingBar.stop();
    }
};

exports.fabTap = function(){
    console.log("<<<<<redirecting to write feedback module >>>>>");

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Reviews/addReviews/addreviews");
}
exports.onNavBtnTap = function(){
    console.log("<<<<<redirecting to tabs module >>>>>");

    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
exports.backEvent = function(args){
    console.log("<<<<<< redirecting to tabs module >>>>>>");
    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
exports.longpressed = function(){
    alert({ title: "Inquries", message: "long pressed", okButtonText: "Close" });
}
exports.userTap = function(){
    alert({ title: "Inquries", message: "tapped", okButtonText: "Close" });
}