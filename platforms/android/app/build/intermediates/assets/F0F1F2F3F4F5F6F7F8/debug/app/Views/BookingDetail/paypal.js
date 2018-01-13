// 
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var Observable = require("data/observable").Observable;
var PayPal = require("nativescript-paypal");

 var vm = new Observable();

 vm.init = function(){
     PayPal.addLogger(function(msg){
         console.log('[nativescript-paypal] ' + msg);
     });

     //init paypal
     PayPal.init({
         clientId: '1',
         environment: 0
     });
 }

 vm.startPayPalCheckout = function(){
     var payment = PayPal.newPayment()
             .setDescription("check out of hotel")
             .setAmount(global.checkOutGrandTotal)
             .setCurrency('PHP');

     payment.start(function(result){
         var logPrefix = '[payment result] ';
         console.log(logPrefix + 'code: ' + result.code);

         switch(result.code){
             case 0:
                 console.log(logPrefix + 'Success: ' + result.key);
                 break;
             case 1: 
                 console.log(logPrefix + 'Operation was cancelled.');
                 break;
             case -1:
                 console.log(logPrefix + 'Checkout failed!');
                 break;
             case -2:
                 console.log(logPrefix + 'Unhandled exception!');
                 break;

             default:
                 console.log(logPrefix + 'UNKNOWN: ' + result.code);
                 break;
         }
     })
 }