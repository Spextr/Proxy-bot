const { MessageEmbed } = require('discord.js')
const { default : { prefix }, website, repo } = require('../settings.json')

module.exports = (client, guild) => {

  channel = guild.systemChannel || guild.channels.cache.filter(c => c.type === 'text' && c.parent).first()

  channel.send(new MessageEmbed()
  .setColor(0x2f3136)
  .setTitle('Hi Everyone!')
  .setDescription(`Thank you for inviting me to **${guild.name}**!\n\nMy name is **Plxsma**, a discord bot that comes with many commands🥰*.\n\nI'm a multipurpose bot capable of integrating XP and Points system, customizing welcome and goodbye messages, searching anime and announcing airing anime and many more!\n\nGet started by typing \`${prefix}help\`\n If You are the guild owner, you can set my prefix using ${prefix}setprefix [new prefix] .\n\n \n\u200B`)
  .setFooter('Created with 💖 by Spextr')
  .setThumbnail(client.user.displayAvatarURL({format:'png',dynamic:true,size:1024}))
)

}
