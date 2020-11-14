const { insertNewFaction, joinFaction} = require('../../database/queries/faction.query')
const { getUserByMCusername } = require('../../database/queries/getUser.query')
const bot = require('../../other/minecraft_connection/minecraft_connection')

const faction = chat => {
    return new Promise ((resolve, reject) => {
        getUserByMCusername(chat.username)
            .then(res => {
                if (chat.comm[1] == 'create') {
                    if (chat.comm[2] !== undefined) {
                        name = chat.comm[2]
                        insertNewFaction(name)
                        .then(res => {
                            bot.chat(`/tellraw ${chat.username} {"text":"faction created succesfully","bold":true,"color":"green"}`)
                            resolve({valid: true})
                        })
                        .catch(err => {
                            console.error(err)
                            reject({valid: false})
                        })

                    } else bot.chat(`/tellraw ${chat.username} {"text":"use a valid name like: /. faction create <faction-name>","bold":true,"color":"green"}`)
                }


                if (chat.comm[1] == 'join') {
                    if (chat.comm[2] !== undefined) {
                        faction_id = res[0].mc_player_faction_id.toString()
                        if (faction_id == 0) {
                            joinFaction(chat.comm[2], chat.username)
                            .then(res => {
                                bot.chat(`/tellraw ${chat.username} {"text":"you have joined the faction succesfully","bold":true,"color":"green"}`)

                                bot.chat(`/give ${chat.username} minecraft:oak_wood 16`)
                                bot.chat(`/give ${chat.username} minecraft:apple 10`)
                                bot.chat(`/give ${chat.username} minecraft:leather_chestplate`)
                                bot.chat(`/give ${chat.username} minecraft:wooden_sword`)
                                bot.chat(`/give ${chat.username} minecraft:wooden_pickaxe`)
                                bot.chat(`/give ${chat.username} minecraft:wooden_axe`)
                                resolve({valid: true})
                            })
                            .catch(err => {
                                console.error(err)
                                reject({valid: false})
                            })    
                        } else bot.chat(`/tellraw ${chat.username} {"text":"you allready belong to a faction","bold":true,"color":"green"}`)
                    } else bot.chat(`/tellraw ${chat.username} {"text":"use a valid name like: /. faction join <faction-name> ","bold":true,"color":"green"}`)
                } else bot.chat(`/tellraw ${chat.username} {"text":"you can join a faction or create one","bold":true,"color":"green"}`)
            })
    })
}

module.exports = faction