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
                        price: obj[x].price
                    
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
exports.checkoutTap = function(){
    var array = getSelectedItems();
    console.log(array);
}
/*exports.fabTap = function(){
    var array = getSelectedItems();
    //console.log()
}*/