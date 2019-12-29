# Bitrevex official API Documentation

## Trade API

### Overview

The following section describe how to use bitrevex API to perform trade based operations(listing orders, sending orders, canceling orders, and so.)

Used endpoint : **/api/v1/trade/**

### Methods
 
#### getOpenOrders

Return the list of orders owned by the connected user(owner of the API user) .

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>order_type</td>
<td>No</td>
<td>null</td>
<td>The order type filter
<ul>
<li>1 - for limit orders</li>
<li>2 - for market orders</li>
<li>null - all orders</li>
</ul>
</td>
</tr>
<tr>
<td>order_side</td>
<td>No</td>
<td>null</td>
<td>The order side filter
<ul>
<li>1 - for limit orders</li>
<li>2 - for market orders</li>
<li>null - all orders</li>
</ul>
</td>
</tr>

</table>


**Example**

##### Request

```text
POST /api/v1/trade/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"getOpenOrders",
	"params":{
		"order_type":1
	},
	"id" : 1
}
```

##### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "id": 978,
            "date": "2019-06-23 10:28:35",
            "pair": "ETH/BTC",
            "side": "BUY",
            "order_type": "LIMIT",
            "price": "0.06900000",
            "quantity": "0.032000",
            "filled_quantity": "0.00",
            "total": "0.00220800",
            "status": 1
        },
        {
            "id": 1019,
            "date": "2019-06-23 10:29:32",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.03600000",
            "quantity": "0.083000",
            "filled_quantity": "0.03",
            "total": "0.00298800",
            "status": 1
        },
        (...)
    ]
}
```
<hr>

#### getOrderHistory

Return the connected user order history. 

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>want_symbol</td>
<td>Yes</td>
<td></td>
<td>The left pair symbol</td>
</tr>
<tr>
<td>offer_symbol</td>
<td>Yes</td>
<td></td>
<td>The right pair symbol</td>
</tr>
</table>

**Example**

##### Request

```text
POST /api/v1/trade/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method" : "getOrderHistory",
	"params":{
		"want_symbol":"ETH",
		"offer_symbol" : "BTC"
	},
	"id":1
}
```

##### Response

```json

{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "id": 1018,
            "date": "2019-09-10 23:04:57",
            "pair": "ETH/BTC",
            "side": "BUY",
            "order_type": "LIMIT",
            "price": "0.03600000",
            "quantity": "0.100000",
            "filled_quantity": "0.100000",
            "total": "0.00360000",
            "status": 2
        },
        {
            "id": 1006,
            "date": "2019-09-08 10:59:24",
            "pair": "ETH/BTC",
            "side": "BUY",
            "order_type": "LIMIT",
            "price": "0.06500000",
            "quantity": "0.002000",
            "filled_quantity": "0.002000",
            "total": "0.00013000",
            "status": 2
        },
        {
            "id": 1004,
            "date": "2019-09-08 10:54:00",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.06500000",
            "quantity": "1.065000",
            "filled_quantity": "0.065000",
            "total": "0.06922500",
            "status": 3
        },
        {
            "id": 1003,
            "date": "2019-09-07 11:58:12",
            "pair": "ETH/BTC",
            "side": "BUY",
            "order_type": "LIMIT",
            "price": "0.09000000",
            "quantity": "2.000000",
            "filled_quantity": "0.000000",
            "total": "0.18000000",
            "status": 4
        },
        (...)
    ]
}
```

Order status 

<ul>
<li>1 - Pending order</li>
<li>2- Completely matched</li>
<li>3- Partially matched</li>
<li>4- Cancelled</li>
</ul>

<hr>

#### getTransactions

Return the list of transactions for a specific market.


<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>want_symbol</td>
<td>Yes</td>
<td></td>
<td>The left pair symbol</td>
</tr>
<tr>
<td>offer_symbol</td>
<td>Yes</td>
<td></td>
<td>The right pair symbol</td>
</tr>

<tr>
<td>all</td>
<td>No</td>
<td>true</td>
<td>true to show all of the market transactions , false to show only the user transactions </td>
</tr>
</table>

**Example**

##### Request

```text
POST /api/v1/trade/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"getTransactions",
	"params":{
		"want_symbol":"ETH",
		"offer_symbol": "BTC",
		"all":true
	},
	"id":"1"
}
```

##### Response

```json
{
    "jsonrpc": "2.0",
    "id": "1",
    "result": [
        {
            "date": " 23:04:59 ",
            "type": "ASK",
            "pair": "ETH/BTC",
            "price": "0.03600000",
            "id": 213,
            "amount": "0.032000"
        },
        {
            "date": " 23:04:59 ",
            "type": "ASK",
            "pair": "ETH/BTC",
            "price": "0.03700000",
            "id": 214,
            "amount": "0.068000"
        },(...)
    ]
}
```
<hr>

#### sendOrder

Sends an order to the bitrevex matching engine.


<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>want_symbol</td>
<td>Yes</td>
<td></td>
<td>The left pair symbol</td>
</tr>
<tr>
<td>offer_symbol</td>
<td>Yes</td>
<td></td>
<td>The right pair symbol</td>
</tr>
<tr>
<td>type</td>
<td>Yes</td>
<td></td>
<td>The order type <b>LIMIT</b> or <b>MARKET</b></td>
</tr>
<td>side</td>
<td>Yes</td>
<td></td>
<td>The order side <b>BID</b> or <b>ASK</b></td>
</tr>
<td>price</td>
<td>Yes</td>
<td></td>
<td>The order price, put 0 for the type who doesn't support price field(like MARKET,...)</td>
</tr>
<td>amount</td>
<td>Yes</td>
<td></td>
<td>The order amount </td>
</tr>
</table>

**Example**

##### Request

```text
POST /api/v1/trade/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"sendOrder",
	"params":{
		"want_symbol":"ETH",
		"offer_symbol":"BTC",
		"type":"LIMIT",
		"side":"BID",
		"price":"0.000001",
		"amount":"0.04"
	},
	"id":1
}
```

##### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "status": "ACCEPTED",
        "message": "Order sent successfully"
    }
}
```
<hr>

#### cancelOrder

Cancel an existing **pending** order 


<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>order_id</td>
<td>Yes</td>
<td></td>
<td>The order ID to delete</td>
</tr>
</table>


##### Request
```text
POST /api/v1/trade/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"cancelOrder",
	"params":{
		"order_id":1019
	},
	"id":1
}
```

##### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "status": "ACCEPTED",
        "message": "Order cancel request sent"
    }
}
```

<hr>

#### getAllOpenOrders

Return all open order for a specific market

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>want_symbol</td>
<td>Yes</td>
<td></td>
<td>The left pair symbol</td>
</tr>
<tr>
<td>offer_symbol</td>
<td>Yes</td>
<td></td>
<td>The right pair symbol</td>
</tr>

<tr>
<td>order_side</td>
<td>Yes</td>
<td></td>
<td>The order side(<b>BID</b> or <b>ASK</b>) </td>
</tr>
<tr>
<td>order_type</td>
<td>Yes</td>
<td></td>
<td>
Order type : 
<ul>
<li>1 - Market</li>
<li>2 - Limit</li>
</ul>
</td>
</tr>
</table>

**Example**

##### Request

```text
POST /api/v1/trade/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"getAllOpenOrders",
	"params":{
		"want_symbol" : "ETH",
		"offer_symbol" : "BTC",
		"order_side":"BID",
		"order_type":0
	},
	"id":1
}
```

##### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "id": 962,
            "date": "2019-06-19 23:57:44",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.50000000",
            "quantity": "0.500000",
            "filled_quantity": null,
            "total": "0.25000000",
            "status": 2
        },
        {
            "id": 965,
            "date": "2019-06-19 23:59:20",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.30000000",
            "quantity": "4.700000",
            "filled_quantity": null,
            "total": "1.41000000",
            "status": 3
        },
        {
            "id": 988,
            "date": "2019-07-14 10:25:33",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.07000000",
            "quantity": "0.050000",
            "filled_quantity": null,
            "total": "0.00350000",
            "status": 2
        },
        {
            "id": 1013,
            "date": "2019-09-08 10:54:00",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.06500000",
            "quantity": "5.695000",
            "filled_quantity": null,
            "total": "0.37017500",
            "status": 2
        },
        {
            "id": 987,
            "date": "2019-07-09 00:48:07",
            "pair": "ETH/BTC",
            "side": "SELL",
            "order_type": "LIMIT",
            "price": "0.06000000",
            "quantity": "0.049000",
            "filled_quantity": null,
            "total": "0.00294000",
            "status": 2
        },
        (...)
        ]
}
        
```