// get the database connection from the connection file
const connection = require('../connection/connection.db')

// insert a new user
const insertNewPlayer = (mcUsername, mcUserPwd) => {
    return new Promise ((resolve, reject) => {
        connection.query("INSERT INTO mc_players (mc_player_username, mc_player_password, mc_player_faction_id, mc_player_credits, mc_player_points) VALUES (?, ?, '0', '50', '5')",
        [mcUsername, mcUserPwd], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// export the query
module.exports = insertNewPlayer