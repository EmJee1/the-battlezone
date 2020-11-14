// require dependencies
require('dotenv').config()
const fs = require('fs')
const bodyParser = require('body-parser')

// get the minecraft connection object
const bot = require('./other/minecraft_connection/minecraft_connection')

// get functions from the functions folder
const playerJoin = require('./functions/other/playerJoin')



// initialize the express api
const express = require('express')
const app = express()
app.use(bodyParser.json())
const router = require('./router/router')
app.use(router)
app.listen(3000, () => console.log('Express listening on port 3000'))

// get the commands handler
const handleMcCommands = require('./handleMcCommands')
const { exit, exitCode } = require('process')

// listen for the login event
bot.once('login', () => {
    setTimeout(() => { bot.chat(`/mvtp Pherias theBattleZone`) }, 200);
    setTimeout(() => { bot.chat(`/gamemode spectator Pherias`); console.log('login done'); }, 500);
})


bot.on('playerJoined', user => {
    playerJoin(user)
});

bot.on('message', chat => {
    handleMcCommands(chat)
})



