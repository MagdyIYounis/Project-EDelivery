'use strict';
var request = require('request');
module.exports = function (Customer) {
    Customer.observe('before save', (ctx, next) => {
        var set = ()=>{
            var ID = Math.floor(Math.random() * 10001);
        
        var options = {
            'method': 'GET',
            'url': 'http://localhost:3000/api/Customers/' + ID + '/exists',
            'headers': {
                'Content-Type': ['application/json']
            }
        };
        request(options, async function  (error, response) {
            if (error) throw new Error(error);
             if(JSON.parse(response.body)["exists"]){
                set();
             }else{
                ctx.instance["Cust_ID"] = ID;
                next();
             }
        });
        }
        set();
    });

};
