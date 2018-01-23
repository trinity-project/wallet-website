var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var app = require('../app');
//var contractText = fs.readFileSync('Draft_.sol','utf-8');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json-rpc',
    'Accept':'application/json-rpc'
}


/* GET home page. */
router.get('/', function(req, res, next) {
  if(channle_info==""||channle_info==null){
	  res.render('transfer',{
	  	transfer_channel_name:'87f8784064468c3c6b21f0d0cace2fdd64'
	  })
  } else {
  	  res.render('transfer',{
  		transfer_channel_name:channle_info.result.channel_name
  	  })
  }
  console.log(app.channle_info);
});

router.post('/', function(req, res) {
	var options = {
	    url: "http://106.15.91.150:20552",
	    method: 'POST',
	    headers: headers,
	    body: JSON.stringify({
	      jsonrpc: '2.0',
		  method: 'sendertoreceiver',
		  params: ['0xf4cc4154a4987f8784064468c3c6b21f',req.body.address,req.body.channelname,req.body.assets,req.body.amount],
	      id: 1
	   })
	}
	request(options, function (error, response, body) {
	    if (!error) {
        console.log(options);
        console.log(body);
        body = JSON.parse(body);
        res.render('success');
	    } else {
          console.log(options);
	      console.log("Error:" + error);
	    }
	 
	})
});

module.exports = router;
