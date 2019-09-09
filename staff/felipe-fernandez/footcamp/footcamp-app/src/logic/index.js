import registerUser from './register-user'
import isUserLogged from './is-user-logged'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import createLeague from './league-create'
import createTeam from './team-create'


export default {

    set userCredentials(token){
        sessionStorage.token = token
    },
    get userCredentials(){
        return sessionStorage.token
    },
    registerUser,
    authenticateUser,
    isUserLogged,
    retrieveUser,
    createLeague, 
    createTeam
}