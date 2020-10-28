// require the mysql dependency
const mysql = require('mysql')

// get the connection variables from .env file
const database_connection_uri = process.env.DATABASE_CONNECTION_URI
const database_username = process.env.DATABASE_USERNAME
const database_password = process.env.DATABASE_PASSWORD
const database_name = process.env.DATABASE_NAME

// create the connection object
const connection = mysql.createConnection({
    host: database_connection_uri,
    user: database_username,
    password: database_password,
    database: database_name
})

// make the connection
connection.connect()

// invoke test query
connection.query("SELECT * FROM `mc_players` WHERE `mc_player_id` = 2", (err, res, fields) => {
    if(err) throw err
    console.log(`Result: ${res[0]}`)
})