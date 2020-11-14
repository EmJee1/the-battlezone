// get the database connection from the connection file
const connection = require('../connection/connection.db')



// Get the faction by id

const getFactionByFactionId = factionId => {
    return new Promise ((resolve, reject) => {
        connection.query("SELECT * FROM mc_factions WHERE mc_faction_id = ?", [factionId], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// Get the faction by name
const getFactionByFactionName = factionName => {
    return new Promise ((resolve, reject) => {
        connection.query("SELECT * FROM mc_factions WHERE mc_faction_name = ?", [factionName], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}




// insert a new user
const insertNewFaction = (factionName) => {
    return new Promise ((resolve, reject) => {
        posX = Math.floor(Math.random() * 5000)
        posY = Math.floor(Math.random() * 145) + 5
        posZ = Math.floor(Math.random() * 5000)

        pos = `${posX} ${posY} ${posZ}`

        connection.query("INSERT INTO mc_factions (mc_faction_name, mc_faction_level, mc_faction_pos) VALUES (?, 0, ?)",
        [factionName, pos], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// join the faction by faction name
const joinFaction = (factionName, username) => {
    return new Promise ((resolve, reject) => {

        getFactionByFactionName(factionName)
        .then(res => {
            if (res[0] !== undefined) {
                factionId = res[0].mc_faction_id
                connection.query("UPDATE mc_players SET mc_Player_faction_id='?' WHERE mc_player_username=?",
                [factionId, username], (err, rows) => {
                    if(err) { reject(err) }
                    else {
                        resolve(rows)
                    }
                })
            }
        })
        .catch(err => {
            console.error(err)
            reject({valid: false})
        })
    })
}




// export the query
module.exports = {insertNewFaction, joinFaction, getFactionByFactionName, getFactionByFactionId}