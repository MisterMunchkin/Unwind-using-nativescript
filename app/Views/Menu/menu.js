var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items;
var pageData = new Observable();


exports.onloaded = function(args){
    page = args.object

    page.bindingContext = pageData;

    var obj;
    items = new ObservableArray([]);
    
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/loadMenuData.php", {
        
    }).then(function (response) {
        obj = response._bodyText;
        console.log(obj);

        if(isData(obj) > 0){

            items = new ObservableArray([]);
            obj = JSON.parse(obj);
            //console.log("inside then function: " + obj);
            var limit = obj.length;
            console.log(obj);
            for(var x = 0; x < limit;x++){
                items.push(
                    {
                        name: obj[x].name,
                        description: obj[x].description,
                        price: obj[x].price,
                        tapped: 0
                    
                    }

                );
                console.log(obj[x].name);
            }
            pageData.set("items", items);
        }else{
            console.log("put viible no data confirmation here");
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    })

};
function isData(obj){
    return (obj == "no data")? 0: 1;
}

var foodArray = new Array();
/*exports.selectedItems = function(args){
    var tappedView = args.view,
    tappedItem = tappedView.bindingContext;
    console.log(tappedItem);
    foodArray.push(
        tappedItem
    );
}
*/
exports.itemTap = function(args){
    var tappedView = args.view;
    var tappedItem = tappedView.bindingContext;

    if(tappedItem.tapped == 0){
        console.log("tapped");
        tappedItem.tapped = 1;
        foodArray.push(tappedItem);
        console.log(JSON.stringify(foodArray));
    }else{
        console.log("untapped");
        tappedItem.tapped = 0;
        var limit = foodArray.length;
        for(var x = 0;x < limit && tappedItem.name != foodArray[x].name;x++){}
        if(tappedItem.name == foodArray[x].name){
            foodArray.splice(x, 1);
        }
    }
}
exports.fabTap = function(args){
  
    //var array = listview.getSelectedItems();
    console.log(JSON.stringify(foodArray));
}