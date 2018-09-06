
**NOTE: Do NOT use this unless your bot is in over 2500 guilds, there is no point if its below, it uses more resources, and will probally break commands that you already use**

# DBM Mods Bot Sharding

**Allows your bot created by Discord Bot Maker to take advantage of sharding!**


Installation
====
Download the ZIP and extract the files to your Bot Base Folder.

Your Bot folder should look like this:

![shard](https://i.gyazo.com/97ac758cb15b87be9df98019d42fc3b6.png)


Running
====

Once those are in the folder, up at the top where the path is, select everything in there and type cmd and press enter:
![cmd](https://i.gyazo.com/9b70a9d74141836672e34106d37d1a61.png)



In the command window that opens, type `node sharded-bot.js`
![node](https://i.gyazo.com/a2f31037eb4dd6623da6bbd5a88a236e.png)


If you want to run it with a linux terminal then instead of running it with `bot node.js` you run it `node sharded-bot.js` if you want to provide a different shard count its `node sharded-bot.js shard_count=3` if you wanted 3 shards ( This is usually not needed unless your bot is in 5000 guilds.  )



Example RawData
====

Command `[prefix]shardinfo`
```json
{
  "name": "shardinfo",
  "permissions": "NONE",
  "restriction": "1",
  "_id": "XRenR",
  "actions": [
    {
      "behavior": "1",
      "interpretation": "0",
      "code": "client.shard && client.shard.fetchClientValues('users.size')\n.then(results => {\n    var output = results.reduce(function(accumulator, currentValue){\n      return accumulator + currentValue;\n    });\n    this.storeValue(output, 1 ,\"totalUsers\", cache)\n    this.callNextAction(cache)\n}).catch(console.error);",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    },
    {
      "behavior": "1",
      "interpretation": "0",
      "code": "client.shard && client.shard.fetchClientValues('guilds.size')\n.then(results => {\n    var output = results.reduce(function(accumulator, currentValue){\n      return accumulator + currentValue;\n    });\n    this.storeValue(output, 1 ,\"totalGuilds\", cache)\n    this.callNextAction(cache)\n}).catch(console.error);",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    },
    {
      "channel": "0",
      "varName": "",
      "message": "There are a total of ${tempVars(\"totalUsers\")} users in \n${tempVars(\"totalGuilds\")} guilds across all shards.\n\nThis command was ran in shard ${(client.shard.id + 1)} and has an id \nof ${(client.shard.id)}.\n\n\nTotal Active Shards: ${client.shard.count}\n",
      "storage": "0",
      "varName2": "",
      "name": "Send Message"
    }
  ]
}
```


Run Scripts
====

  The command above uses these scripts.

*Make sure **End Behavior** is set to **Do Not Call Next Action**, and **Evaluate Text First** is selected for interpretation  style for all of these scripts*
----------------------------------------------------------------------------------------------------------------------------------------
**Total Amount Of Users**

This script will store all users to a temp variable called totalUsers, `There are a total of ${tempVars("totalUsers")} users`
```js
client.shard.fetchClientValues('users.size')
.then(results => {
    var output = results.reduce(function(accumulator, currentValue){
      return accumulator + currentValue;
    });
    this.storeValue(output, 1 ,"totalUsers", cache)
    this.callNextAction(cache)
}).catch(console.error);
```

**Total Amount Of Guilds**

This script will store all users to a temp variable called totalGuilds, `users in ${tempVars("totalGuilds")} guilds`
```js
client.shard.fetchClientValues('guilds.size')
.then(results => {
    var output = results.reduce(function(accumulator, currentValue){
      return accumulator + currentValue;
    });
    this.storeValue(output, 1 ,"totalGuilds", cache)
    this.callNextAction(cache)
}).catch(console.error);
```

**If you want to do anything across shards.  You will need to use** [`client.shard.broadCastEval()`](https://discord.js.org/#/docs/main/stable/class/ShardClientUtil?scrollTo=broadcastEval)


**Sorry there currently isn't a Run Script or a Raw Data command to test this with.**

**Please read the API docs!**

