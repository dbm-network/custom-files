// Made by TheMonDon#1721
// Some code by General Wrex

// If you don't want auto sharding amount change this to the amount of shards you want:
// const totalShards = 2
const totalShards = 'auto'

// Include discord.js and original check
const DiscordJS = require('discord.js');
if (DiscordJS.version < "12.0.0") {
	console.log("This version of Discord Bot Maker requires Discord.JS v12.\nPlease use \"Project > Module Manager\" and \"Project > Reinstall Node Modules\" to update to Discord.JS v12.");
	throw new Error('Need Discord.JS v12 to Run!!!');
}

function getToken() {
	// dbm's encryption system
	const crypto = require('crypto');
	let password = '';

	try {
		password = require('discord-bot-maker');
	} catch {}

	const decrypt = function (text) {
		if (password.length === 0) return text;
		const decipher = crypto.createDecipheriv('aes-128-ofb', password);
		let dec = decipher.update(text, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	};

	const fs = require('fs');
	const path = require('path');	
	const filePath = path.join(process.cwd(),'data', 'settings.json');


	if (fs.existsSync(filePath)){
		let content = fs.readFileSync(filePath) 
		try {
			if (typeof content !== 'string' && content.toString) content = content.toString();
			return JSON.parse(decrypt(content)).token;
		} catch(e) {
			console.error(`There was issue parsing settings.json!`);
            return;
		}
	} else {
		console.error(`settings.json does not exist!`);
        return;
	}					
}

if (!getToken()){	
	console.error(`Token must be supplied in 'settings.json' in the data folder, double check your bot settings!`);
	return;
}

// Create your ShardingManger instance
const manager = new DiscordJS.ShardingManager('./bot.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    totalShards,
    token: getToken()
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();