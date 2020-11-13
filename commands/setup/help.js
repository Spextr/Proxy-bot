const discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('../../config.json');

module.exports = {
  config: {
    name: "help",
    aliases: [],
    guildOnly: false,
    ownerOnly: false,
    adminOnly: false,
    permissions: null,
    clientPermissions: null,
    cooldown: null,
    group: "setup",
    description: "this will help you enable xp",
    examples: [],
    parameters: []
  },
  run: async (client, message) => {

    const embed = new discord.MessageEmbed()
    .setTitle("ProxyBot Commands")
    .addField("p!proxy", "This Genorates a Proxy")
    .addField("p!ping", "This will get the bots ping")
    .addField("p!feedback", "This sends a dm to the owner with your feedback")
    .setColor("RANDOM")
    message.author.send(embed)
    message.channel.send("I sent you a dm!")
}       
}
    

function error(err){
  return new MessageEmbed()
  .setColor('RED')
  .setDescription(`\u200B\n${err}\n\u200B`)
}