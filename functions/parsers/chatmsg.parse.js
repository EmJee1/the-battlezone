const extractSenderFromChat = chat => chat.substring(chat.indexOf('<') + 1, chat.indexOf('>'))
const extractMessageFromChat = chat => chat.substr(chat.indexOf('>') + 2)

module.exports = { extractSenderFromChat, extractMessageFromChat }