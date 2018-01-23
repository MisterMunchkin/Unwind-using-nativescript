var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

//var roompageData = new Observable();
var roomItems;

//var foodpageData = new Observable();
var foodItems;

exports.onloaded = function (args) {
    page = args.object

    //page.bindingContext = new Array();
   // page.bindingContext[0] = roompageData;


    var requestObject = {check_in_id: global.loginCred[2]};
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getRoomsFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
       // roomItems = new ObservableArray([]);
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
        }
        //roompageData.set("roomItems", roomItems);
        var roomlistview = page.getViewById("roomlistview");
        roomlistview.items = roomItems;
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
    })

  //  page.bindingContext[1] = foodpageData;
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/getAllOrdersFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
        //foodItems = new ObservableArray([]);
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
            console.log("food items: " + phpResponse[x].food_order_id);
        }
        //foodpageData.set("foodItems", foodItems);
        var foodlistview = page.getViewById("foodlistview");
        foodlistview.items = foodItems;
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
    })

    var GrandTotal = page.getViewById("grandTotal");
    GrandTotal.text = "PHP " + global.checkOutGrandTotal;
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