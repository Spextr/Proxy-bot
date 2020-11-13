const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const config = require('../../config.json');
const proxyscrape = require('proxyscrape');
const ProxyscrapeAPI = new proxyscrape();
const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];

module.exports = {
  config: {
    name: "proxy",
    aliases: [],
    guildOnly: false,
    ownerOnly: false,
    adminOnly: false,
    permissions: null,
    clientPermissions: null,
    cooldown: null,
    group: "genorator",
    description: "this will make the latest proxy list",
    examples: [],
    parameters: []
  },
  run: async (client, message) => {
     
     
    ProxyscrapeAPI.getProxies({
        proxytype: 'all',
        timeout: 2500,
        country: 'us'
    }).then(amount => {
        message.author.send(amount);
    }).catch(err => {
        console.log(err);
        message.channel.send(err);
    })
    message.channel.send("I have sent you a proxy list")

}
}
    

function error(err){
  return new MessageEmbed()
  .setColor('RED')
  .setDescription(`\u200B\n${err}\n\u200B`)
}