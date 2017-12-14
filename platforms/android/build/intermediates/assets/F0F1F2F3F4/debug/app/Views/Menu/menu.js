var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;


var items = new ObservableArray([]);
var pageData = new Observable();

exports.onloaded = function(args){
    page = args.object

    page.bindingContext = pageData;
    var obj;

    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/loadMenuData.php", {

    }).then(function(response){
        obj = response._bodyText;
        console.log(obj);
        obj = JSON.parse(obj);

        var limit = obj.length;

        for(var x = 0; x < limit;x++){
            items.push(
                {
                    name:  obj[x].name,
                    description:  obj[x].description,
                    price:  obj[x].price
                }
            )
        }
        pageData.set("items", items);

    }, function(error){
        console.log(error);
    })
};