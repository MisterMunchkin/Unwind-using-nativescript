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
<<<<<<< HEAD
            for(var x = 0;x < limit;x++){
=======
            var starRate = "res://";
            for(var x = 0;x < limit;x++){

                switch(data[x].rate){
                    case "1":
                    starRate += "one_star";
                    break;

                    case "2":
                    starRate += "two_star";
                    break;
                    
                    case "3":
                    starRate += "three_star";
                    break;
                    
                    case "4":
                    starRate += "four_star";
                    break;
                    
                    case "5":
                    starRate += "five_star";
                    break; 
                }

>>>>>>> New-Default-Development
                items.push(
                    {
                        id: data[x].id,
                        username: data[x].username,
<<<<<<< HEAD
                        rate: data[x].rate,
                        review: data[x].review,
                        user_Id: data[x].user_id
                    }
                )
=======
                        itemImage: starRate,
                        review: data[x].review,
                        user_Id: data[x].user_id,
                        rate: data[x].rate
                    }
                )
                starRate = "res://";
>>>>>>> New-Default-Development
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
<<<<<<< HEAD
=======
exports.backEvent = function(args){
    console.log("<<<<<< redirecting to tabs module >>>>>>");
    args.cancel = true;
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
>>>>>>> New-Default-Development
exports.longpressed = function(){
    alert({ title: "Inquries", message: "long pressed", okButtonText: "Close" });
}
exports.userTap = function(){
    alert({ title: "Inquries", message: "tapped", okButtonText: "Close" });
}