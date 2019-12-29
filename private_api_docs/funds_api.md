# Bitrevex official API documentation

## Funds API 

### Overview

The following sections explain the requests about the funds API.

Used endpoint : **/api/v1/funds/**

### Methods

#### getBalance

Retrieve the balance of an user

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td><b>symbol</b></td>
<td>Yes</td>
<td></td>
<td>The asset symbol (BTC,ETH,RVC,...)</td>
</tr>
<tr>
<td><b>type</b></td>
<td>Yes</td>
<td></td>
<td>The balance type
<ul>
<li><b>1</b> for deposit balance</li>
<li><b>2</b> for trade balance</li>
</ul>
</td>
</tr>
</table>

**Example**
##### Request
```text
POST /api/v1/funds/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"getBalance",
	"params":{
		"type":"2",
		"symbol":"BTC"
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
        "raw_balance": "25629928.34100000",
        "balance": "0.25629928",
        "raw_in_order": "12058905.75352400", 
        "in_order": "0.12058905", 
        "symbol": "BTC"
    }
}
```
<ul>
<li>raw_balance :  the balance in the base unit (satoshi for BTC, Wei for ETH,...)</li>
<li>balance: the normal balance</li>
<li>raw_in_order: the frozen balance in base unit</li>
<li>in_order: the frozen balance</li>
<li>symbol : the asset symbol</li>
</ul>

<hr>


#### getAddress

Return addresses informations for a specific symbol.

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td><b>symbol</b></td>
<td>Yes</td>
<td></td>
<td>The asset symbol (BTC,ETH,RVC,...)</td>
</tr>
</table>

**Example**

##### Request

```text
POST /api/v1/funds/?_key=YOUR_API_KEY HTTP/1.1
Host: localhost:8000
Content-Type: application/json
{
	"jsonrpc" : "2.0",
	"method": "getAddress",
	"params" : {
		"symbol":"ETH"
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
        "address": "0x951477843530f6ebcb3fe9823df37a096fda3a96",
        "public_key": "04d1dbd38a5e1657f9dca02ab2685b31e804ff1d3f3160c573d2839ac587dde31045d737d54f500120831831d6f2cd8ad4f36a7d403d856456cba45f9260b63cea",
        "symbol": "ETH"
    }
}
```
<hr>

#### getDeposits

Retrieve the user deposits

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td><b>symbol</b></td>
<td>No</td>
<td></td>
<td>The asset symbol filter (BTC,ETH,RVC,...)</td>
</tr>
</table>

**Example**

##### Request

```text
POST /api/v1/funds/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method" : "getDeposits",
	"params" : {
		"symbol" : "RVC"
	},
	"id":"1"
}
```

##### Response

```json
{
    "jsonrpc": "2.0",
    "id": "1",
    "result": {
        "deposits": [
            {
                "amount": "10.000",
                "address": "0xf8bb184435c923fd46863cb289bbf4a4117cebf6",
                "tx_id": "36e28bfbaa269a0f7fc82116c6e490231940a55031f4005729afc6656dac4d44",
                "confirmations": 56780,
                "date": "2019-07-19 01:14:05",
                "symbol": "RVC",
                "state": 1
            },
            {
                "amount": "12390.000",
                "address": "0xf8bb184435c923fd46863cb289bbf4a4117cebf6",
                "tx_id": "f1f1a10efa50b1d6aea9fcce5f0c5c0b500113d5ec31def11febe7f0282d0e87",
                "confirmations": 37188,
                "date": "2019-08-28 10:46:54",
                "symbol": "RVC",
                "state": 0
            }
        ]
    }
}
```

Deposits states:

<ul>
<li>0 - Pending</li>
<li>1 - Confirmed</li>
</ul>

<hr>

#### getWithdraws

Retreve the user withdrawals

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td><b>symbol</b></td>
<td>No</td>
<td></td>
<td>The asset symbol filter (BTC,ETH,RVC,...)</td>
</tr>
</table>

##### Request

```text
POST /api/v1/funds/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"getWithdraws",
	"params":{
		"symbol":"ETH"
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
        "withdraws": [
            {
                "amount": "0.03",
                "tx_id": null,
                "address": "2NBSA7VQF8FAsJjthrKTwu3v38SezA5Vz6H",
                "state": -1,
                "creation_date": "2019-07-27 22:26:50",
                "email_confirmation_date": null,
                "symbol": "ETH"
            }
        ]
    }
}
```

<u>Withdrawal status</u>

<ul>
<li>-1 : Waiting for user email confirmation</li>
<li>0 : Waiting for admin validation</li>
<li>1 : Withdrawal performed successfully</li>
<li>2 : Withdrawal request refused by admin</li>
</ul>