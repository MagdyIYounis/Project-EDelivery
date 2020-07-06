'use strict';
var request = require('request');
module.exports = function (Phonenumber) {
    Phonenumber.observe('after save', function (ctx, next) {
        var massage = "E-Delivery\n"+
        "fb.com/EDelivery2020\n" +
        "كود العميل : "+ ctx.instance["customerId"] ;
        var res = encodeURI('https://smsmisr.com/api/webapi/?username=######&password=######&language=2&sender=D Services&mobile=2'+ctx.instance["Phone_Number"]+'&message='+massage); 
        var options = {
            'method': 'POST',
            'url': res,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });

        next();
    });
};
