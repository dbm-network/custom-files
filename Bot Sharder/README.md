
**NOTE: Do not use this unless your bot is in over 2000 guilds, there is no point if its below, it uses more resources, and will probally break commands that you already use**

# DBM Mods Bot Sharding

**Allows your bot created by Discord Bot Maker to take advantage of sharding!**


Installation
====
Download the [ZIP file](https://downgit.github.io/#/home?url=https://github.com/dbm-network/custom-files/blob/master/Bot%20Sharder/sharded-bot.js) and extract the file to your bot folder.

Your Bot folder should look like this:

![shard](https://i.imgur.com/sHqbJjV.png)


Running
====

Once those are in the folder, up at the top where the path is, select everything in there and type cmd and press enter:
![cmd](https://i.imgur.com/XWKxwob.png)



In the Command Prompt window that opens, type `node sharded-bot.js`. It should look somewhat similar to this.
![node](https://i.imgur.com/AKuzOrR.png)


If you want to provide a different shard count add `--shard_count=[number]` after `node sharded-bot.js`; ex. `node sharded-bot.js --shard_count=3`.
The default `shard_count` parameter is set to `auto` (determined by discord.js), which is fine for most bots.

To change the bot startup file add `--startup=./index.js` after `node sharded-bot.js`; ex. `node sharded-bot.js --startup=./index.js`.
The default `startup` parameter is set to `bot.js` (Default file for Discord Bot Maker)

**If you want to do anything across shards you will need to use** [`client.shard.broadCastEval()`](https://discord.js.org/#/docs/main/stable/class/ShardClientUtil?scrollTo=broadcastEval)

**Please read the API docs!**
