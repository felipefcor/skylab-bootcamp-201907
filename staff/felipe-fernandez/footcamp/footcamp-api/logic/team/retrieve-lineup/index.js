const {validate} = require('footcamp-utils')
const { models: { User,  League, Team , Player } } = require('footcamp-data')

 /**
 * Retrieves a static lineup for the user's team
 *
 * @param {*} id 
 * @param {*} leagueId 
 * @param {*} teamId 
 * 
 *   
 * @returns {Promise}
*/

module.exports = function(id, leagueId, teamId) {
   
    validate.string(id, 'id')
    validate.string(leagueId, 'league Id')
    validate.string(teamId, 'team id')
       
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ _id: leagueId })

        if (!league) throw Error(`League with code ${ leagueId } does not exist`)

        const team = await Team.findOne({_id: teamId })

        if (!team) throw Error(`Team with name ${ teamId } does not exist`)

          
        
        await team.save()
 
        return team.lineup

    })()
}
