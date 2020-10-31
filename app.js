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
    client.write('chat', { message: 'testbericht!' })
})

// listen for chat messages
client.on('chat', packet => {
    // parse the raw JSON data from the message request
    const parsedMsgObject = JSON.parse(packet.message)
    console.log(parsedMsgObject);
    if(parsedMsgObject.translate === 'commands.message.display.incoming') {
        // get the sender of the message
        const messageSender = parsedMsgObject.with[0].insertion
        // get the command name and the provided args
        const strWithSpaces = parsedMsgObject.with[1].text.split('-').join(' ')
        const commandName = strWithSpaces.substr(0, strWithSpaces.indexOf(' '))
        const commandArgs = strWithSpaces.substring(strWithSpaces.indexOf(' ') + 1)

        console.log(commandName)

        if(commandName == 'ping') {
            client.write('chat', { message: 'testbericht!' })
        }

    } else {
        console.log("Some other chat message")
    }
})