#Bitrevex official API documentation

## User API

### Overview

The following section explain the requests about the user API

Used endpoint : **/api/v1/user/**

### Methods 

#### getUserInfo

Retrieve the information about the requester user, the owner of the used API key.

<table>
<tr>
<th>Parameter name</th>
<th>Required</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td><b>list_referrals</b></td>
<td>No</td>
<td>false</td>
<td>If it's true the request will return all of the requester user referrals</td>
</tr>
<tr>
<td><b>show_level_info</b></td>
<td>No</td>
<td>false</td>
<td>If it's true the request will return the user level info. For example for level 2 it will show the enterprise information or the personal information</td>
</tr>
</table>

**Example**

#####Request 
```text
POST /api/v1/user/?_key=YOUR_API_KEY HTTP/1.1
Host: www.bitrevex.com
Content-Type: application/json
cache-control: no-cache
Postman-Token: 58aec697-468f-4ace-af8b-1bba1f43578d
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

#####Response
```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "user": {
            "id": 32,
            "email": "arnaud@karabistouille.com",
            "referral_code": "61340630",
            "inscription_date": "2019-03-04 00:30:42",
            "referrals_count": 1,
            "level": 1
        },
        "referrals": [
            {
                "id": 34,
                "email": "william@truc.com"
            }
        ]
    }
}
```