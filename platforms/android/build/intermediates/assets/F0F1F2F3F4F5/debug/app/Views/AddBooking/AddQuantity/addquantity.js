var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var view = require("ui/core/view");

var pageDataContext;
var adultQty;
var childQty;

exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< add quantity page >>>>>>");

    pageDataContext = page.navigationContext;

};

exports.nextTap = function(){
    adultQty = view.getViewById(page, "adultQty").text;
    childQty = view.getViewById(page, "childQty").text;

    var adultVal = view.getViewById(page, "adultQty").value;
    var childVal = view.getViewById(page, "childQty").value;
    console.log("adultQty: " + adultQty);
    console.log("childQty: " + childQty);
    
    if(adultQty != "" && childQty != ""){
        if(adultQty != "0"){
            var navigationOptions = {
                moduleName: "Views/AddBooking/AddRooms/addrooms",
                context: {
                    checkin_date: pageDataContext.checkin_date,
                    checkout_date: pageDataContext.checkout_date,
                    adultQty: parseInt(adultQty),
                    childQty: parseInt(childQty)
                }
            }
            console.log("check_in_date: " + pageDataContext.checkin_date);
            console.log("check_out_date: "+ pageDataContext.checkout_date);

            var topmost = frameModule.topmost();
            topmost.navigate(navigationOptions);
        }else{
            console.log("need atleast (1) adult");
        }
    }else{
        console.log("do not leave any blank");
    }
}