var request = require('request');var fs = require('fs');
var rOption = { flags : 'r',encoding : null,mode : 0666};var wOption = {  flags: 'a',  encoding: null,  mode: 0666  }
//var contractText = fs.readFileSync('Draft_.sol','utf-8');

var fileWriteStream = fs.createWriteStream('getcontractstate.log',wOption);


var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json-rpc',
    'Accept':'application/json-rpc'
}



var options = {
  url: "http://106.15.91.150:20552",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'registeaddress',
    params: ['AY8r7uG6rH7MRLhABALhdsadasas2sad1ifvefewfaZvf8jM4bCSfn3YJ','1000'],
    id: 1
  })
}


request(options, function (error, response, body) {
    if (!error) {
        console.log(options);
        console.log(body);
    }else{
      
      console.log("2" + error);
    }
 
})


/*
var options = {
  url: "http://localhost:10332",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 67
  })
}


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode.toString() + " " + body);
    }else{
      
      console.log(response.statusCode.toString() + " " + error);
    }
 
})


var options = {
  url: "http://localhost:8545",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'web3_sha3',
    params: ["0x68656c6c6f20776f726c64"],
    id: 64
  })
}


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode.toString() + " " + body);
    }else{
      
      console.log(response.statusCode.toString() + " " + error);
    }
 
})

var options = {
  url: "http://localhost:8545",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_accounts',
    params: [],
    id: 1
  })
}


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode.toString() + " " + body);
    }else{
      
      console.log(response.statusCode.toString() + " " + error);
    }
 
})


var options = {
  url: "http://localhost:8545",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
  "from": "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48",
  "to": "0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8",
  "gas": "0x76c0", // 30400,
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}],
    id: 1
  })
}


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode.toString() + " " + body);
    }else{
      
      console.log(response.statusCode.toString() + " " + error);
    }
 
})


var options = {
  url: "http://localhost:8545",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_compileSolidity',
    params: [
   "contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }",
],
    id: 1
  })
}


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode.toString() + " " + body);
    }else{
      
      console.log(response.statusCode.toString() + " " + error);
    }
 
})
*/
/*

// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileSolidity","params":["contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
      "code": "0x605880600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b603d6004803590602001506047565b8060005260206000f35b60006007820290506053565b91905056",
      "info": {
        "source": "contract test {\n   function multiply(uint a) constant returns(uint d) {\n       return a * 7;\n   }\n}\n",
        "language": "Solidity",
        "languageVersion": "0",
        "compilerVersion": "0.9.19",
        "abiDefinition": [
          {
            "constant": true,
            "inputs": [
              {
                "name": "a",
                "type": "uint256"
              }
            ],
            "name": "multiply",
            "outputs": [
              {
                "name": "d",
                "type": "uint256"
              }
            ],
            "type": "function"
          }
        ],
        "userDoc": {
          "methods": {}
        },
        "developerDoc": {
          "methods": {}
        }
      }

}

*/
/*
var options = {
  url: "http://localhost:8545",
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_compileSolidity',
    params: [contractText],
    id: 1
  })
}


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(response.statusCode.toString() + " " + body);
        fileWriteStream.write(body);

        var objectBook=JSON.parse(body); 
        
        var jsonAbi=JSON.stringify(objectBook.result.Manager.info.abiDefinition); 
        fWManager.write(jsonAbi);


        var jsonAbi=JSON.stringify(objectBook.result.Draft.info.abiDefinition); 
        fWDraft.write(jsonAbi);


         var jsonAbi=JSON.stringify(objectBook.result.Entity.info.abiDefinition); 
        fWEntity.write(jsonAbi);



    }else{
      
      console.log(response.statusCode.toString() + " " + error);
    }
 
})
*/
