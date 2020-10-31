// get the mincraft connection dependency
const mineflayer = require('mineflayer')

// get secret variables from the .env file
const mcHostname = process.env.MINECRAFT_SERVER_HOST
const mcUsername = process.env.MINECRAFT_USER_NAME
const mcPassword = process.env.MINECRAFT_PASSWORD

// create the client to connect to the minecraft server
const client = mineflayer.createBot({
    host: mcHostname,
    username: mcUsername,
    password: mcPassword
})

module.exports = client