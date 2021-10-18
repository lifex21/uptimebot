const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require('express')().listen(1343)
const http = require("http");
const express = require("express");
const kontrol = require("node-fetch");
const data = require('quick.db');
require("./util/eventLoader")(client);

client.ayarlar = {"prefix": "a!", "sahip": ["627543270985170958", "627543270985170958", "627543270985170958"] };

////////////////////////////////////////////// KOMUT ALGILAYICI TR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar-commands/TR-Komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} TR KOMUT !`);
  files.forEach(f => {
    let props = require(`./komutlar-commands/TR-Komutlar/${f}`);
    console.log(`TR KOMUTLAR ==> ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});



////////////////////////////////////////////// KOMUT ALGILAYICI EN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar-commands/EN-Komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} US KOMUT !`);
  files.forEach(f => {
    let props = require(`./komutlar-commands/EN-Komutlar/${f}`);
    console.log(`EN COMMANDS ==> ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar-commands/TR-Komutlar/${command}`)];
      let cmd = require(`./komutlar-commands/TR-Komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar-commands/TR-Komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar-commands/TR-Komutlar/${command}`)];
      let cmd = require(`./komutlar-commands/TR-Komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

client.login("ODk3MTEyOTk5NjIwNDAzMjUw.YWQ7lg.RIgbQFzMLAqavjC4qX_qE_KOL-A");
const linkler = data.fetch('chimped');
client.on('ready',async () => {
console.log("`" + client.user.username + "` Başarıyla Aktif Hale getirildi!");
client.user.setPresence({ activity: { type: 'WATCHING', name: `%100 Uptime | a!yardım`}, status: "idle" });
})
setInterval(() => {
const linkler = data.fetch('chimped');
if(linkler) {
if(linkler.length > 0) {
linkler.forEach(s => {
kontrol(s.site).catch(err => {
console.log('');
console.log(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
console.log('');//! 
})
console.log(`${s.site} uptime edildi. Sahibi: ${s.sahipTag}`);
})
}
}
}, 60000)


client.on('ready', ()=>{
client.channels.cache.get('897124802802892891').join()
})





////////////////////////////////////////////// EN MENÜ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const dbuttons = require("discord-buttons");
dbuttons(client);
const { MessageMenu, MessageMenuOption } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

client.on("message", async message => {
    if(message.content.startsWith("a!yardım")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("[TR] Yardım")
        .setValue("TRYardım")
        .setDescription("Türkçe Komutlar! ")
        .setDefault()
        .setEmoji("🇹🇷")
        
        let secenek2 = new MessageMenuOption()
        .setLabel("[EN] Help")
        .setValue("ENHelp")
        .setDescription("English Commands! ")
        .setDefault()
        .setEmoji("🇺🇸")
     
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Dil Seçiniz - Select Language !")
        .addOption(secenek1)
        .addOption(secenek2)
  const EnHelp = new MessageEmbed()
          .setTitle("Help")
.setDescription(`

**●▬▬▬▬▬▬▬【 Founders 】▬▬▬▬▬▬▬● **

Lead#0002 = <@854821083260518400>

**●▬▬▬▬▬▬▬【 Help Menu 】▬▬▬▬▬▬▬● **

**● \`a!links add (Links)\` ➜ You add a link to the system.**
**● \`a!links delete (Links)\` ➜ You delete the link from the system.**
**● \`a!links list\` ➜ You look at your links.**
**● \`a!statistics\` ➜ Look at the Statistics.**
**● \`a!invite\` ➜ Invite the bot.**

\`\`\`Founder Private\`\`\`

**● \`a!blacklist\` ➜ black list.**

\`\`\`Note\`\`\`
**Friends, Please Use the Bot from Dm \`u!links list\` If you type, your links appear.**

**●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●**
`)
        .setFooter("Test")
        .setColor("BLUE")
        .setTimestamp()


////////////////////////////////////////////// TR MENÜSÜ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    const TRYardım = new MessageEmbed()
.setDescription(`

**●▬▬▬▬▬▬▬【 Yapımcılar 】▬▬▬▬▬▬▬● **

Lead#0002 = <@854821083260518400>

**●▬▬▬▬▬▬▬【 Yardım Menüm 】▬▬▬▬▬▬▬● **

**● \`a!link ekle (Link)\` ➜ Sisteme Link Eklersiniz.**
**● \`a!link sil (Link)\` ➜ Sistemden Link Silersiniz.**
**● \`a!link liste\` ➜ Linklerinize Bakarsınız.**
**● \`a!istatistik\` ➜ İstatistiklere Bakarsın.**
**● \`a!davet\` ➜ Botu Davet Edersin.**

\`\`\`Kurucu Özel\`\`\`

**● \`a!karaliste\` ➜ Karaliste Alınır.**

\`\`\`Not\`\`\`
**Arkadaşlar Botu Lütfen Dm'den Kullanın \`a!link liste\` Yazarsanız Linkleriniz Görünüyor.**

**●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●**
`)
        .setColor("BLUE")
        .setTimestamp()
 let menumesaj = await  message.channel.send("**Dil Seçiniz - Select Language a!**", menu)
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "TRYardım":
                    menu.reply.send(TRYardım, true)
                break;
                case "ENHelp":
                    menu.reply.send(EnHelp, true)
                break;

            }
        }
        client.on("clickMenu", menu => {
            if(menu.message.id == menumesaj.id) {
                if(menu.clicker.id == message.author.id) {
                    menuselection(menu)
                }else{
                    menu.reply.send("Menü sahibi değilsin.", true)
                }
            }
        })
    }
})