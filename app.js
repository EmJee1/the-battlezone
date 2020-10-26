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
    // capture the raw JSON data from the message request
    const jsonMsg = JSON.parse(packet.message)
    if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
        // extract username and password from the message packet
        const username = jsonMsg.with[0].text
        const msg = jsonMsg.with[1]
        // return the function to stop execution when the user client sent the chat message
        if(username === client.username) return
        // sent a response
        client.write('chat', { message: msg.text })
    }
})