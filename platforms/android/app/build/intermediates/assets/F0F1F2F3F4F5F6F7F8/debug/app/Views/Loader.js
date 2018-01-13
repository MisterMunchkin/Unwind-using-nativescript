var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

var loader = new LoadingIndicator();

var options = {
    message: "Loading...",
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        cancelListener: function (dialog) { console.log("Loading cancelled") },
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
}

