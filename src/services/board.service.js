
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
    getLabelsById,
    getMembersById,
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

        board.style.isStared = board.style.isStared ? false : true
        savedBoard = await storageService.put(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
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
        group.tasks.splice(taskIdx, 1, task)
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

function getLabelsById(board, labelId) {
    const labels = board.labels.find(label => {
        return label.id === labelId
    })
    return labels
}
function getMembersById(board, memberId) {
    console.log('boarddddddd:', board)
    console.log('memberIdddddd:', memberId)
    
    const members = board.members.find(member => {
        return member._id === memberId
    })
    return members
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
            toggleLabels: false,
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
                    id: 'la201',
                    title: "Done",
                    color: "#7fb973"
                },
                {
                    //light blue
                    id: 'la202',
                    title: "Progress",
                    color: "#78afcf"
                },
                {
                    //green
                    id: 'la203',
                    title: "Free time",

                    color: "#b8b8d1"
                },
                {
                    //red
                    id: 'la204',
                    title: "Urgent",
                    color: "#dd5959"
                },
                {
                    //yellow
                    id: 'la205',
                    title: "Can wait",
                    color: "#dfd762"
                },
                {
                    //orange
                    id: 'la206',
                    title: "Priority",
                    color: "#fea967"
                }
            ]
            ,
            members: [
                {
                    _id: utilService.makeId(),
                    fullname: "Tal Tarablus",
                    imgUrl: "https://www.google.com"
                },
                {
                    _id: '1011',
                    fullname: 'Eldad Yikne',
                    img: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583512/sprint%204%20/T03E3RZ2KHV-U03GZ4S8P7C-0dcebbbdbc4f-512_tlntp4.jpg
                    ` 
                },
                {
                    _id: '1012',
                    fullname: 'Dekel Ido',
                    img: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583549/sprint%204%20/T03E3RZ2KHV-U03KC7A8R6F-97b018241b8a-512_ougkz6.jpg
                    `
                },
                {
                    _id: '1013',
                    fullname: 'Yaara Yehuda',
                    img: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583460/sprint%204%20/T03E3RZ2KHV-U03KVHTDXAR-77f29bd19fdf-512_vqrj3l.jpg
                    `
                },
                {
                    _id: '1014',
                    fullname: 'Roi Yotvat',
                    img: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583580/sprint%204%20/T03E3RZ2KHV-U03HE9ZJTA6-79c26a7781c8-512_m1ydbz.png
                    `
                },
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
                            description: "Call the company and schedule",
                            memberIds: [],
                            labelIds: [],

                        },
                        {
                            id: utilService.makeId(),
                            title: "DNA replication",
                            description: "get to 1M cells",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Adding medicine to trial group",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Following cell development",
                            memberIds: [],
                            labelIds: [],
                        },
                    ],
                    style: {},
                },
                {
                    id: utilService.makeId(),
                    title: "PHASE 2- In vivo",
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Injet medicine to trial group",
                            description: "Group 1 only",
                            memberIds: [],
                            labelIds: [],
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
                            memberIds: [],
                            labelIds: [],
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
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Calculate success rate in vivo",
                            description: "",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Apply for Ethic review board",
                            description: "in order to get approval for phase 3",
                            memberIds: [],
                            labelIds: [],
                        },
                    ],
                    style: {
                    }
                },
                {
                    toggleLabels: false,
                    id: utilService.makeId(),
                    title: "PHASE 3 - Clinical trials",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Get patients agreement for trials",
                            description: "Make a patients conference",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Get all health file records",
                            description: "discuss every patient's physician",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Randomize a Placebo group",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Prescribe the medicine to trial group",
                            description: "Give the Phycians the following plan",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Follow disease remission",
                            description: "Calculate the success rate, side effects and their rates",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Build clinical trial file",
                            description: "set the file according to demands",
                            memberIds: [],
                            labelIds: [],
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
                            description: "Send the file to FDA",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Get Health Minister's approval",
                            description: "Send the file to Ministry of Health",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Organize company vacation",
                            memberIds: [],
                            labelIds: [],
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