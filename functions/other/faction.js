const { getFactionByFactionId, insertNewFaction, joinFaction} = require('../../database/queries/faction.query')
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
                                resolve({valid: true})
                            })
                            .catch(err => {
                                console.error(err)
                                reject({valid: false})
                            })    
                        } else bot.chat(`/tellraw ${chat.username} {"text":"you allready belong to a faction","bold":true,"color":"green"}`)
                    } else bot.chat(`/tellraw ${chat.username} {"text":"use a valid name like: /. faction join <faction-name> ","bold":true,"color":"green"}`)
                } else bot.chat(`/tellraw ${chat.username} {"text":"you can join a faction or create one","bold":true,"color":"green"}`)


                if (chat.comm[1] == 'info') {
                    getUserByMCusername(chat.username)
                    .then (res => {
                        if (res[0].mc_player_faction_id !== 0) {
                            getFactionByFactionId(res[0].mc_player_faction_id)
                            .then(res => {
                                bot.chat(`/tellraw ${chat.username} {"text":"Faction name: ${res[0].mc_faction_name}","bold":true,"color":"yellow"}`)
                                bot.chat(`/tellraw ${chat.username} {"text":"Faction level: ${res[0].mc_faction_level}","bold":true,"color":"yellow"}`)
                                resolve({valid: true})
                            })
                        } else bot.chat(`/tellraw ${chat.username} {"text":"you are not member of a faction yet","bold":true,"color":"green"}`)
                        resolve({valid: true})
                    })
                    .catch(err => {
                        console.error(err);
                        reject({valid: false})
                    })





                    // insertNewFaction(name)
                    // .then(res => {
                    //     bot.chat(`/tellraw ${chat.username} {"text":"faction created succesfully","bold":true,"color":"green"}`)
                    //     resolve({valid: true})
                    // })
                    // .catch(err => {
                    //     console.error(err)
                    //     reject({valid: false})
                    // })
                }
            })
    })
}

module.exports = faction