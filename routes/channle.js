var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var app = require('../app');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json-rpc',
    'Accept':'application/json-rpc'
}



router.get('/', function(req, res, next) {
  res.render('channle',{
    address:'0xf4cc4154a4987f8784064468c3c6b21f',
    date:'2018-01-22',
    deposit:'20TNC',
    time:'1',
    state:'CLOSED',
    channle_info:{channel_name:'f8784064468c3c6b21f0d0cdd64'}
  });
});

router.post('/', function(req, res) {
  var options = {
    url: "http://106.15.91.150:20552",
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'registchannle',
      params: ['0xf4cc4154a4987f8784064468c3c6b21f',req.body.address,req.body.assets,req.body.deposit,req.body.time], 
      id: 1
    })
  }
	request(options, function (error, response, body) {
      console.log("status:"+res.status);
	    if (!error) {
        console.log(options);
        console.log(body);
        body = JSON.parse(body);
        channle_info = body;
        res.render('channle',{
          channle_info:{channel_name:body.result.channel_name},
          date:'2018-01-22',
          address:req.body.address,
          deposit:req.body.deposit+req.body.assets,
          time:req.body.time,
          state:'OPEN'
        });
        var options1 = {
            url: "http://106.15.91.150:20552",
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'sendrawtransaction',
              params: ['0xf4cc4154a4987f8784064468c3c6b21f',body.result.channel_name,'9wFwhkLmZ'],
              id: 1
            })
          }
          request(options1, function (error, response, body) {
              console.log(options1);
              console.log(body);
            })
	    } else {
        console.log(options);
	      console.log("Error:" + error);
	    }
	})
});

// router.post('/info', function(req, res) {
//   var options = {
//     url: "http://106.15.91.150:20552",
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify({
//       jsonrpc: '2.0',
//       method: 'getchannelstate',
//       params: [req.body.address], 
//       id: 1
//     })
//   }
//   request(options, function (error, response, body) {
//       if (!error) {
//         console.log(options);
//         console.log(body);
//         body = JSON.parse(body);
//         // res.render('channle',{
//         //   address:body.result.channel_name,
//         //   date:'2018-01-22',
//         //   deposit:'Deposit:'+req.body.deposit+req.body.assets,
//         //   state:'State:OPEN'
//         // });
//       }else{
//         console.log(options);
//         console.log("Error:" + error);
//       }
//   })
// });

module.exports = router;
