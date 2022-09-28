
import { httpService } from './http.service'
import { getActionSetWatchedUser } from '../store/review.actions'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from '../services/event-bus.service'
import { utilService } from './util.service'

export const userService = {
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService

const BASE_URL = 'user/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function getUsers(filterBy={}) {
    try {
        const users = await httpService.get(BASE_URL, { params: filterBy })
        return users
    } catch(err) {
        console.log('Oops,', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const user = await httpService.get(BASE_URL + userId)
        // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
        // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        return user

    } catch(err) {
        console.log('Oops,', err)
        throw err
    }
}

async function remove(userId) {
    try {
        const user = await httpService.delete(BASE_URL + userId)
        return user
    } catch(err) {
        console.log('Oops,', err)
        throw err
    }
    
}

async function update(user) {
    try {
        user = await httpService.put(BASE_URL + user._id, user)
        if (getLoggedinUser()._id === user._id) saveLocalUser(user)
        return user;
    } catch(err) {

    }
    // Handle case in which admin updates other user's details
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}