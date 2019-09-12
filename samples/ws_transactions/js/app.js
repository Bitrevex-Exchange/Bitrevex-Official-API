/**
	app.js

	Bitrevex Trading Websockets intialisation & handling 

	(C) Bitrevex Corp.
*/




/**
	Append a new transaction order
*/
function appendTransaction( id , date , aCustomer , bCustomer , pair , price , amount)
{

	$('#transactions').prepend(
		`
		<tr>
		<td>${id}</td>
		<td>${date}</td>
		<td>${aCustomer}</td>
		<td>${bCustomer}</td>
		<td>${pair}</td>
		<td>${parseFloat(price)}</td>
		<td>${parseFloat(amount)}</td>
		</tr>
		`
		);
}

/**
YOU MUST replace the localhost:8887 by bitrevex.com:8887
*/
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
			trx = transactions[i];
			appendTransaction( trx.TransactionId , 
				trx.Date,
				trx.A_CustomerId,
				trx.B_CustomerId,
				trx.Pair,
				trx.Price,
				trx.Amount,
				);
		}
	}
};

connection.onclose=function(e){
	console.log("Connection closed");
}