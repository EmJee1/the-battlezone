// get the database connection from the connection file
const connection = require('../connection/connection.db')

// insert a new user
const insertNewPlayer = mcUsername => {
    return new Promise ((resolve, reject) => {
        connection.query("INSERT INTO mc_players (mc_player_username) VALUES (?)", [mcUsername], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// export the query
module.exports = insertNewPlayer