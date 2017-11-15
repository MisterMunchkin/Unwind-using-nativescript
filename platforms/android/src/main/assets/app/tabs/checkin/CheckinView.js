var page;
var frameModule = require("ui/frame");

const HomeViewModel = require("./checkin-view-model");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var cnt = 0;
//var page;
var items = new ObservableArray([]);
var pageData = new Observable();

exports.onLoaded = function(args) {
    const component = args.object;
    component.bindingContext = new HomeViewModel();

    //page = args.object;
    //page.bindingContext = pageData;
    component.bindingContext = pageData;

    if(cnt == 0){
        cnt++;
        items.push(
            {
                pageName: "Services",
                pageDesc: "list of services",
                itemImage: ""
            },
            {
                pageName: "Menu",
                pageDesc: "list of food of the menu",
                itemImage: ""
            },
            {
                pageName: "Bill",
                pageDesc: "bill",
                itemImage: ""
            },
            {
                pageName: "Inquiries",
                pageDesc: "help center",
                itemImage: ""
            }
        )

        pageData.set("items", items);
    }
}

exports.onItemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;


    switch(tappedItem.pageName){
        case "Menu": 
            goToMenu()
            break;
        case "Services": 
            goToServices()
            break;
        case "Inquiries": 
            goToInquiries()
            break;
        case "Bill": 
            goToBill()
            break;
    }
}

function goToMenu(){
    console.log("menu");
    
    var topmost = frameModule.topmost();
    topmost.navigate("Views/Menu/menu");
}

function goToServices(){
    console.log("serivces");
}
function goToInquiries(){
    console.log("inquiries");
}
function goToBill(){
    console.log("bill");
}