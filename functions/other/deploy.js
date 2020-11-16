const { getUserByMCusername } = require('../../database/queries/getUser.query')
const { getFactionByFactionId, updateDeployed } = require('../../database/queries/faction.query')
const bot = require('../../other/minecraft_connection/minecraft_connection')

const deploy = chat => {
    return new Promise ((resolve, reject) => {
        getUserByMCusername(chat.username)
            .then(res => {
                if (res[0].mc_player_faction_id !== 0) {
                    getFactionByFactionId(res[0].mc_player_faction_id)
                    .then(res => {
                        if (res !== undefined) {
                            if (res[0].mc_faction_deployed !== 1) {
                                pos = res[0].mc_faction_pos
                                pos2 = pos.split(' ')
                                pos3 = pos2[1].toString()
                                pos3++

                                bot.chat(`/give ${chat.username} minecraft:oak_wood 16`)
                                bot.chat(`/give ${chat.username} minecraft:apple 10`)
                                bot.chat(`/give ${chat.username} minecraft:leather_chestplate`)
                                bot.chat(`/give ${chat.username} minecraft:wooden_sword`)
                                bot.chat(`/give ${chat.username} minecraft:wooden_pickaxe`)
                                bot.chat(`/give ${chat.username} minecraft:wooden_axe`)
                                bot.chat(`/give ${chat.username} minecraft:porkchop 10`)
                                bot.chat(`/give ${chat.username} minecraft:oak_sapling 1`)
                                bot.chat(`/give ${chat.username} minecraft:acacia_sapling 1`)
                                bot.chat(`/give ${chat.username} minecraft:dark_oak_sapling 1`)

                                bot.chat(`/tellraw @a {"text":"${chat.username} is getting deployed","bold":true,"color":"green"}`)
                                bot.chat(`/execute as ${chat.username} run tp ${pos2[0]} ${pos3} ${pos2[2]}`)
                                setTimeout(() => {
                                    bot.chat(`/execute as ${chat.username} run setblock ${pos} structure_block{mode:"LOAD",powered:0b,name:"totem"}`)
                                    bot.chat(`/execute as ${chat.username} run setblock ${pos2[0]} ${pos3} ${pos2[2]} redstone_block`)
                                    bot.chat(`/execute as ${chat.username} run spawnpoint ${chat.username} ${pos2[0]} ${pos3} ${pos2[2]}`)
                                }, 500);

                                updateDeployed(res[0].mc_faction_name)
                                .then(res => {
                                    resolve({valid: true})
                                })
                            } else bot.chat(`/tellraw ${chat.username} {"text":"you allready have been deployed","bold":true,"color":"green"}`)
                        } else bot.chat(`/tellraw ${chat.username} {"text":"you need to have or join a faction to deploy","bold":true,"color":"green"}`)
                    })
                } else { 
                    bot.chat(`/tellraw ${chat.username} {"text":"oops, join a faction first","bold":true,"color":"green"}`)
                }
            })
    })
}

module.exports = deploy