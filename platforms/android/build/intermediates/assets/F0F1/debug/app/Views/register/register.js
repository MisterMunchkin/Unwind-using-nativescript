var page;
var email;
var password;

exports.loaded = function(args){
    page = args.object;
  
}

exports.AccountCreate = function(){
    email = page.getViewById("email");
    password = page.getViewById("password");

    var result;

    http.request({
        url: "../../Models/register/register.php",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({email: email, password: password})
    }).then(function (response) {
        result = response.content.toJSON(); //no errors, not sending back data
        console.log(result);
    }, function (e) {
        console.log("Error occured" + e);
    });
    console.log("passed");
}