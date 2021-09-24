const Discord = require('discord.js');
const { logs } = require('./config.json');
const fs = require('fs');

/**
 * @param {string} message
 */
const createLog = (message) => {
  const today = new Date();
  console.log(`[LOG:${today.toISOString()}] ${message}`);
};

/**
 * @param {string} message
 */
const createError = (message) => {
  const today = new Date();
  console.error(`[ERROR:${today.toISOString()}] ${message}`);
};

/**
 * @param {string} message
 */
const createWarn = (message) => {
  const today = new Date();
  console.warn(`[WARN:${today.toISOString()}] ${message}`);
};

/**
 * @param {Discord.Client} client
 * @param {string} postInChannelId Discord.Channel.id
 * @param {string} type success | info | warning | error
 * @param {string} causedByGuildMemberId Discord.GuildMember.id
 * @param {string} causedBy What did cause the event?
 * @param {string} message What excatly happend?
 */
const createEmbedLog = (
  client,
  postInChannelId,
  type = 'info',
  causedByGuildMemberId,
  causedBy,
  message
) => {
  const channel = client.channels.cache.find(
    (channel) => channel.id == postInChannelId
  );
  if (channel.type !== 'text') {
    createError(`Channel '${postInChannelId}' ist kein Textkanal!`);
    return;
  }

  var messageColor, messageTitle;
  switch (type) {
    case 'success':
      messageTitle = 'Mitteilung';
      messageColor = logs.colors.success;
      break;

    case 'warn':
      messageTitle = 'Warnung';
      messageColor = logs.colors.warning;
      break;

    case 'error':
      messageTitle = 'Fehlermeldung';
      messageColor = logs.colors.error;
      break;

    case 'info':
    default:
      messageTitle = 'Information';
      messageColor = logs.colors.information;
      break;
  }

  const msg = {
    content: ``,
    embed: {
      title: messageTitle,
      color: messageColor,
      fields: [
        {
          name: 'Handlung',
          value: causedBy,
          inline: true,
        },
        {
          name: 'Verursacht durch',
          value: `<@${causedByGuildMemberId}>`,
          inline: true,
        },
        {
          name: 'Nachricht',
          value: message,
          inline: false,
        },
      ],
    },
  };

  channel
    .send(msg)
    .then(() => createLog("Log for '" + message + "' was sent!"))
    .catch((err) => createError(err));
};

/**
 * @param {Discord.Client} client
 * @param {string} postInChannelId Discord.Channel.id
 * @param {Discord.GuildMember} newMember
 */
const sendWelcomeMessage = (client, postInChannelId, newMember) => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === postInChannelId
  );
  if (channel.type !== 'text') {
    createError(`Channel '${postInChannelId}' ist kein Textkanal!`);
    return;
  }

  const msg = {
    embed: {
      title: `Willkommen ${newMember.user.username},`,
      description: `wir heißen dich auf dem Discord-Server der DulliAG herzlich willkommen. Für mehr Informationen über die DulliAG besuche doch unsere [Webseite](https://dulliag.de) und am besten schaust du dir mal unsere allgemeines Verhaltensregeln an.`,
      color: logs.colors.success,
      timestamp: new Date(),
      author: {
        name: newMember.user.username,
        icon_url: newMember.avatarURL,
      },
    },
  };

  channel
    .send(msg)
    .then(() =>
      createLog(
        "Willkommensnachricht für '" +
          newMember.user.username +
          "' wurde verschickt!"
      )
    )
    .catch((err) => createError(err));
};

/**
 * @param {Discord.GuildMember} member
 * @returns {boolean}
 */
const isBot = (member) => {
  return member.bot;
};

/**
 *
 * @param {Discord.GuildMember} member
 * @param {string[]} requiredPermissions
 * @returns {boolean}
 */
const hasPermission = (member, requiredPermissions) => {
  var hasPermissions = true;
  requiredPermissions.forEach((perm) => {
    if (!member.hasPermission(perm)) hasPermission = false;
  });
  return hasPermissions;
};

/**
 * @deprecated
 * @param {Discord.Message} message
 * @param {string[]} requiredPermissions Contains permissions which are allowed to use this execute this command
 * @param {string} prefix DEFAULT: "!"; Defines the command prefix.
 * @param {string[]} blacklist
 * @returns {boolean}
 */
const checkCommand = (
  message,
  requiredPermissions,
  prefix = '!',
  blacklist = []
) => {
  if (isBot(message.member)) return; // Check if the message author is an Discord-bot

  createLog(`${message.author.username} tried command '${message.content}'`);

  if (message.content.substr(0, prefix.length) !== prefix) return; // Check if the command is an actuall bot command

  if (blacklist.includes(prefix)) return; // Check if the command-prefix is blacklisted

  return hasPermission(message.member, requiredPermissions);
};

/**
 * @param {Discord.Client} client
 * @param {string} activity
 * @returns {void}
 */
const setActivity = (client, activity) => {
  client
    .setActivity(activity)
    .then(() =>
      createLog(
        "Activity for '" +
          client.user.username +
          "' was set to '" +
          bot.activity +
          "'!"
      )
    )
    .catch((err) => createError(err));
};

/**
 *
 * @param {string} filePath
 * @returns {boolean}
 */
const credentialFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 *
 * @param {string} filePath DEFAULT: "./credentials.json"
 * @param {object} content
 * @returns {boolean}
 */
const createCredentialFile = (
  filePath = './credentials.json',
  content = { bot: { token: 'ENTER_TOKEN', clientId: 'ENTER_CLIENT_ID' } }
) => {
  if (typeof content !== 'object') return false;
  const stringifiedContent = JSON.stringify(content);
  fs.writeFileSync(filePath, stringifiedContent);
  return credentialFileExists(filePath);
};

module.exports = {
  isBot: isBot,
  checkCommand: checkCommand,
  hasPermission: hasPermission,
  log: createLog,
  error: createError,
  warn: createWarn,
  sendEmbedLog: createEmbedLog,
  sendWelcomeMessage: sendWelcomeMessage,
  setActivity: setActivity,
  credentialFileExists: credentialFileExists,
  createCredentialFile: createCredentialFile,
};
