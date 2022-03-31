import {
  ActivityOptions,
  Client,
  GuildMember,
  Message,
  PermissionResolvable,
} from 'discord.js';
import { existsSync, writeFileSync } from 'fs';

export const log = (message: string) =>
  console.log(`[LOG:${new Date().toISOString()}] ${message}`);

export const info = (message: string) =>
  console.log(`[INFO:${new Date().toISOString()}] ${message}`);

export const warn = (message: string) =>
  console.log(`[WARN:${new Date().toISOString()}] ${message}`);

export const error = (message: string) =>
  console.log(`[ERROR:${new Date().toISOString()}] ${message}`);

export const isBot = (member: GuildMember) => {
  return member.user.bot;
};

export const hasPermission = (
  member: GuildMember,
  requiredPermissions: PermissionResolvable[]
): boolean => {
  let hasPermissions = true;
  requiredPermissions.forEach((permission) => {
    if (!member.hasPermission(permission)) hasPermissions = false;
  });
  return hasPermissions;
};

/**
 * @deprecated
 */
export const checkCommand = (
  message: Message,
  requiredPermissions: PermissionResolvable[],
  prefix: string = '!',
  blacklist: string[] = []
) => {
  if (isBot(message.member)) return; // Check if the message author is an Discord-bot

  if (message.content.substr(0, prefix.length) !== prefix) return; // Check if the command is an actuall bot command

  if (blacklist.includes(prefix)) return; // Check if the command-prefix is blacklisted

  return hasPermission(message.member, requiredPermissions);
};

export const setActivity = (client: Client, activity: ActivityOptions) => {
  return client.user.setActivity(activity);
};

export const credentialFileExists = (filePath: string) => {
  return existsSync(filePath);
};

export const createCredentialFile = (
  filePath: string = './credentials.json',
  content: object = {
    bot: { token: 'ENTER_TOKEN', clientId: 'ENTER_CLIENT_ID' },
  }
) => {
  if (typeof content !== 'object') return false;
  writeFileSync(filePath, JSON.stringify(content));
  return credentialFileExists(filePath);
};

export const wait = (time: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, time));
};

export const getFeaturedServers = (client: Client) => {
  return client.guilds.cache;
};
