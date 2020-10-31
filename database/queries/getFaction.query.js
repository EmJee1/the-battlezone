// get the database connection from the connection file
const connection = require('../connection/connection.db')

// insert a new user
const getFactionById = factionId => {
    return new Promise ((resolve, reject) => {
        connection.query("SELECT * FROM mc_factions WHERE mc_factions_id = '?'", [factionId], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// export the query
module.exports = insertNewPlayer