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
HOST www.bitrevex.com
Content-Type: application/json
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

{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "user": {
            "id": 32,
            "email": "arnaud@gmail.com",
            "referral_code": "61340630",
            "inscription_date": "2019-03-04 00:30:42",
            "referrals_count": 1,
            "level": 1
        },
        "referrals": [
            {
                "id": 34,
                "email": "..."
            }
            (...)
        ]
    }
}

```

### Public API Overview

The public API provides you methods for retrieving data such as : 

- The 24h OHLC about any pair
- The 24h Bitcoin volume
- ...

For the public API, you don't need any special field for authentication. Your requests limits is defined by your IP address. Any IP address can't do more than **5 requests/seconds**. Go on [Public API Docs](./public_api_docs/public_api.md) for more informations. 


### Private API Overview

The private API provides you methods and endpoints for user specific information(profile info, referrals, pending withdrawals,deposits...)  and for trading(open orders, order sending, order history,...) 

You need to put your Bitrevex API key into the URL request part to perform your requests correctly. 

The example above show an example of usage of the private API.

For more information go on [Private API Docs](./private_api_docs/private_api.md).


###WebSocket API Overview