
# DBM Mods Server Assigned Prefixes


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



# Scripts And Commands

----------------------------------------------------------------------------------------------------------------------------------------

**Get Used Prefix**

This snippet will show the prefix used on the server, that was set in the serverPrefixes.json
```js
${server.prefix}
```

**More To Come**

People will eventually create commands using this, they will be listed somewhere in the readme!


