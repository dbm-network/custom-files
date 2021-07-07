
**NOTE: Do not use this unless your bot is in over 2000 guilds, there is no point if its below, it uses more resources, and will probally break commands that you already use**

# DBM Mods Bot Sharding

**Allows your bot created by Discord Bot Maker to take advantage of sharding!**


Installation
====
Download the [ZIP file here](https://downgit.github.io/#/home?url=https://github.com/TheMonDon/custom-files/blob/master/Bot%20Sharder/sharded-bot.js) and extract the file to your Bot Base Folder.

Your Bot folder should look like this: (outdated())

![shard](https://i.gyazo.com/97ac758cb15b87be9df98019d42fc3b6.png)


Running
====

Once those are in the folder, up at the top where the path is, select everything in there and type cmd and press enter: (outdated())
![cmd](https://i.gyazo.com/9b70a9d74141836672e34106d37d1a61.png)



In the command window that opens, type `node sharded-bot.js`
![node](https://i.gyazo.com/a2f31037eb4dd6623da6bbd5a88a236e.png)


If you want to run it with a linux terminal then instead of running it with `bot node.js` you run it `node sharded-bot.js` if you want to provide a different shard count its `node sharded-bot.js shard_count=3` if you wanted 3 shards ( This is usually not needed unless your bot is in 5000 guilds.  )

**If you want to do anything across shards.  You will need to use** [`client.shard.broadCastEval()`](https://discord.js.org/#/docs/main/stable/class/ShardClientUtil?scrollTo=broadcastEval)

**Please read the API docs!**

