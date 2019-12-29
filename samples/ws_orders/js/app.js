/**
	app.js

	Bitrevex Trading Websockets intialisation & handling 

	(C) Bitrevex Corp.
*/


/**
	Append a new BID order
*/
function appendBidOrder( id , pair , amount , price , status , event)
{
	$('#bidOrders').prepend(
		`
		<tr>
		<td>${id}</td>
		<td>${event}</td>
		<td>${pair}</td>
		<td>${parseFloat(price)}</td>
		<td>${parseFloat(amount)}</td>
		<td>${status}</td>
		</tr>
		`
		);
}

/**
	Append a new ASK order
*/
function appendAskOrder( id , pair , amount , price , status , event)
{

	$('#askOrders').prepend(
		`
		<tr>
		<td>${id}</td>
		<td>${event}</td>
		<td>${pair}</td>
		<td>${parseFloat(price)}</td>
		<td>${parseFloat(amount)}</td>
		<td>${status}</td>
		</tr>
		`
		);
}

/**
YOU MUST replace the localhost:8887 by bitrevex.com:8887
*/
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

	/**
	New message :  {"event":"OrderCancelled",
	"order":{"CustomerId":"32",
	"OrderBookId":"984",
	"Price":"0.070000000000000000000000000000",
	"Quantity":"0.049000000000000000000000000000",
	"Side":"Ask",
	"Type":"Limit",
	"WantAssetTypeId":"4",
	"OfferAssetTypeId":"1",
	"Status":"4",
	"Pair":"ETH/BTC"}}
	*/
	if( null !== messageData ){

		let order = messageData.order;

		if(messageData.event === 'OrderAdded'){ /* new order added event */
			if( order.Side == 'Ask' ){
				appendAskOrder( 
					order.OrderBookId, order.Pair, order.Quantity,
					order.Price, order.Status,"OrderAdded"															
				 );
			}else{
				appendBidOrder(
					order.OrderBookId, order.Pair, order.Quantity,
					order.Price, order.Status, "OrderAdded"
				);
			}
		}else if(messageData.event === 'OrderCancelled'){ /* order cancelled event  */
			if( order.Side === 'Ask' ){
				appendAskOrder( 
					order.OrderBookId, order.Pair, order.Quantity,
					order.Price, order.Status,"OrderCancelled"															
				 );
			}else{
				appendBidOrder(
					order.OrderBookId, order.Pair, order.Quantity,
					order.Price, order.Status, "OrderCancelled"
				);
			}
		}else if(messageData.event === 'OrderMatched'){ /* new order matched event */
			if( order.Side === 'Ask' ){
				appendAskOrder( 
					order.OrderBookId, order.Pair, order.Quantity,
					order.Price, order.Status,"OrderMatched"															
		
				 );
			}else{
				appendBidOrder(
					order.OrderBookId, order.Pair, order.Quantity,
					order.Price, order.Status, "OrderMatched"
				);
			}
		}
	}
};

connection.onclose=function(e){
	console.log("Connection closed");
}