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

### isBot

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.isBot(member: Discord.GuildMember) : void;
```

### checkCommand

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.checkCommand(message: Discord.Message, requiredPermissions: string[]) : boolean;
```

### hasPermission

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.hasPermission(member: Discord.GuildMember, requiredPermissions: string[]) : boolean;
```

### log

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.log(message: string) : void;
```

### error

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.error(message: string) : void;
```

### warn

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.warn(message: string) : void;
```

### sendEmbedLog

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.sendEmbedLog(
  client: Discord.Client,
  postInChannelId: string,
  type = 'info': string,
  causedByGuildMemberId: string,
  causedBy: string,
  message: string
) : void;
```

### sendWelcomeMessage

```js
const Discord = require("discord.js")
const helper = require('@dulliag/discord-helper');

helper.sendWelcomeMessage(
  client: Discord.Client,
  postInChannelId: string,
  newMember: Discord.GuildMember
) : void;
```

## How to publish

1. Increase the version using the command `npm version [major|minor|patch]`

2. Make sure you are logged in `npm login`

3. After this publish this package by using the `npm publish --access public` command
