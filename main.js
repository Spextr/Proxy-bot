const name = "Lightz"
const { green, yellow, red, magenta, cyan } = require('chalk')
console.log(`\n\n<----------- Booting up ${cyan(`${name}-Bot`)} ----------->`)
console.log(`Upon booting, you might notice some of these log headers:`)
console.log(`${yellow(`[${name}-WARN]`)} - Warn about some errors in the code, it can be dismissed.`)
console.log(`${green(`[${name}-SUCCESS]`)} - Alerts that a process has been successfully executed.`)
console.log(`${red(`[${name}-FAIL]`)} - Alerts about a fatal error that might make the bot dysfunctional. Follow instructions, this can't be dismissed.`)
console.log(`${magenta(`[${name}-Promise ERROR]`)} - Appears when debugging mode is on - Alert when a promise is being rejected which are not caught.`)
console.log(`--------------------------------------------\n\n`)



const { Client, Collection } = require('discord.js')
const { readdir } = require('fs')
const { commanddir, prodtoken } = require('./settings.json')
const { token } = require('./config.json')


const Karuma = new Client()
Karuma.mongoose = require('./models/mongoose')



Karuma.commands = new Collection()
Karuma.musicQueue = new Collection()
Karuma.cooldowns = new Collection()
Karuma.guildsettings = new Collection()
Karuma.xp = new Collection()
Karuma.memes = new Collection()
Karuma.economy = new Collection()
Karuma.read = new Collection()
Karuma.quiz = new Collection()



commanddir.forEach( dir => {

  readdir(`./commands/${dir}`, (err,files) => {

    if (err) {

      console.log(`${yellow(`[${name}-WARN]`)} : Couldn't find the Directory /${dir}/`)

    } else {

      let jsfile = files.filter( f => f.split(".").pop() === 'js')

      if (!jsfile.length) {

        console.log(`${yellow(`[${name}-WARN]`)} : The ${dir} command database is empty!`)

      } else {

        jsfile.forEach( (f,i) => {

          let props = require(`./commands/${dir}/${f}`)
          Karuma.commands.set(props.config.name, props)

        })

        console.log(`${green(`[${name}-SUCCESS]`)} : ${jsfile.length} ${dir} commands were successfully attached to Client.`)

      }
    }
  })
})



readdir(`./events/`, (err,files) => {

  if (err) return console.log(`${red(`[${name}-FAIL]`)} : I couldn't read ./events/ directory. Make sure it exist.`)

  let evtfiles = files.filter( f => f.split(".").pop() === 'js')

  if (!evtfiles.length) {

    console.log(`${red(`[${name}-FAIL]`)} : No events were found. Please make sure to add at least 1 event and then restart the bot.`)

  } else {

    evtfiles.forEach( evt => {

      const eventName = evt.split(".")[0];
      const event = require(`./events/${evt}`)
      Karuma.on(eventName, event.bind(null, Karuma))

    })

    console.log(`${green(`[${name}-SUCCESS]`)} : ${evtfiles.length} events now ready to go online!`)
  }
})



process.on('unhandledRejection', err => {
  console.error(`${magenta(`${name}-Promise ERROR]`)} : ${err}`)
})



Karuma.mongoose.init();

Karuma.login(token).catch( (err) => {

  if (err.name === 'Error [TOKEN_INVALID]') console.log(`${red(`[${name}-FAIL]`)} : The token you provided is not valid! Please get valid token @ https://discordapp.com/developers/applications ~ <3`)

  else if (err.name === 'FetchError') console.log(`${red(`[${name}-FAIL]`)} : Could not connect to internet. Please secure a stable connection. ~ <3`)

  else if (err.name === 'AbortError') console.log(`${red(`[${name}-FAIL]`)} : A request took longer than 15 seconds, and was aborted to not lock up the request handler.`)

  else console.log(`${red(`[${name}-FAIL]`)} : ${err.name}: ${err.message}`)

  process.exit()

})

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
  warnThreshold: 3,
	kickThreshold: 10,
	banThreshold: 15,
	muteThreshold: 5, 
	maxInterval: 2000, 
	warnMessage: '{@user}, Please stop spamming.', 
	kickMessage: '**{user_tag}** has been kicked for spamming.',
	banMessage: '**{user_tag}** has been banned for spamming.',
	muteMessage: '**{user_tag}** has been muted for spamming.',
	maxDuplicatesWarning: 7,
	maxDuplicatesKick: 10,
	maxDuplicatesBan: 12,
	maxDuplicatesMute: 9,
	ignoreBots: false,
	verbose: true,
	ignoredUsers: [],
});

Karuma.on('ready', () => console.log(`${green(`[${name}-SUCCESS]`)} - Anti Spam Enabled`));

Karuma.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '┗welcome┑');
  if (!channel) return;
  channel.send(`Welcome, to the server ${member}`);
});


Karuma.on('message', (message) => antiSpam.message(message));