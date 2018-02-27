
# DBM Mods Bot Sharding
====
Allows your bot created by Discord Bot Maker to take advantage of sharding!

Run Scripts
====
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

**You can find a working command below in this gist!**
