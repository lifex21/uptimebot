const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, chimp) => {
if(message.author.id !== '854821083260518400') return;

if(!chimp[0]) return message.reply("You must enter a user id.");

const user = await client.users.fetch(chimp[0]).catch(err => {
return message.reply('I couldn`t find a user with this id.')});

if(user) {

  if(database.fetch(user.id)) {
  database.delete(user.id);
  return message.channel.send(`\`${user.tag}\` The user named was already blacklisted, it was removed from the blacklist.\nThey will now be able to use the bot's commands.`);
  }
  database.set(user.id, true);
  return message.channel.send(`\`${user.tag}\` The username has been blacklisted.\n\`${user.username}\`No one will be able to use my commands on all servers where Crown is owned.\nIf he is not crowned,\`${user.username}\` still won't be able to use commands.`);

};

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["black-list"],
  permLevel: 0
};
 
exports.help = {
  name: 'blacklist'
};