// Created by General Wrex under the MIT license.
// Thanks to EGGSY#3388 for testing and the initial idea!
// My Patreons have made creating this script possible @ https://www.patreon.com/generalwrex
// At the time of editing this script, they are:
// - MitchDaGamer
//
// Thanks so much guys, you allow me to continue to do what i love!	
// I now accept donations through donorbox: https://donorbox.org/generalwrex
// and also direct to my paypal: https://www.paypal.me/generalwrex
//---------------------------------------------------------------------

const { r, g, b, w, c, m, y, k } = [
  ['r', 1], ['g', 2], ['b', 4], ['w', 7],
  ['c', 6], ['m', 5], ['y', 3], ['k', 0],
].reduce((cols, col) => ({
  ...cols,  [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`
}), {})


console.log(g('---------------------------------------------'))
console.log(g('General Wrex\'s DBM Bot Sharder\r\n'))
console.log(y('Version alpha-1.0.1\r\n\r\n'))
console.log(r(`Ask in the DBM Mods guild for help! https://discord.gg/Y4fPBnZ`))
console.log(g(`You can change the amount of shards by providing'shard_count=[number]'\r\n`))
console.log(r(`e.x node sharded-bot.js shard_count=3\r\n\r\n`))
//console.log(y(`you may type 'quit' at anytime to stop all the shards,\nand type directly into the console to broadcast a message to all shards\r\nthis is for a future update`))
console.log(g('---------------------------------------------'))

var totalShards = 2;


	const args = process.argv
	  .slice(2)
	  .map((val, i)=>{
		let object = {};
		let [regexForProp, regexForVal] = (() => [new RegExp('^(.+?)='), new RegExp('\=(.*)')] )();
		let [prop, value] = (() => [regexForProp.exec(val), regexForVal.exec(val)] )();
		if(!prop){
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
		totalShards = args.shard_count;
	}


console.log(y(`Starting the DBM Bot with ${totalShards} total shards...`))


var token = require(__dirname + "/data/settings.json").token;


if(!token){
	
	console.error(r(`Token must be supplied in 'settings.json' in the data folder, double check your bot settings!`))
	return;
}

const Discord = require('discord.js');
const manager = new Discord.ShardingManager('./bot-shard.js', {
	token: token 
	});
	
manager.spawn(Number(totalShards)); 

var loadedShards = 0;

manager.on('launch', shard => {
	console.log(g(`Successfully launched shard with ID of ${shard.id}`))		
});


manager.on("message", (shard, message) => {	
	if(message !== undefined){
		if(typeof message === 'object'){
			
			//console.log(y("Event from shard " + shard.id + " :[" + message.name + "] "));	
	 
	 		if(message.name === "init"){
				if((manager.shards.array().length) == manager.totalShards ){
					shard.send('shardsloaded', manager);
					console.log(g("All Shards Loaded!"))
				}else{
					console.log(g(`Successfully launched shard with ID of ${shard.id}`))	
				}
			}
	 
			if(message.name === "shard"){
				shard.send({ name: "shardresponse", data: shard.id });
			}
	 
		}else{   
				
		}
		
	}		
});


var readline = require('readline');
var log = console.log;

var rl = readline.createInterface({
	input: process.stdin,
	 output: process.stdout
});

var recursiveAsyncReadLine = function () {
	rl.question('', function (answer) {
		if (answer == 'exit'){
			process.exit(0);			
		} else {
			manager.broadcast(answer)		
		} 

		log('Sending ' + answer + " to all shards...");
		recursiveAsyncReadLine(); //Calling this function again to ask new question
	});
};

//recursiveAsyncReadLine(); //we have to actually start our recursion somehow
	



