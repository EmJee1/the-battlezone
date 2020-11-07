// get the commands from the commands folder
const pingCommand = require('./functions/commands/ping.commands')

const handleMcCommands = (username, chat, bot) => {
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
}

module.exports = handleMcCommands