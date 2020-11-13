const name = "Lightz"
const { green, yellow, red, magenta, cyan } = require('chalk')
const mongoose = require('mongoose');
const connector = `mongodb+srv://Abdinasir:Mohamed1209@cluster0.muopt.mongodb.net/Abdinasir?retryWrites=true&w=majority`

module.exports = {
  init:() => {
    const dbOptions = {
      useUnifiedTopology:true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(connector,dbOptions)
    mongoose.set('useFindAndModify',false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on(`connecting`, () => {
      console.log(`${yellow(`[${name}-WARN]`)} : Connecting to MongoDB server...`)
    });

    mongoose.connection.on(`connected`, () => {
      console.log(`${green(`[${name}-SUCCESS]`)} : Mongoose connection established!`);
    });

    mongoose.connection.on('err', err => {
      console.error(`${red(`[${name}-FAIL]`)} : Mongoose connection error:\n ${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(`${red(`[${name}-FAIL]`)} : Mongoose connection to MongoDB server disconnected!`);
    });

    mongoose.connection.on('reconnected', () => {
      console.log(`${green(`[${name}-SUCCESS]`)} : Mongoose connection to MongoDB server reconnected.`)
    });
  }
};
