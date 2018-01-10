var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");

var roomContext;


exports.onloaded = function (args) {
    page = args.object

    console.log("<<<<<< menu_detail page >>>>>>")
    var pageDataContext = page.navigationContext;
    roomContext = {
        roomTypeID: pageDataContext.roomTypeID,
        roomTypeName: pageDataContext.roomTypeName,
        roomTypePrice: pageDataContext.roomTypePrice,
        roomTypeDescription: pageDataContext.roomTypeDescription,
        roomTypeCount: pageDataContext.roomTypeCount,
        itemImage: "",
        bookingDetails: pageDataContext.bookingDetails
    };
    console.log(roomContext.roomTypeName);
    page.bindingContext = {
        roomTypeName: roomContext.roomTypeName
    }
    
}
exports.addToCartTap = function(){

    var roomQty = view.getViewById(page, "roomQty").text;
   

    if(roomQty != ""){
        console.log(roomQty);
        roomItem = {
            roomTypeID: roomContext.roomTypeID,
            quantity: parseInt(roomQty),
            roomTypeName: roomContext.roomTypeName,
            itemImage: roomContext.itemImage,
            roomTypePrice: roomContext.roomTypePrice
        }
        global.roomOrdered.push(roomItem);

        var navigationOptions = {
            moduleName: "Views/AddBooking/AddRooms/addrooms",
            context: {
                check_in_date: roomContext.bookingDetails.check_in_date,
                check_out_date: roomContext.bookingDetails.check_out_date,
                numAdult: roomContext.bookingDetails.numAdult,
                numChild: roomContext.bookingDetails.numChild
            }
        }

        var topmost = frameModule.topmost();
        topmost.navigate(navigationOptions);
    }else{
        console.log("please enter item quantity and remarks!");
        //add UI for this soon
    }
}
exports.onNavBtnTap = function(){

    var navigationOptions = {
        moduleName: "Views/AddBooking/AddRooms/addrooms",
        context: {
            check_in_date: roomContext.bookingDetails.check_in_date,
            check_out_date: roomContext.bookingDetails.check_out_date,
            numAdult: roomContext.bookingDetails.numAdult,
            numChild: roomContext.bookingDetails.numChild
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
            check_in_date: roomContext.bookingDetails.check_in_date,
            check_out_date: roomContext.bookingDetails.check_out_date,
            numAdult: roomContext.bookingDetails.numAdult,
            numChild: roomContext.bookingDetails.numChild
        }
    }

    var topmost = frameModule.topmost();
   topmost.navigate(navigationOptions);
}

