
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard, getCurrBoard } from '../store/board.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')


    ; (() => {
        boardChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const boardService = {
    query,
    getById,
    save,
    remove,
    createBoard,
    getBoard,
    addGroup,
    removeGroup,
    saveTask,
    removeTask,
    getGroups,
    getTasks

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
async function save(board, isStared) {
    var savedBoard
    console.log('enter');
    if (board._id) {
        board.style.isStared = isStared
        savedBoard = await storageService.put(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        console.log('sad');
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function createBoard(title, bgImg) {
    return {
        title: title,
        archivedAt: 1589983468418,
        createdAt: Date.now(),
        createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
        },
        style: {
            bgImg,
        },
        groups: []

    }
}

async function addGroup(boardId, groupTitle, activity) {
    const board = await getById(boardId)
    console.log(boardId)
    const group = {
        id: utilService.makeId(),
        title: groupTitle,
        createdAt: Date.now(),
        tasks: [],
        style: {},
    }
    board.groups.push(group)
    if (!board.activities) board.activities = []
    board.activities.unshift(activity)
    return save(board)
}

async function removeGroup(boardId, groupId, activity ) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex((group)=> group.id === groupId)
    if(!board.groups[groupIdx]?.archivedAt) board.groups[groupIdx].archivedAt = Date.now()
    else board.groups.splice(groupIdx, 1)
    board.activities.unshift(activity)
    return save(board)

}

async function saveTask(boardId, groupId, task, activity) {
    const board = await getById(boardId)
    const group = board.groups.find(currGroup => currGroup.id === groupId)
    if(task.id) {
        const taskIdx = group.tasks.findIndex((currTask) => currTask.id === task.id)
        group.tasks.splice(taskIdx, 1, task)
    } else {
        task.id = utilService.makeId()
        group.tasks.push(task)
    }
    board.activities.unshift(activity)
    return save(board)
}

async function removeTask(boardId, groupId, taskId, activity ) {
    const board = await getById(boardId)
    const group = board.groups.find((group)=> group.id === groupId)
    const taskIdx = group.tasks.findIndex((task)=> task.id === taskId)
    if(!group[taskIdx].archivedAt) group[taskIdx].archivedAt = Date.now()
    else group.tasks.splice(taskIdx, 1)
    board.activities.unshift(activity)
    return save(board)
}

async function getGroups(boardId){
    try{
        const board = await getById(boardId)
        const groups = board.groups.filter(group => !group.archivedAt)
        return groups

    }catch (err) {
        console.log(err)
    }
}
async function getTasks(boardId, groupId){
    try {
        const board = await getById(boardId)
        console.log('board: ', board)
        console.log(groupId)
        console.log(board.groups)

        const group = board.groups.find(currGroup => currGroup.id === groupId)
        console.log('group: ', group)
        const tasks = group.tasks.filter(task => !task.archivedAt)
        return tasks

    }catch (err) {
        console.log(err) 
    }
}





// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




// const activity = {
//     id: utilService.makeId(),
//     txt: "Changed Color",
//     createdAt: Date.now(),
//     byMember: userService.getLoggedinUser(),
//     task: 'task'
// }

// // Store - saveTask
// function storeSaveTask(task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     commit(board)
// }

// // boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678

//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }

// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
// PUT /api/board/b123/task/t678

// TODO: find the task, and update
// board.tasks.unshift(task)

// saveBoard(board)
// return board
// return task
// }


function getBoard() {


    const gBoards =
        [{
            _id: "b101",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://media.npr.org/assets/img/2022/06/15/gettyimages-1329369484_custom-885a687ec4ed7acfd56a918dbc51f9204cebcf8b-s1100-c50.jpg")',
                isStared: false
            },
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
                    archivedAt: '',
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
                            id: utilService.makeId(),
                            title: "Do that",
                            archivedAt: '',
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
                    style: {
                    }
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
        },
        {
            _id: "b102",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/6820193445dcff991b2b12f41916deea/photo-1537486336219-a3dd8e2dc6b5.jpg")',
                isStared: false
            },
            groups: []
        },
        {
            _id: "b103",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("http://cdn.cnn.com/cnnnext/dam/assets/220503164709-02-body-incredible-train-journeys.jpg")',
                isStared: false
            },
            groups: []
        },
        {
            _id: "b104",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://i2-prod.dublinlive.ie/incoming/article23902887.ece/ALTERNATES/s615/0_GettyImages-1271537082.jpg")',
                isStared: false
            },
            groups: []
        },
        {
            _id: "b105",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://cdn.pixabay.com/photo/2014/09/03/20/15/shoes-434918__480.jpg")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b106",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://st2.depositphotos.com/1177973/9006/i/950/depositphotos_90068008-stock-photo-beautiful-golden-saxophone-with-musical.jpg")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b107",
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCuxUDUDTye7Smic5D3SJz0KNwgVWc27m1A&usqp=CAU")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b108",
            title: "Holiday",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZXforlq8r5qU0cl2R1s08_vOmmNQa5tQ6wg&usqp=CAU")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b109",
            title: "Life Style",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?cs=srgb&dl=pexels-pixabay-414102.jpg&fm=jpg")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b110",
            title: "Life sky",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://img.freepik.com/premium-photo/beautiful-sky-with-clouds-golden-light-sun_51530-1593.jpg?w=2000")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b111",
            title: "Life Style",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://nextbigwhat.com/wp-content/webpc-passthru.php?src=https://nextbigwhat.com/wp-content/uploads/2021/12/DA-Feb-4.png&nocache=1")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b112",
            title: "Life Style",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://st4.depositphotos.com/18630962/20629/i/600/depositphotos_206298280-stock-photo-hot-black-coffee-clear-glass.jpg")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b113",
            title: "Life Style",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://coursework.vschool.io/content/images/2017/08/react.png")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b114",
            title: "Life Style",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRx9RfOVMAAMRnMzcE4Q60JD4q7Cljs-TSsux6tiwWKeCU_mcwCjNmHipClWLcfpYb04&usqp=CAU")',
                isStared: true
            },
            groups: []
        },
        {
            _id: "b115",
            title: "Life Style",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzZ0WGrS4PjHzoypyuCrqdhnL7VfU54IPymSQigDJtigK86ix7iULbELjsL_r7fUGDSU&usqp=CAU")',
                isStared: true
            },
            groups: []
        },
        ]
    return gBoards
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