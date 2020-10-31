// import the neccesary queries
const getUserQueries = require('../../database/queries/getUser.query')

const createNewFaction = (factionName, mcUsername) => {
    // get the user data
    getUserQueries.getUserByMCusername(mcUsername)
        .then(res => {

        }).catch(err => {
            console.error(err)
            return `/msg ${mcUsername} er heeft zich een onbekende error voorgedaan`
        })
    // check if user is already member of a faction

}