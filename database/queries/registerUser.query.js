// require the bcrypt library for hashing of passwords
const bcrypt = require('bcrypt')

// get the database connection from the connection file
const connection = require('../connection/connection.db')

// insert a new user
const registerNewUser = (mcUsername, password) => {
    return new Promise ((resolve, reject) => {
        let hashedPwd = bcrypt.hashSync(password, 10)
        hashedPwd = hashedPwd.replace("$2b$", "$2y$")
        connection.query("UPDATE mc_players SET mc_player_password = ? WHERE mc_player_username = ?", 
        [hashedPwd, mcUsername], (err, rows) => {
            if(err) { reject(err) }
            else {
                resolve(rows)
            }
        })
    })
}

// export the query
module.exports = registerNewUser