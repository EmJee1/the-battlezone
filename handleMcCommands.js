// get the commands from the commands folder
const credits = require('./functions/other/credits')
const faction = require('./functions/other/faction')
const deploy = require('./functions/other/deploy')
const { getUserByMCusername } = require('./database/queries/getUser.query')
const register = require('./functions/other/register')

const bot = require('./other/minecraft_connection/minecraft_connection')


const handleMcCommands = (chat) => {
    if (chat.color == 'light_purple') {
        chat = { 
            username: chat.text.split('-')[0],
            comm: chat.text.split('-')[1]
        }
        chat.comm = chat.comm.split(' ')
        if (chat.comm[0] == 'register') {
            register(chat)
                .then(res => {
                    console.log(res)
                })
        }
        getUserByMCusername(chat.username)
        .then(res => {
            if (res[0] !== undefined) {
                
                if (chat.comm[0] == 'credits') {
                    credits(chat)
                        .then(res => {
                            console.log(res)
                        })
                }
                if (chat.comm[0] == 'faction') {
                    faction(chat)
                        .then(res => {
                            console.log(res)
                        })
                }
                if (chat.comm[0] == 'deploy') {
                    deploy(chat)
                        .then(res => {
                            console.log(res)
                        })
                }
            } else if (res[0] == undefined) {
                bot.chat(`/tellraw ${chat.username} {"text":"you need to be registered to use that command","bold":true,"color":"green"}`)
            }
        })
    }
}

module.exports = handleMcCommands