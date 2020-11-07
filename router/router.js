const bot = require('../other/minecraft_connection/minecraft_connection')
const express = require('express')

const router = express.Router()

router.post('/execute/msg', (req, res) => {
    // return error message 
    if(!req.body.hasOwnProperty('command')) {
        res.json({ valid: false, message: "The command was not provided" })
        return
    }
    const command = req.body.command
    bot.chat(command)
    res.json({"valid": true, "executed command": command})
})

module.exports = router