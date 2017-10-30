var page;
var email;
var password;
var Observable = require("data/observable");
var Sqlite = require("nativescript-sqlite");


exports.loaded = function(args){
    page = args.object;
  
}

exports.AccountCreate = function(){
    email = page.getViewById("email");
    password = page.getViewById("password");

    
}


