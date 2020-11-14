const { getUserByMCusername } = require('../../database/queries/getUser.query')
const bot = require('../../other/minecraft_connection/minecraft_connection')

const playerJoin = user => {
    return new Promise ((resolve, reject) => {
        getUserByMCusername(user.username)
            .then(res => {
                if(!res.length == 0) {
                    bot.chat(`/tellraw ${user.username} {"text":"Welcome back ${user.username}","bold":true,"color":"green"}`)
                } else {
                    bot.chat(`/mvtp ${user.username} spawn`)
                    bot.chat(`/tellraw ${user.username} {"text":"You are not registered yet","bold":true,"color":"green"}`)
                    bot.chat(`/tellraw ${user.username} {"text":"register now to play THE-BATTLEZONE","bold":true,"color":"green"}`)
                }
            }).catch(err => {
                bot.chat(`/tellraw ${chat.username} {"text":"Unexpected error occured, please try again","bold":true,"color":"green"}`)
                console.error(err)
            })
    })
}

module.exports = playerJoin