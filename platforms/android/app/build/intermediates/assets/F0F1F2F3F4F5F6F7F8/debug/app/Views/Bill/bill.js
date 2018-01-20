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

    
    fetchModule.fetch("https://unwindv2.000webhostapp.com/services/getRoomsFromCheckIn.php", {
        method: "POST",
        body: global.loginCred[2]

    }).then(function (response) {
        var phpResponse = response._bodyText;
        
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