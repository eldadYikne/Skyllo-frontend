
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.actions.js'
import {store} from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')


;(()=>{
    boardChannel.addEventListener('message', (ev)=>{
        store.dispatch(ev.data)
    })
})()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
}
window.cs = boardService


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))
        
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        _id: utilService.makeId(),
        title: "Robot dev proj",
        archivedAt: 1589983468418,
        createdAt: 1589983468418,
        createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
        },
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




const activity = {
    id: utilService.makeId(),
    txt: "Changed Color",
    createdAt: Date.now(),
    byMember: userService.getLoggedinUser(),
    task: task
}

// Store - saveTask
function storeSaveTask(task, activity) {
    
    board = boardService.saveTask(boardId, groupId, task, activity)
    commit(board)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    // return board
    // return task
}


const board = {
    _id: "b101",
    title: "Robot dev proj",
    archivedAt: 1589983468418,
    createdAt: 1589983468418,
    createdBy: {
        _id: "u101",
        fullname: "Abi Abambi",
        imgUrl: "http://some-img"
    },
    style: {},
    labels: [
        {
            id: utilService.makeId(),
            title: "Done",
            color: "#61bd4f"
        },
        {
            id: utilService.makeId(),
            title: "Progress",
            color: "#61bd33"
        }
    ],
    members: [
        {
            _id: utilService.makeId(),
            fullname: "Tal Tarablus",
            imgUrl: "https://www.google.com"
        }
    ],
    groups: [
        {
            id: utilService.makeId(),
            title: "Group 1",
            archivedAt: 1589983468418,
            tasks: [
                {
                    id: utilService.makeId(),
                    title: "Replace logo"
                },
                {
                    id: utilService.makeId(),
                    title: "Add Samples"
                }
            ],
            style: {}
        },
        {
            id: utilService.makeId(),
            title: "Group 2",
            tasks: [
                {
                    id:utilService.makeId(),
                    title: "Do that",
                    archivedAt: 1589983468418,
                },
                {
                    id: utilService.makeId(),
                    title: "Help me",
                    status: "in-progress",
                    description: "description",
                    comments: [
                        {
                            id: utilService.makeId(),
                            txt: "also @yaronb please CR this",
                            createdAt: 1590999817436.0,
                            byMember: {
                                _id: utilService.makeId(),
                                fullname: "Tal Tarablus",
                                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    checklists: [
                        {
                            id: utilService.makeId(),
                            title: "Checklist",
                            todos: [
                                {
                                    id: utilService.makeId(),
                                    title: "To Do 1",
                                    isDone: false
                                }
                            ]
                        }
                    ],
                    memberIds: ["u101"],
                    labelIds: ["l101", "l102"],
                    createdAt: 1590999730348,
                    dueDate: 16156215211,
                    byMember: {
                        _id: "u101",
                        username: "Tal",
                        fullname: "Tal Tarablus",
                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    style: {
                        bgColor: "#26de81"
                    }
                }
            ],
            style: {}
        }
    ],
    activities: [
        {
            id: utilService.makeId(),
            txt: "Changed Color",
            createdAt: 154514,
            byMember: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            task: {
                id: utilService.makeId(),
                title: "Replace Logo"
            }
        }
    ],
    // for monday
    cmpsOrder: ["status-picker", "member-picker", "date-picker"]
}
const user = {
    _id: "u101",
    fullname: "Abi Abambi",
    username: "abi@ababmi.com",
    password: "aBambi123",
    imgUrl: "http://some-img.jpg",
    mentions: [{
        id: utilService.makeId(),
        boardId: "m101",
        taskId: "t101"
    }]
}