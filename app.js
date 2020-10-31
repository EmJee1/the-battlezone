// dotenv to get secrets from .env file
require('dotenv').config()

// nodejs filesystem module to read the commands from the command folder
const fs = require('fs')

// get the minecraft connection object
const bot = require('./other/minecraft_connection/minecraft_connection')

// get functions from the functions folder
const parsers = require('./functions/other/parsers')

// get the commands from the commands folder
const pingCommand = require('./functions/commands/ping.commands')

// listen for the login event
bot.once('login', () => {
    console.log('client logged in!')
})

// listen for chat messages
bot.on('chat', (username, chat) => {
    // return if the username is the bot, or the username is not 'you'
    if(username === bot.username) return
    if(username !== 'you') return

    // get the sender and the message text
    const msgObj = parsers.parseMessageObject(chat)
    const sender = msgObj.sender
    const commandargsArr = msgObj.commandArgs

    if(commandargsArr[0] == 'ping') {
        bot.chat(pingCommand(sender))
    } else if(commandargsArr[0] == 'faction') {
        // the faction commandset
        if(commandargsArr[1] == 'join') {
            // join a faction
        } else if(commandargsArr[1] == 'create') {
            // create a faction
        } else if(commandargsArr[1] == 'members') {
            // list all the memebers of a faction
        }
    }
})