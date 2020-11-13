const { yellow, green } = require('chalk')
const allowedNames = ['karuma','Karuma-bot']
const { ready } = require('../utils/anischedule/main.js')
const { user : { owner } } = require('../settings.json')
const { loadguilddata } = require('../utils/pointsystem/main.js')

module.exports = client => {

  console.log(`\n${green(client.user.username)} is now online!`)
  
  setInterval(() => {
  client.user.setActivity('11253 Proxies Loaded | p!help',{

    type: 'STREAMING',
    url: 'https://www.twitch.tv/plxsmaz'

  })
}, 60000);

//-------------------------------Points System-------------------------------//

  loadguilddata( client )

//--------------------------------AniSchedule--------------------------------//

   ready( client )

//------------------------------cache the owner-------------------------------//

  client.users.fetch(owner)
  
}
