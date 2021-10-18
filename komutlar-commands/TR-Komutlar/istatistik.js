const Discord = require("discord.js");
const kontrol = require('node-fetch');
const checker = require('site-checker');
const moment = require("moment");
const data = require('quick.db');
const os = require("os");
const linkler = data.fetch('chimped');
require("moment-duration-format");

exports.run = async (client, message, args) => {

  const payidarzaman = moment

    .duration(client.uptime)


    .format(" D [gün], H [saat], m [dakika], s [saniye]");

  const istatistikler = new Discord.MessageEmbed()

    .setColor("RANDOM")

    .addField("**__Ping__**",`Mesaj Gecikmesi: ${new Date().getTime() - message.createdTimestamp} ms\n  Bot Gecikmesi: ${client.ws.ping}ms`, true)

    .addField("**__Kullanıcı Sayısı__** ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)

    .addField("**__Sunucu Sayısı__**", `${client.guilds.cache.size.toLocaleString()}`, true)

    .addField("**__Kanal Sayısı__**", `${client.channels.cache.size.toLocaleString()}`, true)

    .addField("**__Aktiflik__**", `${payidarzaman}`, true)

  return message.channel.send(istatistikler);

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ['i'],

  permLevel: 0

};

exports.help = {

  name: "istatistik",

  description: "is",

  usage: "is"

};