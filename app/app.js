require("./bundle-config");
const application = require("application");

application.start({ moduleName: "./tabs/tabs-page" });
//application.start({ moduleName: "Views/login/login" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
