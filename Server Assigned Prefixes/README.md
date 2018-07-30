
# DBM Mods Server Assigned Prefixes


# Try Version 2 here on this gist, it doesn't require bot.js modifications!

https://gist.github.com/generalwrex/682f40dff2414613db52cbc5d469b4c2


## Note: You can only use one modified bot.js at a time currently.

Allows your bot created by Discord Bot Maker to use a server assigned prefixes

## Using It
Download the entire zip archive, or clone it.

Go into `Server Assigned Prefixes`, and copy `server-assigned-prefixes-bot.js` to where bot.js is and copy the `data` folder as well, go into the data folder and edit `serverPrefixes.json`, which should look like...

```json
 [
  {
    "serverid": "374961173524643843",
    "prefix": "<"
  },
  {
    "serverid": "379372685182107669",
    "prefix": ">"
  }
]

```

Follow the same layout to add new ones, or remove

```json
{
  "serverid": "serveridhere",
  "prefix": "wantedprefix"
},
```

Remember to not forget the comma's!

Then to use the customized files use `node server-assigned-prefixes-bot.js`, we dont want to replace bot.js, but if you have problems then you can go back to using `node bot.js` then report the problem in the DBM Mods Discord Server!



# Scripts And Commands

----------------------------------------------------------------------------------------------------------------------------------------

**Get Used Prefix**

This snippet will show the prefix used on the server, that was set in the serverPrefixes.json, otherwise will show the one set by dbm
```js
${server.prefix || Files.data.settings.tag}
```

**Get Prefix Of Server**

`[prefix]currentprefix [serverid]`

```js
{
  "name": "currentprefix",
  "permissions": "KICK_MEMBERS",
  "restriction": "1",
  "_id": "swUaR",
  "actions": [
    {
      "info": "0",
      "infoIndex": "1",
      "storage": "1",
      "varName": "serverid",
      "name": "Store Command Params"
    },
    {
      "behavior": "0",
      "interpretation": "0",
      "code": "var result = Bot.prefixes.find((element) => {return element.serverid === tempVars(\"serverid\")} )\nif(result){\n    msg.channel.send(\"Prefix for server '\" + server.name + \"' is \" + Bot.prefixes.find((element) => {return element.serverid === tempVars(\"serverid\")} ).prefix) \n}\nelse\n{\n  msg.channel.send(\"could not find a prefix for the provided server id.\")\n}\n",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    }
  ]
}
```

**Change Prefix Of Server**

`[prefix]changeprefix [serverid] [prefix]`

```js
{
  "name": "changeprefix",
  "permissions": "KICK_MEMBERS",
  "restriction": "1",
  "_id": "swUaR",
  "actions": [
    {
      "info": "0",
      "infoIndex": "1",
      "storage": "1",
      "varName": "serverid",
      "name": "Store Command Params"
    },
    {
      "info": "0",
      "infoIndex": "2",
      "storage": "1",
      "varName": "newprefix",
      "name": "Store Command Params"
    },
    {
      "behavior": "0",
      "interpretation": "0",
      "code": "var result = Bot.prefixes.find((element) => {return element.serverid === tempVars(\"serverid\")} ) \n\nif(result){\n  Bot.prefixes.find((element) => {return element.serverid === tempVars(\"serverid\")} ).prefix = tempVars(\"newprefix\") \n\n  var fs = require('fs');\n  var path = require('path');\n  fs.writeFile(path.join(\"data\",\"serverPrefixes.json\"), JSON.stringify(Bot.prefixes, null, 2), function(err) {\n    if(err) return console.log(err);   \n    msg.channel.send(\"Prefix for server '\" + server.name + \"' was changed to \" + result.prefix)\n  }); \n}\nelse\n{\n  msg.channel.send(\"Prefix not assigned to the provided serverid or the serverid is wrong.\")\n}\n",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    }
  ]
}
```

**More To Come**

People will eventually create commands using this, they will be listed somewhere in the readme!


