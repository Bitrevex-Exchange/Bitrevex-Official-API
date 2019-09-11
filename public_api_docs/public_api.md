#Bitrevex API Documentation

##Public API documentation

### Overview
The following sections describe the bitrevex public API endpoints.

The used endpoint : **/api/v1/public/** 
### Methods

#### get24h

Return the OHLC(*Open, High, Low, Close) information for the last 24h about a specific pair.
 
<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Description</th>
</tr>
<tr>
<td><i>want_symbol</i></td>
<td>True</td>
<td>The left pair symbol</td>
</tr>
<tr>
<td><i>offer_symbol</i></td>
<td>True</td>
<td>The right pair symbol</td>
</tr>
</table>


**Example**
#####Request 
```
POST /api/v1/public/ HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"get24h",
	"params":{
		"want_symbol":"ETH",
		"offer_symbol":"BTC"
	},
	"id":1
}
```

#####Response
```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "highest": "0.03700000",
        "lowest": "0.03600000",
        "open": "0.03700000",
        "closing": "0.03600000",
        "volume": "0.00392400",
        "change_diff": "-0.00100000",
        "change": "-2.78",
        "current": "0.03600000",
        "current_usd": "362.890800",
        "highest_usd": "372.971100",
        "lowest_usd": "362.890800",
        "open_usd": "372.971100",
        "closing_usd": "362.890800"
    }
}
```

#### get24hBTCVolume

Get the total exchanged volume in the last 24h in BTC.

**Example**

##### Request

```text
POST /api/v1/public/ HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
{
	"jsonrpc":"2.0",
	"method":"get24hBTCVolume",
	"id":1
}
```

##### Response
```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "volume": 0.0445156
    }
}
```