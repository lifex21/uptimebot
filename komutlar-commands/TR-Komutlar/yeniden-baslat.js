const Discord = require('discord.js');
const bot = new Discord.Client();


module.exports.run = async (bot, message, args) => { 
   
  var embed2 = new Discord.MessageEmbed()   
      .setTitle('Merhaba')
      .setDescription('sadece sahibim bu komutu  kullanabilir! Yani ! Lead#0002')
      .setColor('RED') 
  

  if(message.author.id !== "854821083260518400") return message.channel.send(embed2)
     

  var embed = new Discord.MessageEmbed()   
      .setTitle('**Merhaba Sahibim Lead,**')
      .setDescription('Beni yeniden başlatmak  istediğine eminsen aşağıdaki **TİK** işaretine, bir kere dokunur musun?')
      .setColor('RANDOM')
message.channel.send(embed).then(async function (sentEmbed) {
			const emojiArray = ["✅"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 30000
			});
reactions.on("end", () => message.delete().then(mr => sentEmbed.delete()).then(m => message.delete()).then(m2 => message.author.send("Yeniden Başlatma İşlemi iptal ettim! "))) 
    reactions.on("collect", async function (reaction) {
				if (reaction.emoji.name === "✅") {
  try {
    message.delete().then(mr => sentEmbed.delete()).then(wb => { 
 console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
    })
  } catch (err) {

    message.channel.send(`**Hata:** \n\`\`\`js\n${err}\n\`\`\``);
  
};

        }
    })
})

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yenidenbaşlat'],
  permLevel: 0
};

module.exports.help = {
  name: 'reboot',
  description: 'Sistemi yeniden başlatır',
  usage: 'reboot'
};