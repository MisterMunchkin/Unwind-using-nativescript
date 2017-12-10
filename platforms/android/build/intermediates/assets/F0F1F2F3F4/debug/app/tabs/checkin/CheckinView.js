var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");

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
    //query in loading so that we can see if there is an accepted
    //also need security to check if theres already an active checkin
    //use a switch for active and inactive methods
    component.bindingContext = pageData;


    fetchModule.fetch("https://unwindv2.000webhostapp.com/checkin/checkinSecurity.php", {
    }).then(function (response) {
        then(response);
    }, function (error) {
        console.log(JSON.stringify(error));
    })

   
}

function then(response){
    var phpResponse = response._bodyText;

   
    console.log(phpResponse);
   // console.log(response);
    if(phpResponse == "no data"){
        inactive();
        
    }else{
        active();
    }

    
}

function active(){
    console.log("checked in");

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
function inactive(){
    console.log("not checked in");

    //add image for locked tab
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

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Services/services");

}
function goToInquiries(){
    console.log("inquiries");

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Inquiries/inquiries");
}
function goToBill(){
    console.log("bill");

    var topmost = frameModule.topmost();
    topmost.navigate("Views/Bill/bill");
}

