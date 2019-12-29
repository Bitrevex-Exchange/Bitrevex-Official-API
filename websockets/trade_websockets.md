# Bitrevex official API documentation

## Trade WebSockets

### Introduction

WebSockets are a powerful real-time technology. It's used in bitrevex by the clients to know all of the operations that are performed on the exchange.

It's recommended to try and test the samples for better understanding.

### Websockets endpoints

The Bitrevex WebSockets services are available through the port 8887, on the address http://www.bitrevex.com. 

The availables endpoints are:
 
<ul>
<li><b>/orders</b> : To receive orders related messages </li>
<li><b>/transactions</b> : To receive transactions related messages</li>
</ul>

### Order related messages


#### OrderAdded

This message is broadcasted (sended to all subscribers) when the engine detects that there is a new order added. the message is sent in the followning JSON form : 

```json
 {
 	"event":"OrderAdded",
	"order":
	{
		"CustomerId":"32",
		"OrderBookId":"984",
		"Price":"0.070000000000000000000000000000",
		"Quantity":"0.049000000000000000000000000000",
		"Side":"Ask",
		"Type":"Limit",
		"WantAssetTypeId":"4",
		"OfferAssetTypeId":"1",
		"Status":"1",
		"Pair":"ETH/BTC"
	}
}
```

The **event** field correspond to the kind of message. And the **order** contain data about orders.

<ul>
<li><b>CustomerId</b> : The ID of the order owner</li>
<li><b>OrderBookId</b> : The ID of the order</li>
<li><b>Price</b> : The order price, there are trailing zeros due to the high precision arithmetic used by the engine, you can use any floating point conversion(parsefloat, castings, ...) function to solve the problem. </li>
<li><b>Quantity</b> : The order quantity</li>
<li><b>Side</b> : The side of the order <b>Ask</b> or <b>Bid</b>
 </li>
 <li><b>Type</b>: The type of the order <b>Limit</b> or <b>Market</b> ... </li>
 <li><b>WantAssetTypeId</b> : Used internally</li>
 <li><b>OfferAssetTypeId</b> : Used internally</li>
 <li><b>Status</b> : The order status
 <ul>
 <li>1 => pending order</li>
 <li>2 => completely matched order</li>
 <li>3 => partially matched order</li>
 <li>4 => cancelled order</li>
 </ul>
 </li>
 <li><b>Pair</b> : The pair that holds this order</li>
</ul>


#### Order cancelled

This message is sent when an user has cancelled his order. the message is in the following JSON form:

```json
 {
 	"event":"OrderCancelled",
	"order":
	{
		"CustomerId":"32",
		"OrderBookId":"984",
		"Price":"0.070000000000000000000000000000",
		"Quantity":"0.049000000000000000000000000000",
		"Side":"Ask",
		"Type":"Limit",
		"WantAssetTypeId":"4",
		"OfferAssetTypeId":"1",
		"Status":"4",
		"Pair":"ETH/BTC"
	}
}
```


#### Order matched

This message is sent when a new order is matched by the engine the message is in the following JSON form:

```json
 {
 	"event":"OrderMatched",
	"order":
	{
		"CustomerId":"32",
		"OrderBookId":"984",
		"Price":"0.070000000000000000000000000000",
		"Quantity":"0.049000000000000000000000000000",
		"Side":"Ask",
		"Type":"Limit",
		"WantAssetTypeId":"4",
		"OfferAssetTypeId":"1",
		"Status":"3",
		"Pair":"ETH/BTC"
	}
}
```



#### Example code


##### For orders  

```javascript
const url='ws://bitrevex.com:8887/orders'; 
const connection = new WebSocket(url);

connection.onopen=function(){
	console.log("Connection opened");
};

connection.onerror=function(err){
	console.log("Error happened : ",err);
};
connection.onmessage=function(e){

	console.log("New message : " , e.data);
	let messageData= JSON.parse(e.data);
	
	if( null !== messageData ){

		let order = messageData.order;

		if(messageData.event === 'OrderAdded'){ 
		/* new order added event */
			
		}else if(messageData.event === 'OrderCancelled'){ 
		/* order cancelled event  */
		
		}else if(messageData.event === 'OrderMatched'){ 
		/* new order matched event */
		
		}
	}
};


connection.onclose=function(e){
	console.log("Connection closed");
}
```

##### For transactions 

```javascript
const url='ws://localhost:8887/transactions'; 

const connection = new WebSocket(url);

connection.onopen=function(){
	console.log("Connection opened");
};

connection.onerror=function(err){
	console.log("Error happened : ",err);
};
connection.onmessage=function(e){

	console.log("New message : " , e.data);
	let messageData= JSON.parse(e.data);

	if( null !== messageData ){
		let transactions = messageData.transactions;
		for( let i=0;i<transactions.length;++i ){
			/*do something*/
		}
	}
};

connection.onclose=function(e){
	console.log("Connection closed");
}
```


### Transaction related messages

For transaction there is only one message **NewTransaction**. and The data is an array containing transactions.

Examples:
```json
{
  "event": "NewTransaction",
  "transactions": [
    {
      "TransactionId": "221",
      "Amount": 0.04,
      "Price": 0.069,
      "Date": "2019-09-12 17:00",
      "A_CustomerId": "32",
      "B_CustomerId": "32",
      "Pair": "ETH/BTC"
    },
    {
      "TransactionId": "222",
      "Amount": 0.04,
      "Price": 0.069,
      "Date": "2019-09-12 17:00",
      "A_CustomerId": "32",
      "B_CustomerId": "32",
      "Pair": "ETH/BTC"
    },
    {
      "TransactionId": "223",
      "Amount": 0.04,
      "Price": 0.069,
      "Date": "2019-09-12 17:00",
      "A_CustomerId": "32",
      "B_CustomerId": "32",
      "Pair": "ETH/BTC"
    },
    {
      "TransactionId": "224",
      "Amount": 0.06,
      "Price": 0.069,
      "Date": "2019-09-12 17:00",
      "A_CustomerId": "32",
      "B_CustomerId": "32",
      "Pair": "ETH/BTC"
    },
    (...)
  ]
}
```

Details about the transaction object:

<ul>
<li><b>TransactionId</b> The ID of the transaction</li>
<li><b>Amount</b> The Amount transferred</li>
<li><b>Price</b> The Price of the transaction</li>
<li><b>A_CustomerId</b> The transaction source user ID</li>
<li><b>B_CustomerId</b> The transaction receiver user ID</li>
<li><b>Pair</b> The pair that holds the transaction</li>
</ul>
