var page;
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var roomContext;

var items;
var pageData = new Observable();

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

    page.bindingContext = pageData;
    items = new ObservableArray([]);
    var limit = global.roomOrdered.length;

    for(var x = 0;x < limit;x++){
        items.push(
            {
                roomTypeName: global.roomOrdered[x].roomTypeName,
                roomTypePrice: global.roomOrdered[x].roomTypePrice,
                quantity: global.roomOrdered[x].quantity,
                itemImage: global.roomOrdered[x].itemImage
            }
        )
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
