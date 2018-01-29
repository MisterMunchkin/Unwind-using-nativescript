var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

//var roompageData = new Observable();
var roomItems;

//var foodpageData = new Observable();
var foodItems;
var serviceItems;
var loadingBar;

exports.onloaded = function (args) {
    page = args.object

    //page.bindingContext = new Array();
   // page.bindingContext[0] = roompageData;

    loadingBar = page.getViewById("loadingBar");
    var wholeBill = page.getViewById("wholeBill");

    var requestObject = {check_in_id: global.loginCred[2]};
    wholeBill.visibility = "collapse";
    loadingBar.start();
    loadingBar.visibility = "visible";
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getRoomsFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
       // roomItems = new ObservableArray([]);
        var grandTotalRooms = 0;
        roomItems = [];
        var phpResponse = response._bodyText;
        console.log("rooms: " + phpResponse);
        phpResponse = JSON.parse(phpResponse);
        var limit = phpResponse.length;

        for(var x = 0;x < limit;x++){
            roomItems.push(
                {
                    roomNumber: phpResponse[x].roomNumber,
                    roomName: phpResponse[x].RoomName,
                    roomDescription: phpResponse[x].RoomDescription,
                    roomPrice: phpResponse[x].RoomPrice,
                    currency: "PHP"
                }
            )
            grandTotalRooms += parseInt(phpResponse[x].RoomPrice);
        }
        page.getViewById("grandTotalRoom").text = " PHP " + grandTotalRooms;
        
        var roomlistview = page.getViewById("roomlistview");
        roomlistview.items = roomItems;
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
        alert({message: "An error occured while finding your rooms reserved, please try again later", okButtonText: "Okay"});
    })

  //  page.bindingContext[1] = foodpageData;
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/getAllOrdersFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
        //foodItems = new ObservableArray([]);
        var grandTotalFood = 0;
        foodItems = [];

        var phpResponse = response._bodyText;
        console.log("food orders: " + phpResponse);
        phpResponse = JSON.parse(phpResponse);
        var limit = phpResponse.length;
       

        for(var x = 0;x < limit;x++){
            var niceDateFoodOrdered = niceDates(phpResponse[x].timestamp_ordered);

            foodItems.push(
                {
                    food_order_id: phpResponse[x].food_order_id,
                    foodTotal: phpResponse[x].price,
                    dateFoodOrdered: niceDateFoodOrdered,
                    currency: "PHP"

                }
            )
            grandTotalFood += parseInt(phpResponse[x].price);
            console.log("food items: " + phpResponse[x].food_order_id);
        }
     
        page.getViewById("grandTotalFood").text = " PHP " + grandTotalFood;
        var foodlistview = page.getViewById("foodlistview");
        
        foodlistview.items = foodItems;
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
        alert({message: "An error occured while finding your food orders, please try again later", okButtonText: "Okay"});
    })

    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getServiceRequestFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
        //foodItems = new ObservableArray([]);
        serviceItems = [];

        var phpResponse = response._bodyText;
        console.log("service request: " + phpResponse);
        phpResponse = JSON.parse(phpResponse);
        var limit = phpResponse.length;

        for(var x = 0;x < limit;x++){
            var niceDateServiceRequested = niceDates(phpResponse[x].service_request_date);

            serviceItems.push(
                {
                    service_request_date: niceDateServiceRequested,
                    service_name: phpResponse[x].service_name,
                    service_type: phpResponse[x].service_type,
                    service_id: phpResponse[x].service_id

                }
            )
            
            console.log("service items: " + phpResponse[x].service_name);
        }
        //foodpageData.set("foodItems", foodItems);
        var servicelistview = page.getViewById("servicelistview");
       
        loadingBar.visibility = "collapse";
        loadingBar.stop();
        wholeBill.visibility = "visible";
        servicelistview.items = serviceItems;
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
        loadingBar.visibility = "collapse";
        loadingBar.stop();
        wholeBill.visibility = "visible";
        alert({message: "An error occured while finding your service request, please try again later", okButtonText: "Okay"});
    })


    var GrandTotal = page.getViewById("grandTotal");
    GrandTotal.text = "PHP " + global.checkOutGrandTotal + ".00";
};
function niceDates(date){
    var MonthNames = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];

    var newDateIndex = new Date(date);

    var newDate = MonthNames[newDateIndex.getMonth()] + " " + newDateIndex.getDate() + ", " + newDateIndex.getFullYear();

    return newDate;
}
exports.onNavBtnTap = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("tabs/tabs-page");
}
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}