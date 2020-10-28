// require the mysql dependency
const mysql = require('mysql')

require('dotenv').config()

// get the connection variables from .env file
const database_connection_uri = process.env.DATABASE_CONNECTION_URI
const database_username = process.env.DATABASE_USERNAME
const database_password = process.env.DATABASE_PASSWORD
const database_name = process.env.DATABASE_NAME
const database_port = process.env.DATABASE_PORT

// create the connection object
const connection = mysql.createConnection({
    host: database_connection_uri,
    user: database_username,
    password: database_password,
    database: database_name,
    port: database_port
})

// make the connection
connection.connect(err => {
    if(err) {
        // handle database connection error
        console.error('Database connection error: ', err)
        return
    } 
    // send a successful connection message
    console.log('Database connetion established')
})

// export the database connection
module.exports = connection