const Discord = require('discord.js');

exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
.setDescription(`>>> ${client.user} when using please \`@${client.user.username}\` role keep it up high!

**Botu Davet Etmek İçin:** [Buraya tıkla](https://discord.com/api/oauth2/authorize?client_id=897112999620403250&permissions=8&scope=bot)
\`\`\`discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\`\`\`

**For Support Server:** [Click here](https://discord.gg/UhnzKpztUu)
\`\`\`https://discord.gg/UhnzKpztUu\`\`\``));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'invite'
};