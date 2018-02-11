var page;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var roomContext;

var listview;

var items;
var pageData = new Observable();
var grandTotal;

exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< in room cart page >>>>>>")
    
    var pageDataContext = page.navigationContext;
    roomContext = {
        check_in_date: pageDataContext.check_in_date,
        check_out_date: pageDataContext.check_out_date,
        numAdult: pageDataContext.numAdult,
        numChild: pageDataContext.numChild
  
    };
    console.log("roomContext...");
    console.log("   check_in_date: " + roomContext.check_in_date);
    console.log("   check_out_date: " + roomContext.check_out_date);
    console.log("   numAdult: " + roomContext.numAdult);
    console.log("   numChild: " + roomContext.numChild);
    listview = page.getViewById("listview");

    page.bindingContext = pageData;
    items = new ObservableArray([]);
    var limit = global.roomOrdered.length;

    grandTotal = 0;
    if(limit >= 1){
        console.log("loading rooms ordered...");
        
        for(var x = 0;x < limit;x++){
            
            grandTotal += (global.roomOrdered[x].roomTypePrice * global.roomOrdered[x].quantity);

            console.log("item src: " + global.roomOrdered[x].itemImage);
            items.push(
                {
                    roomTypeName: global.roomOrdered[x].roomTypeName,
                    roomTypePrice: global.roomOrdered[x].roomTypePrice,
                    quantity: global.roomOrdered[x].quantity,
                    itemImage: global.roomOrdered[x].itemImage,
                    currency: "PHP"
                }
            )
            console.log("room Types: " + global.roomOrdered[x].roomTypeName);
        }
        
        pageData.set("items", items);
    }else{
        console.log("No Data");
        
        listview.visibility = "collapse";
        var noData = page.getViewById("noData");
        noData.class = "page-placeholder";
    }
    page.getViewById("grandTotal").text = grandTotal;

}
exports.remove = function(args){
    console.log("remove tapped");

    var btn = args.object;
    var room = btn.bindingContext;

    console.log("attempting to remove: " + room.roomTypeName);

    var limit = global.roomOrdered.length;

    for(var x = 0;x < limit && room.roomTypeName != global.roomOrdered[x].roomTypeName;x++){}
    if(room.roomTypeName == global.roomOrdered[x].roomTypeName){
        if(global.roomOrdered[x].quantity > 1){
            global.roomOrdered[x].quantity--;
            items.getItem(x).quantity--;
            
            listview.refresh();
        }else{
            items.splice(x, 1);
            global.roomOrdered.splice(x,1);
        }
        grandTotal = grandTotal - room.roomTypePrice;
        page.getViewById("grandTotal").text = grandTotal;
    }else{
        console.log("can't find room, wtf");
    }

}
exports.onNavBtnTap = function(){

    var navigationOptions = {
        moduleName: "Views/AddBooking/AddRooms/addrooms",
        context: {
            check_in_date: roomContext.check_in_date,
            check_out_date: roomContext.check_out_date,
            numAdult: roomContext.numAdult,
            numChild: roomContext.numChild
        }
    }

    var topmost = frameModule.topmost();
   topmost.navigate(navigationOptions);
}
exports.backEvent = function (args) {

    args.cancel = true;

    var navigationOptions = {
        moduleName: "Views/AddBooking/AddRooms/addrooms",
        context: {
            check_in_date: roomContext.check_in_date,
            check_out_date: roomContext.check_out_date,
            numAdult: roomContext.numAdult,
            numChild: roomContext.numChild
        }
    }

    var topmost = frameModule.topmost();
   topmost.navigate(navigationOptions);
}
