
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
    console.log('enter');
    if (board._id) {

        console.log('staaar');
        board.style.isStared = board.style.isStared ? false : true
        console.log(board.style.isStared, ' board.style.isStared');
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

async function removeGroup(boardId, groupId, activity) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    board.groups.splice(groupIdx, 1)
    board.activities.unshift(activity)
    return save(board)

}

async function saveTask(boardId, groupId, task, activity) {
    const board = await getById(boardId)
    const group = board.groups.find(currGroup => currGroup.id === groupId)
    if (task.id) {
        const taskIdx = group.tasks.findIndex((currTask) => currTask.id === task.id)
        console.log(task);
        group.tasks.splice(taskIdx, 1, task)
        console.log(task);
    } else {
        task.id = utilService.makeId()
        group.tasks.push(task)
    }
    board.activities.unshift(activity)
    return save(board)
}

async function removeTask(boardId, groupId, taskId, activity) {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const taskIdx = group.tasks.findIndex((task) => task.id === taskId)
    group.tasks.splice(taskIdx, 1)
    board.activities.unshift(activity)
    return save(board)
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
            title: "Medicine trials",
            archivedAt: '',
            createdAt: 1589983468418,
            createdBy: {
                _id: "u101",
                fullname: "TRA PHARMA",
                imgUrl: "http://some-img"
            },
            style: {
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663488783/sprint%204%20/220503164709-02-body-incredible-train-journeys_dh1ewu.jpg")',
                isStared: false
            },
            labels: [
                {
                    //light purple
                    id: utilService.makeId(),
                    title: "Done",
                    color: "#b8b8d1"
                },
                {
                    //light blue
                    id: utilService.makeId(),
                    title: "Progress",
                    color: "#5b92b2"
                },
                {
                    //green
                    id: utilService.makeId(),
                    title: "Done",
                    color: "#61bd4f"
                },
                {
                    //red
                    id: utilService.makeId(),
                    title: "Urgent",
                    color: "#c74040"
                },
                {
                    //yellow
                    id: utilService.makeId(),
                    title: "Can wait",
                    color: "#dfd762"
                },
                {
                    //orange
                    id: utilService.makeId(),
                    title: "free time",
                    color: "#df8742"
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
                    title: "PHASE 1- in vitro",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Get the lab for trials",
                            description: "Call the company and schedule"
            
                        },
                        {
                            id: utilService.makeId(),
                            title: "DNA replication",
                            description: "get to 1M cells"
                        },
                        {
                            id: utilService.makeId(),
                            title: "Adding medicine to trial group",
                        },
                        {
                            id: utilService.makeId(),
                            title: "Following cell development"
                        },
                    ],
                    style: {}
                },
                {
                    id: utilService.makeId(),
                    title: "PHASE 2- In vivo",
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Injet medicine to trial group",
                            description: "Group 1 only",
                        },
                        {
                            id: utilService.makeId(),
                            title: "Following the influences ",
                            description: "Note Side effects, Healings and deaths",
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
                        }, 
                          {
                            id: utilService.makeId(),
                            title: "Meet Health Ministry for Phase 3 approval",
                            description: "Build medication file",
                        },
                          {
                            id: utilService.makeId(),
                            title: "Calculate success rate in vivo",
                            description: "",
                        },
                          {
                            id: utilService.makeId(),
                            title: "Apply for Ethic review board",
                            description: "in order to get approval for phase 3",
                        },
                    ],
                    style: {
                    }
                },
                {
                   
                    id: utilService.makeId(),
                    title: "PHASE 3 - Clinical trials",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Get patients agreement for trials",
                            description: "Make a patients conference"
                          
                        },
                        {
                            id: utilService.makeId(),
                            title: "Get all health file records",
                            description: "discuss every patient's physician"
                        },
                        {
                            id: utilService.makeId(),
                            title: "Randomize a Placebo group",
                        },
                        {
                            id: utilService.makeId(),
                            title: "Prescribe the medicine to trial group",
                            description: "Give the Phycians the following plan"
                        },
                        {
                            id: utilService.makeId(),
                            title: "Follow disease remission",
                            description: "Calculate the success rate, side effects and their rates"
                        },
                        {
                            id: utilService.makeId(),
                            title: "Build clinical trial file",
                            description: "set the file according to demands"
                        },
                    ],
                    style: {} 
                },
                {
                    id: utilService.makeId(),
                    title: "Get Approval",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Get FDA approval",
                            description: "Send the file to FDA"
                        },
                        {
                            id: utilService.makeId(),
                            title: "Get Health Minister's approval",
                            description: "Send the file to Ministry of Health"
                        },
                        {
                            id: utilService.makeId(),
                            title: "Organize company vacation",

                        },
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489044/sprint%204%20/abstract-pink-watercolor-background-illustration-high-resolution-free-photo_1340-21115_lorgj1.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489115/sprint%204%20/0_GettyImages-1271537082_ekvkxq.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489161/sprint%204%20/shoes-434918__480_xlty5c.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489186/sprint%204%20/cool-music-background-1366x768-laptop-49923_pqf7dn.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489208/sprint%204%20/wp3422169_eakibu.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489228/sprint%204%20/2819238_bxfwdo.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489252/sprint%204%20/pexels-photo-414102.jpeg_p3l2ze.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489270/sprint%204%20/3547009_fjiyfh.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489294/sprint%204%20/webpc-passthru.php_myunwy.png")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489314/sprint%204%20/87541_ulolpm.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489336/sprint%204%20/react_ugfgnl.png")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489357/sprint%204%20/87551_vma4fs.jpg")',
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
                bgImg: 'url("https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663489374/sprint%204%20/405575_emcdmf.jpg")',
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