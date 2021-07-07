// Made by TheMonDon#1721
// Some code by General Wrex
const version = '1.0.0';

// Include discord.js and original check
const {version: _version, ShardingManager} = require('discord.js');
if (_version < "12.0.0") {
	console.log("This version of Discord Bot Maker requires Discord.JS v12.\nPlease use \"Project > Module Manager\" and \"Project > Reinstall Node Modules\" to update to Discord.JS v12.");
	throw new Error('Need Discord.JS v12 to Run!!!');
}

console.log('---------------------------------------------');
console.log('TheMonDon\'s DBM Bot Sharder');
console.log(`Version: ${version}`);
console.log('You can change the amount of shards by providing \'shard_count=[number]\' (default: auto)')
console.log('---------------------------------------------');

let totalShards = 'auto';

const args = process.argv
	.slice(2)
	.map((val, i)=>{
	let object = {};
	let [regexForProp, regexForVal] = (() => [new RegExp('^(.+?)='), new RegExp('\=(.*)')] )();
	let [prop, value] = (() => [regexForProp.exec(val), regexForVal.exec(val)] )();
	if (!prop){
		object[val] = true;
		return object;
	} else {
		object[prop[1]] = value[1] ;
		return object
	}
	})
	.reduce((obj, item) => {
	let prop = Object.keys(item)[0];
	obj[prop] = item[prop];
	return obj;
	}, {});

	if(args && args.shard_count){
		console.log(`Command Line Arg: shard_count=${args.shard_count}`)
		totalShards = Number(args.shard_count);
	}


console.log(`Starting the DBM Bot with ${totalShards} total shards...`)

function getToken() {
	// dbm's encryption system
	const crypto = require('crypto');
	let password = '';

	try {
		password = require('discord-bot-maker');
	} catch {}

	const decrypt = (text) => {
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
}

// Create your ShardingManger instance
const manager = new ShardingManager('./bot.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    totalShards,
    token: getToken()
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();