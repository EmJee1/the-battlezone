// require dependencies
require('dotenv').config()
const fs = require('fs')
const bodyParser = require('body-parser')

// get the minecraft connection object
const bot = require('./other/minecraft_connection/minecraft_connection')

// get functions from the functions folder
const parsers = require('./functions/other/parsers')

// initialize the express api
const express = require('express')
const app = express()
app.use(bodyParser.json())
const router = require('./router/router')
app.use(router)
app.listen(3000, () => console.log('Express listening on port 3000'))

// get the commands handler
const handleMcCommands = require('./handleMcCommands')

// listen for the login event
bot.once('login', () => {
    console.log('client logged in!')
})

// listen for chat messages
bot.on('chat', (username, chat) => {
    handleMcCommands(username, chat, bot)
})