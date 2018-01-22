var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var roompageData = new Observable();
var roomItems;


exports.onloaded = function (args) {
    page = args.object

    page.bindingContext = roompageData;

    roomItems = new ObservableArray([]);

    var requestObject = {check_in_id: global.loginCred[2]};
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getRoomsFromCheckIn.php", {
        method: "POST",
        body: formEncode(requestObject)

    }).then(function (response) {
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
                    roomPrice: phpResponse[x].RoomPrice

                }
            )
        }
        roompageData.set("roomItems", roomItems);
    }, function (error) {
        console.log("ERROR");
        console.log(JSON.stringify(error));
    })

    
};
function formEncode(obj) { //to convert urlencoded form data to JSON
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}