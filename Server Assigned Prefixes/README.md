
# DBM Mods Server Assigned Prefixes

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

**More To Come**

People will eventually create commands using this, they will be listed somewhere in the readme!


