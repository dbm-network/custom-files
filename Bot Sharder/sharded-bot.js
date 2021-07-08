// Made by TheMonDon#1721
// Some code by General Wrex
const version = '1.0.1';

// Include discord.js and original check
const { version: djsVersion, ShardingManager } = require('discord.js');
if (djsVersion < '12.0.0') {
  console.log('This version of Discord Bot Maker requires Discord.JS v12.\nPlease use "Project > Module Manager" and "Project > Reinstall Node Modules" to update to Discord.JS v12.');
  throw new Error('Need Discord.JS v12 to Run!!!');
}

console.log('-'.repeat(50));
console.log('TheMonDon\'s DBM Bot Sharder');
console.log(`Version: ${version}`);
console.log('You can change the amount of shards by providing \'shard_count=[number]\' (default: auto)');
console.log('-'.repeat(50));

let totalShards = 'auto';

const args = process.argv
  .slice(2)
  .map((val, i) => {
    const object = {};
    const [regexForProp, regexForVal] = (() => [/^(.+?)=/, /=(.*)/])();
    const [prop, value] = (() => [regexForProp.exec(val), regexForVal.exec(val)])();
    if (!prop) {
      object[val] = true;
      return object;
    } else {
      object[prop[1]] = value[1];
      return object;
    }
  })
  .reduce((obj, item) => {
    const prop = Object.keys(item)[0];
    obj[prop] = item[prop];
    return obj;
  }, {});

if (args && args.shard_count) {
  totalShards = parseInt(args.shard_count, 10);
  console.log(`Command Line Arg: shard_count=${totalShards}`);
}

console.log(`Starting the DBM Bot with ${totalShards} total shards...`);

// dbm's encryption system
const crypto = require('crypto');
let password = '';
let token;

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
const filePath = path.join(process.cwd(), 'data', 'settings.json');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath);
  try {
    if (typeof content !== 'string' && content.toString) content = content.toString();
    token = JSON.parse(decrypt(content)).token;
  } catch {
    console.error('There was issue parsing settings.json!');
  }
} else {
  console.error('Could not find the settings.json file');
}

if (!token) console.error('Token must be supplied in \'settings.json\' in the data folder, double check your bot settings!');

// Create your ShardingManger instance
const manager = new ShardingManager('./bot.js', {
  // for ShardingManager options see:
  // https://discord.js.org/#/docs/main/v12/class/ShardingManager
  totalShards,
  token
});

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

manager.spawn();
