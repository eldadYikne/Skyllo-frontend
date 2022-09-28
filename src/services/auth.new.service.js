import { httpService } from "./http.service";

export const authService = {
    login,
    logout,
    signup 
}
const BASE_URL = 'auth'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

async function login(credentials) {
    const user = await httpService.post(BASE_URL + '/login', credentials)
    if(user) {
            // socketService.login(user._id)
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
           return user
    } 
}

async function signup(userCred) {
    console.log(userCred)
    const user = await httpService.post(BASE_URL + '/signup', userCred)
    // socketService.login(user._id)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function logout() {
    await httpService.post(BASE_URL + '/logout')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, '')
    // socketService.logout()
}
