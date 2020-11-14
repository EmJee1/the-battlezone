const bcrypt = require('bcrypt')

const { getUserByMCusername } = require('../../database/queries/getUser.query')
const insertNewPlayer = require('../../database/queries/createUser.query')
const bot = require('../../other/minecraft_connection/minecraft_connection')


const register = chat => {
    return new Promise ((resolve, reject) => {
        getUserByMCusername(chat.username)
            .then(res => {
                if(res.length == 1) bot.chat(`/tellraw ${chat.username} {"text":"You are already registered","bold":true,"color":"green"}`)
                else {
                    bot.chat(`/tellraw ${chat.username} {"text":"to register type: /.register <password> <repeat-password>","bold":true,"color":"green"}`)
                    if (chat.comm.length == 3) {
                        if (chat.comm[1] == chat.comm[2]) {
                            username = chat.username
                            pass = chat.comm[1]
                            let hashedPwd = bcrypt.hashSync(pass, 10)
                            hashedPwd = hashedPwd.replace("$2b$", "$2y$")

                            insertNewPlayer(username, hashedPwd)
                                .then(res => {
                                    bot.chat(`/tellraw ${chat.username} {"text":"Thanks for registering on The-BattleZone, Have fun!","bold":true,"color":"green"}`)
                                    resolve({valid: true})
                                }).catch(err => {
                                    console.error(err)
                                    reject({valid: false})
                                })

                        } else {
                            bot.chat(`/tellraw ${chat.username} {"text":"passwords not the same","bold":true,"color":"green"}`)
                        }
                    }
                }
            }).catch(err => {
                bot.chat(`/tellraw ${chat.username} {"text":"Unexpected error occured, please try again","bold":true,"color":"green"}`)
                console.error(err)
            })
    })
}

module.exports = register