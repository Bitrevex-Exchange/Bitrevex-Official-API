#Bitrevex API Documentation

### Overview

The following sections describe how to use the bitrevex web API for trading. The bitrevex web API use the [JSON RPC 2.0](https://en.wikipedia.org/wiki/JSON-RPC) protocol for requests. 

### The request format

The bitrevex web API request must have the standard JSON RPC 2.0 request body format.
```json
{
	"jsonrpc":"2.0",
	"method":"<the_method>",
	"params":{
		"param1":"value1",
		"param2":"value2"
	},
	"id":"1" 
}
```

### Request example

Here there is an usage example : 

```text
POST /api/v1/user/?_key=YOUR_API_KEY HTTP/1.1
Content-Type: application/json
Postman-Token: ec0a29e1-49c9-4ac9-99c0-59709cc645bb
{
	"jsonrpc":"2.0",
	"id":1,
	"method":"getUserInfo",
	"params":{
		"list_referrals" :true,
		"show_level_info" : true
	}
}
```
Response:

```text
Date :Tue, 10 Sep 2019 22:28:27 +0000
Date :Tue, 10 Sep 2019 22:28:27 GMT
Connection :close
X-Powered-By :PHP/7.2.14-1+ubuntu16.04.1+deb.sury.org+1
Cache-Control:no-cache, private
Content-Type:application/json
X-RateLimit-Limit:60
X-RateLimit-Remaining:59
```