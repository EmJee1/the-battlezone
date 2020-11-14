const { getUserByMCusername } = require('../../database/queries/getUser.query')
const bot = require('../../other/minecraft_connection/minecraft_connection')

const credits = chat => {
    return new Promise ((resolve, reject) => {
        getUserByMCusername(chat.username)
            .then(res => {
                if(res.length == 1) {
                    playerCredits = res[0].mc_player_credits.toString();
                    username = res[0].mc_player_username
                    bot.chat(`/tellraw ${username} {"text":"${playerCredits}","bold":true,"color":"green"}`);
                } else {
                    bot.chat(`/tellraw ${username} {"text":"You are not registered yet","bold":true,"color":"green"}`)
                }
            })
    })
}

module.exports = credits