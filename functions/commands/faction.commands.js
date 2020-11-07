// import the necassary queries
const getUserQueries = require('../../database/queries/getUser.query')
const getFactionQueries = require('../../database/queries/getFaction.query')

const createNewFaction = (factionName, mcUsername) => {
    return new Promise ((resolve, reject) => {
        let mcUserId, mcFactionId
        // get the user data
        getUserQueries.getUserByMCusername(mcUsername)
            .then(res => {
                if(res.length < 1) {
                    reject(`/msg ${mcUsername} Oops! you haven't registered yet, you can do so by typing /- register <your_password> <confirm_password>`)
                    return
                }
                mcUserId = res[0].mc_player_id
                mcFactionId = res[0].mc_player_faction_id
                if(mcFactionId !== null) { 
                    reject(`/msg ${mcUsername} You are already member of a faction, type /- faction leave to leave your current faction`)
                    return
                }
                // check if a faction with that name already exists
                return getFactionQueries.getFactionByFactionName(factionName)
                    .then(getFactionsRes => {
                        console.log('res lenght:', getFactionsRes.length)
                        console.log('res:', getFactionsRes)
                        if(getFactionsRes.length > 0) {
                            reject(`/msg ${mcUsername} A faction with that name already exists, please choose a new unique faction name`)
                            return
                        } else {
                            console.log('Creating faction...')
                        }
                    }).catch(err => {
                        reject(`/msg ${mcUsername} Oh no! an unexpected error occured, please try again later. If this problem persists please contact a server admin`)
                        return
                    })
            }).catch(err => {
                reject(`/msg ${mcUsername} Oh no! an unexpected error occured, please try again later. If this problem persists please contact a server admin`)
                return
            })
    })
}

createNewFaction('myCoolFaction', 'EmJee')
    .then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })