var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var pageDataContext;
var items;
var pageData = new Observable();
var gender = "";


exports.onLoaded = function (args) { //exports is standard for both nativescript and node.js. module can add properties and methods to configure its external API
    page = args.object;
    console.log("<<<<<< gender page >>>>>>");

    page.bindingContext = pageData;
    pageDataContext = page.navigationContext;

    items = new ObservableArray([]);

    items.push(
        {
            GenderName: "Male"
        },
        {
            GenderName: "Female"
        }
    )

    pageData.set("items", items);
};

/*exports.onItemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    gender = tappedItem.GenderName;
}*/
exports.itemSelected = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    //gender = tappedItem.GenderName;
    console.log("-------item selected--------");
    console.log("item: " + tappedItem.GenderName);
    gender = tappedItem.GenderName;
}
exports.itemDeselected = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    console.log("---------item deselected----------");
    console.log("item: " + tappedItem.GenderName);
    gender = "";
}
exports.nextTap = function(){

    if(gender != ""){
        console.log("first name: " + pageDataContext.firstName);
        console.log("last name: " + pageDataContext.lastName);
        console.log("middle initial: " + pageDataContext.MI);
        console.log("birthdate: " + pageDataContext.birthdate);
        console.log("contact number: " + pageDataContext.contact_no);
        console.log("gender: " + gender);
        var navigationOptions = {
            moduleName: "Views/register/password/password",
            context: {
                firstName: pageDataContext.firstName,
                lastName: pageDataContext.lastName,
                MI: pageDataContext.MI,
                birthdate: pageDataContext.birthdate,
                contact_no: pageDataContext.contact_no,
                gender: gender
            }
        }

        var topmost = frameModule.topmost();
        topmost.navigate(navigationOptions);
    }else{
        console.log("Enter a gender");
    }
}
