// get the database connection from the connection file
const connection = require('../connection/connection.db')

// Get a user by the minecraft username
const getUserByMCusername = mcUsername => {
    return new Promise ((resolve, reject) => {
        connection.query("SELECT * FROM mc_players WHERE mc_player_username = ?", [mcUsername], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// Get a user by the user id
const getUserByUserId = userId => {
    return new Promise ((resolve, reject) => {
        connection.query("SELECT * FROM mc_players WHERE mc_player_id = ?", [userId], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// export the query
module.exports = { getUserByMCusername, getUserByUserId }