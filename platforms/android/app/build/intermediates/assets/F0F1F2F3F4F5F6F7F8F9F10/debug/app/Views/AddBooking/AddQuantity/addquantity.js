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
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
exports.nextTap = function(){
    adultQty = view.getViewById(page, "adultQty").text;
    childQty = view.getViewById(page, "childQty").text;

    var adultVal = view.getViewById(page, "adultQty").value;
    var childVal = view.getViewById(page, "childQty").value;
    console.log("check in date: " + pageDataContext.check_in_date);
    console.log("check out date: " + pageDataContext.check_out_date);
    console.log("adultQty: " + adultQty);
    console.log("childQty: " + childQty);
    
  //  if(adultQty != "" && childQty != ""){
        if(isNaN(adultQty) == false && isNaN(childQty) == false){
            if(adultQty != "0"){
                var navigationOptions = {
                    moduleName: "Views/AddBooking/AddRooms/addrooms",
                    context: {
                        check_in_date: pageDataContext.check_in_date,
                        check_out_date: pageDataContext.check_out_date,
                        numAdult: parseInt(adultQty),
                        numChild: parseInt(childQty)
                    }
                }
                console.log("check_in_date: " + pageDataContext.check_in_date);
                console.log("check_out_date: "+ pageDataContext.check_out_date);

                var topmost = frameModule.topmost();
                topmost.navigate(navigationOptions);
            }else{
                console.log("need atleast (1) adult");
                alert({ message: "You need atleast 1 adult", okButtonText: "Close" });
            }
        }else{
            console.log("do not enter non numbers");
            alert({ message: "do not enter non numbers", okButtonText: "Close" });
        }
    //}else{
   //     console.log("do not leave any blank");
    //    alert({ message: "do not leave any blank", okButtonText: "Close" });
   // }
}
/*
function numberValidation(val){
    var re = ^([1-9][0-9]{0,2}|1000)$
}*/