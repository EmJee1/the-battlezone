const parseMessageObject = input => {
    let parsed = input.substr(1)
    parsed = JSON.parse(parsed.substring(0, parsed.length - 1))
    const sender = parsed.sender
    const commandargsArr = parsed.message.split(' ')
    return { sender: sender, commandArgs: commandargsArr }
}

module.exports = { parseMessageObject }