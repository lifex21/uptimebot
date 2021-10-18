const Discord = require('discord.js');
const bot = new Discord.Client();


module.exports.run = async (bot, message, args) => { 
   
  var embed2 = new Discord.MessageEmbed()   
      .setTitle('Hello there')
      .setDescription('Only my owner can use this command!')
      .setColor('RED') 

  if(message.author.id !== "854821083260518400") return message.channel.send(embed2)
     
  var embed = new Discord.MessageEmbed()   
      .setTitle('**Hello Owner ! Lead**')
      .setDescription('If you`re sure you want to reboot me, can you tap the **TIK** sign below once?')
      .setColor('RANDOM')[YOUTUBE]
message.channel.send(embed).then(async function (sentEmbed) {
			const emojiArray = ["✅"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 30000
			});
reactions.on("end", () => message.delete().then(mr => sentEmbed.delete()).then(m => message.delete()).then(m2 => message.author.send("I canceled the Restart Process!"))) 
    reactions.on("collect", async function (reaction) {
				if (reaction.emoji.name === "✅") {
  try {
    message.delete().then(mr => sentEmbed.delete()).then(wb => { 
 console.log(`BOT: The bot is restarting...`);
    process.exit(0);
    })
  } catch (err) {
  // Pudochu
    message.channel.send(`**Error:** \n\`\`\`js\n${err}\n\`\`\``);
  
};

        }
    })
})

};

module.exports.conf = {//! Development's Code Subscribe ! | ! Development's Code Abone Ol ! [YOUTUBE]
  enabled: true,
  guildOnly: false,
  aliases: ['r', 'Reboot', 'yenidenbaşlat', 'yenile', 'rebot', 'rebooot', 'reboott', 'treboot'],
  permLevel: 0
};//! Development's Code Subscribe ! | ! Development's Code Abone Ol ! [YOUTUBE]

module.exports.help = {
  name: 'reboot',
  description: 'Sistemi yeniden başlatır',
  usage: 'reboot'
};//! Development's Code Subscribe ! | ! Development's Code Abone Ol ! [YOUTUBE]