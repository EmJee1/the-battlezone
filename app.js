// dotenv to get secrets from .env file
require('dotenv').config()

// get the mincraft connection dependency
const mc = require('minecraft-protocol')

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
client.on('login', () => {
    console.log('client logged in!')
})

// listen for chat messages
client.on('chat', packet => {
    // parse the raw JSON data from the message request
    const parsedMsgObject = JSON.parse(packet.message)
    if(parsedMsgObject.translate === 'commands.message.display.incoming') {
        console.log(parsedMsgObject.with[0])
        console.log("Direct command to the bot")
        console.log("Message sender:" + parsedMsgObject.with[0].insertion)
        console.log("Message text:" + parsedMsgObject.text)
        console.log("Other data:", parsedMsgObject.with[0].hoverEvent.contents.name)
    } else {
        console.log("Some other chat message")
    }
})