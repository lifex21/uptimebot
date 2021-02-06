const Discord = require('discord.js')
const db = require('quick.db') 
const client = new Discord.Client({ disableEveryone: true })
const fetch = require('node-fetch')
const fs = require('fs')
require('express')().listen(1343)
const moment = require('moment')
require('moment-duration-format')
const prefix = '!'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const Aventadoria = Linkler.map(Revenge => Revenge.url)
Aventadoria.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')


//////////////////////////////////////// EKLE KOMUTU \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  if(Split[0] == prefix+'ekle') {
  if(message.channel.id !== "796036662123560970") return message.channel.send(":x: Bu komutu sadece <#796036662123560970> kanalında kullanabilirsin!")
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.RichEmbed()
    .setColor('RED')
    .setDescription(`
    **==================================**
    **Link Sistemde Zaten Bulunuyor. ❌** 
    ==================================
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const Emrecan = new Discord.RichEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    **==================================**
    **Botunuz Sistemimize Başarıyla Eklendi. \<a:tik2:796688235916165122>**
    ==================================
    __**Komutu Kullanan Kişi :**__ ${message.author}`)
    .setTimestamp()
    message.channel.send(Emrecan)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {

////////////////////////////////////////////// URL GİRMEME HATASI \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const UpTime = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`
  **==================================**
  **Hata: ${Hata} ❌**

  **Lutfen Bir URL Girin**
  ==================================
  `)
  .setImage('https://cdn.discordapp.com/attachments/796036722349178891/807626838427172894/Screenshot_2.png?width=436&height=269')
  .setTimestamp()
  .setThumbnail(message.author.avatarURL)
  message.channel.send(UpTime)
  })
  }
//////////////////////////////////////// İSTATİSTİK KOMUTU \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  if(Split[0] == prefix+'i') {
  const Istatistik = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }
  if(Split[0] == prefix+'istatistik') {
  const Istatistik = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }

////////////////////////////////////////////// SAY KOMUTU \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  if(Split[0] == prefix+'s') {
  const Revoş = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅**
==================================`)
  message.channel.send(Revoş)
  }
  if(Split[0] == prefix+'say') {
  const Revoş = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅**
==================================`)
  message.channel.send(Revoş)
  }

////////////////////////////////////////////// YARDIM KOMUTU \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  if(Split[0] == prefix+'yardım') {
  const HugoMugo = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setDescription(`
**__Türkiyenin En İyi Uptime Botu!__**

» Prefixim: **${prefix}**
» Dil: **TR**
`)
  .addField('**» Uptime Bot Komutlari**',`
\<a:sagok:796282722921873439> [**${prefix}ekle**]() Link Eklemenize Yarar
\<a:sagok:796282722921873439> [**${prefix}linkler**]() Linklerinizi Gösterir
`)
  .addField('**» Genel Komutlar**',`
\<a:sagok:796282722921873439>[**${prefix}istatistik**]() Bot Istatistigini Atar
\<a:sagok:796282722921873439> [**${prefix}say**]() Total Ve Senin Link Sayini Atar
`)
.setImage('https://i.hizliresim.com/rYv7Z3.gif')
  message.channel.send(HugoMugo)
  }
//////////////////////////////////////// LİNKLER KOMUTU \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.RichEmbed().setColor('#20aaba').setDescription(`**Hiç link eklememişsin. Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.RichEmbed().setColor('#20aaba').setDescription(`**Uptime Etmekte Olduğun Linkler Direkt Mesajlarına Gönderildi . Direkt mesajlarını kontrol et.  ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.RichEmbed().setColor('#20aaba').setDescription(`**» Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL))
    }

////////////////////////////////////////////// BOŞ YER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\    

    if(Split[0] == prefix+'erişim-kontrol') {
const Megenge = new Discord.RichEmbed()
.setColor('#20aaba')
.setThumbnail(message.author.avatarURL)
.setTimestamp()
.setTitle('🎈 Erişim Kontrol')
.setDescription('**» Erişiminiz Aktif**')
message.channel.send(Megenge)
}
})

////////////////////////////////////////////// BOTUN DURUMU \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.on('ready', () => {
client.user.setActivity(`🔥 Astaroth Uptime`, { type: 'WATCHING' })
client.user.setStatus('online')
})

////////////////////////////////////////////// BOT TOKENİ / GİZLENMİŞTİR / BAK ALDIN ŞUAN TOKENİ YARRAM SENİ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
client.login(process.env.TOKEN);