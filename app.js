// dotenv to get secrets from .env file
require('dotenv').config()

// nodejs filesystem module to read the commands from the command folder
const fs = require('fs')

// get the mincraft connection dependency
const mc = require('minecraft-protocol')

// get the commands from the commands folder
const pingCommand = require('./functions/commands/ping')

// get secret variables from the .env file
const mcHostname = process.env.MINECRAFT_SERVER_HOST
const mcUsername = process.env.MINECRAFT_USER_NAME
const mcPassword = process.env.MINECRAFT_PASSWORD

// create the client to connect to the minecraft server
const client = mc.createClient({
    host: mcHostname,
    username: mcUsername,
    password: mcPassword
})

// listen for the login event
client.once('login', () => {
    console.log('client logged in!')
})

// listen for chat messages
client.on('chat', packet => {
    // parse the raw JSON data from the message request
    const parsedMsgObject = JSON.parse(packet.message)
    if(parsedMsgObject.translate === 'commands.message.display.incoming') {
        // get the sender of the message
        const messageSender = parsedMsgObject.with[0].insertion
        // get the command name and the provided args
        let commandName, commandArgs
        if(parsedMsgObject.with[1].text.indexOf('-') !== -1) {
            commandName = parsedMsgObject.with[1].text.substr(0, parsedMsgObject.with[1].text.indexOf('-'))
            commandArgs = parsedMsgObject.with[1].text.substring(parsedMsgObject.with[1].text.indexOf('-') + 1)    
        } else {
            commandName = parsedMsgObject.with[1].text
            commandArgs = null
        }

        console.log(commandName)
        console.log(commandArgs)

        if(commandName == 'ping') {
            console.log('Ping triggered')
            client.write('chat', { message: pingCommand(messageSender) })
        }
    } else {
        console.log("Some other chat message")
    }
})