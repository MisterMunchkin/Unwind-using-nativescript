var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items;
var pageData = new Observable();
var listview;

exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< add inquiries >>>>>>")
    listview = page.getViewById("listview");
    page.bindingContext = pageData;

    items = new ObservableArray([]);

    items.push(
        {
            starnum: 1,
            starImage: "~/images/inquiries/Star_empty.png"
        },
        {
            starnum: 2,
            starImage: "~/images/inquiries/Star_empty.png"
        },
        {
            starnum: 3,
            starImage: "~/images/inquiries/Star_empty.png"
        },
        {
            starnum: 4,
            starImage: "~/images/inquiries/Star_empty.png"
        },
        {
            starnum: 5,
            starImage: "~/images/inquiries/Star_empty.png"
        }
    )

    pageData.set("items", items);
    
}
exports.starTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    var starnum = tappedItem.starnum;

    for(var x = 0; x < 5;x++){

        if(x < starnum){
            console.log("filled");
            items.getItem(x).starImage = "~/images/inquiries/star.png";
        }else{
            console.log("unfilled");
            items.getItem(x).starImage = "~/images/inquiries/Star_empty.png";
        }
    }
    listview.refresh();
   // console.log("items: " + JSON.stringify(items.getItem(1)));
   /* switch(starnum){
        case 1:
        if(tappedItem.starImage.indexOf("empty") > -1){
            console.log("<<<<turning to full>>>>");
            tappedItem.starImage = "~/images/inquiries/star.png";
        }else{
            console.log("<<<<turning to empty>>>>");
            tappedItem.starImage = "~/images/inquiries/Star_empty.png";
        }
        listview.refresh(); 
        break;
        case 2:
        if(tappedItem.starImage.indexOf("empty") > -1){
            console.log("<<<<turning to full>>>>");
            tappedItem.starImage = "~/images/inquiries/star.png";
          //  items[0].starImage = "~/images/inquiries/star.png";
            for(var x = starnum;x > 0;x--){
                items.getItem(x).starImage = "~/images/inquiries/star.png";
            }
            items.getItem()
        }else{
            console.log("<<<<turning to empty>>>>");
            tappedItem.starImage = "~/images/inquiries/Star_empty.png";
        }
        listview.refresh();
        break;
    }*/


   /* if(tappedItem.starImage.indexOf("empty") > -1){
        console.log("<<<<turning to full>>>>");
        tappedItem.starImage = "~/images/inquiries/star.png";
    }else{
        console.log("<<<<turning to empty>>>>");
        tappedItem.starImage = "~/images/inquiries/Star_empty.png";
    }
    listview.refresh();   */
}
exports.submit = function(){
    console.log("submit pressed");
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
