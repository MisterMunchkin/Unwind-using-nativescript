var page;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var items;
var pageData = new Observable();

var items = new ObservableArray([]);
var pageData = new Observable();

exports.onloaded = function(args){
    page = args.object

    page.bindingContext = pageData;

    var obj;
    items = new ObservableArray([]);
    
    fetchModule.fetch("https://unwindv2.000webhostapp.com/food/loadMenuData.php", {
        
    }).then(function (response) {
        obj = response._bodyText;
        obj = JSON.parse(obj);
        //console.log("inside then function: " + obj);
        var limit = obj.length;
        console.log(obj);
        for(var x = 0; x < limit;x++){
            items.push(
                {
                    name: obj[x].name,
                    description: obj[x].description,
                    price: obj[x].price
                   
                }

            );
        }
        pageData.set("items", items);

    }, function (error) {
        console.log(JSON.stringify(error));
    })

};