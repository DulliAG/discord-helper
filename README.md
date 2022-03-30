# @dulliag/discord-helper

![npm](https://img.shields.io/npm/v/@dulliag/discord-helper?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/@dulliag/discord-helper?label=Downloads&style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@dulliag/discord-helper?style=for-the-badge)

## Topics

- [Installation](#installation)
- [This package contains](#this-package-contains)
- [How to build](#how-to-build)

## Installation

## This package contains...

- [isBot](#isbot)
- [checkCommand](#checkcommand)
- [hasPermission](#haspermission)
- [log](#log)
- [error](#error)
- [warn](#warn)
- [sendEmbedLog](#sendembedlog)
- [sendWelcomeMessage](#sendwelcomemessage)
- [setActivity](#setactivity)
- [credentialFileExists](#credentialfileexists)
- [createCredentialFile](#createcredentialfile)
- [wait](#wait)
- [getFeaturedServers](#getfeaturedservers)

### isBot

```js
const Discord = require("discord.js");
const helper = require('@dulliag/discord-helper');

helper.isBot(member: Discord.GuildMember) : void;
```

### checkCommand

```js
const Discord = require("discord.js");
const helper = require('@dulliag/discord-helper');

helper.checkCommand(message: Discord.Message, requiredPermissions: string[]) : boolean;
```

### hasPermission

```js
const Discord = require("discord.js");
const helper = require('@dulliag/discord-helper');

helper.hasPermission(member: Discord.GuildMember, requiredPermissions: string[]) : boolean;
```

### log

```js
const Discord = require("discord.js");
const helper = require('@dulliag/discord-helper');

helper.log(message: string) : void;
```

### error

```js
const Discord = require("discord.js");
const helper = require('@dulliag/discord-helper');

helper.error(message: string) : void;
```

### warn

```js
const Discord = require("discord.js");
const helper = require('@dulliag/discord-helper');

helper.warn(message: string) : void;
```

### setActivity

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const helper = require('@dulliag/discord-helper');

client.on("ready" () => {
  helper.setActivity(client, "Use @dulliag/discord-helper");
});
```

### credentialFileExists

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const helper = require('@dulliag/discord-helper');

// This equals the default content
// You can use any pattern u want
const credentialContent = {
  bot: {
    token: "ENTER_TOKEN",
    clientId: "ENTER_CLIENT_ID",
  }
};
if (!helper.credentialFileExists("./credentials.json")) {
  helper.error("There is no credential file given. You should create an...");
  process.exit(0); // Stop the bot
}

const { bot } = require("./credentials.json");

client.on("ready" () => {
  helper.setActivity(client, "Use @dulliag/discord-helper");
});

client.login(bot.token);
```

### createCredentialFile

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const helper = require('@dulliag/discord-helper');

// This equals the default content
// You can use any pattern u want
const credentialContent = {
  bot: {
    token: "ENTER_TOKEN",
    clientId: "ENTER_CLIENT_ID",
  }
};
if (!helper.credentialFileExists("./credentials.json")) {
  const success = helper.createCredentialFile(settings.credentials, credentialContent);
  success
    ? helper.log("Credential file created!")
    : helper.error("Creation of credential file failed!");
  process.exit(0); // Stop the bot
}

const { bot } = require("./credentials.json");

client.on("ready" () => {
  helper.setActivity(client, "Use @dulliag/discord-helper");
});

client.login(bot.token);
```

### wait

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const helper = require('@dulliag/discord-helper');

client.on("ready" () => {
  helper.log("Bot started!");
  helper.wait(10 * 1000); // wait 10s before updating the activity
  helper.setActivity(client, "Use @dulliag/discord-helper");
});
```

### getFeaturedServers

> NOTE: You could get client.guilds.cache instead of using helper.getFeaturedServers(client);

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const helper = require('@dulliag/discord-helper');

client.on("ready" () => {
  helper.log("Bot started!");
  helper.setActivity(client, "Use @dulliag/discord-helper");
  helper.getFeaturedServers(client).forEach((guild) => {
    helper.log("Bot is running on guild " + guild.name);
  })
});

```

## How to publish

1. Increase the version using the command `npm version [major|minor|patch]`

2. Make sure you are logged in `npm login`

3. After this publish this package by using the `npm publish --access public` command
