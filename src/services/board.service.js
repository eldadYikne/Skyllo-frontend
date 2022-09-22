
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
    getGUsers,
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
    // board.activities.unshift(activity)
    return save(board)
}

async function removeGroup(boardId, groupId, activity) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    board.groups.splice(groupIdx, 1)
    // board.activities.unshift(activity)
    return save(board)
}

async function saveTask(boardId, groupId, task, activity) {
    const board = await getById(boardId)
    const group = board.groups.find(currGroup => currGroup.id === groupId)
    if (task.id) {
        const taskIdx = group.tasks.findIndex((currTask) => currTask.id === task.id)
        board.activities.unshift(createactivity(activity.text, activity.taskTilte, task.id, activity.user,activity.groupId))
        group.tasks.splice(taskIdx, 1, task)
    } else {
        task.id = utilService.makeId()
        console.log(task);
        board.activities.unshift(createactivity(activity.text, activity.taskTilte, task.id, activity.user,activity.groupId))
        group.tasks.push(task)
    }

    return save(board)
}

async function removeTask(boardId, groupId, taskId, activity) {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const taskIdx = group.tasks.findIndex((task) => task.id === taskId)
    group.tasks.splice(taskIdx, 1)
    board.activities.unshift(createactivity(activity.text, activity.taskTilte, activity.taskId, activity.user,activity.groupId))
    return save(board)
}
const createactivity = (text = '', taskTilte = '', taskId = '', user = '' ,groupId='') => {
    return {
        id: utilService.makeId(),
        txt: text,
        createdAt: new Date() ,
        byMember:  user ,
        groupId,
        task: {
            id: taskId,
            title: taskTilte
        }
    }

}

function getLabelsById(board, labelId) {
    
    const labels = board.labels.find(label => {
        return label.id === labelId
    })
    return labels
}

function getMembersById(board, memberId) {
    const members = board.members.find(member => {
        return member._id === memberId
    })
    return members
}



function getBoard() {


    const gBoards =
        [{
            toggleLabels: false,
            _id: "b101",
            title: "Start Up",
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
                    color: "#B7DDB0"
                },
                {
                    //light blue
                    id: 'la202',
                    title: "Progress",
                    color: "#F5EA92"
                },
                {
                    //green
                    id: 'la203',
                    title: "Free time",

                    color: "#FAD29C"
                },
                {
                    //red
                    id: 'la204',
                    title: "Urgent",
                    color: "#EFB3AB"
                },
                {
                    //yellow
                    id: 'la205',
                    title: "Can wait",
                    color: "#DFC0EB"
                },
                {
                    //orange
                    id: 'la206',
                    title: "Priority",
                    color: "#8BBDD9"
                }
            ]
            ,
            members: [
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
                    title: "General",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Target Product Launch Date: November 1, 2022",
                            description: "Call the company and schedule",
                            memberIds: ['1011','1014','1013','1012'  ],
                            labelIds: ['la206', 'la201'],

                        },
                        {
                            id: utilService.makeId(),
                            title: "UX/UI",
                            description: "",
                            memberIds: ['1011','1012' ],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Launch Timeline ",
                            memberIds: ['1014'],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Get nice pictures ",
                            memberIds: ['1013'],
                            labelIds: [],
                        },
                    ],
                    style: {},
                },
                {
                    id: utilService.makeId(),
                    title: "Frontend",
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Create Homepage",
                            description: "Group 1 only",
                            memberIds: ['1012'],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Supprot Drag&Drop",
                            description: "",
                            comments: [
                                {
                                    id: utilService.makeId(),
                                    txt: "also @yaronb please CR this",
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: "Tal Tarablus",
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
                            memberIds: ['1011'],
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
                            title: "Login and SignUp page",
                            description: "",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Plane components tree",
                            description: "",
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
                    title: "Backend",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Applying server",
                            description: "",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Support filtration",
                            description: "",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "Planing the JSON file",
                            memberIds: [],
                            labelIds: [],
                        },
                    ],
                    style: {}
                },
                {
                    id: utilService.makeId(),
                    title: "QA",
                    archivedAt: '',
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Meeting with head manager for planning the code progress",
                            description: "",
                            memberIds: [],
                            labelIds: [],
                        },
                        {
                            id: utilService.makeId(),
                            title: "fixing Bugs",
                            description: "",
                            memberIds: [],
                            labelIds: [],
                        },
                        
                    ],
                    style: {}
                }
            ],
            activities: [
               
                
            ],
            cmpsOrder: ["status-picker", "member-picker", "date-picker"]
        },
        {
        toggleLabels: false,
        _id: "b102",
        title: "Start Up",
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
                color: "#B7DDB0"
            },
            {
                //light blue
                id: 'la202',
                title: "Progress",
                color: "#F5EA92"
            },
            {
                //green
                id: 'la203',
                title: "Free time",

                color: "#FAD29C"
            },
            {
                //red
                id: 'la204',
                title: "Urgent",
                color: "#EFB3AB"
            },
            {
                //yellow
                id: 'la205',
                title: "Can wait",
                color: "#DFC0EB"
            },
            {
                //orange
                id: 'la206',
                title: "Priority",
                color: "#8BBDD9"
            }
        ]
        ,
        members: [
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
                title: "General",
                archivedAt: '',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Target Product Launch Date: November 1, 2022",
                        description: "Call the company and schedule",
                        memberIds: [],
                        labelIds: [],

                    },
                    {
                        id: utilService.makeId(),
                        title: "UX/UI",
                        description: "",
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
                        title: "Launch Timeline ",
                        memberIds: [],
                        labelIds: [],
                    },
                    {
                        id: utilService.makeId(),
                        title: "Get nice pictures ",
                        memberIds: [],
                        labelIds: [],
                    },
                ],
                style: {},
            },
            {
                id: utilService.makeId(),
                title: "Frontend",
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Create Homepage",
                        description: "Group 1 only",
                        memberIds: [],
                        labelIds: [],
                    },
                    {
                        id: utilService.makeId(),
                        title: "Supprot Drag&Drop",
                        description: "",
                        comments: [
                            {
                                id: utilService.makeId(),
                                txt: "also @yaronb please CR this",
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: utilService.makeId(),
                                    fullname: "Tal Tarablus",
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
                        title: "Login and SignUp page",
                        description: "",
                        memberIds: [],
                        labelIds: [],
                    },
                    {
                        id: utilService.makeId(),
                        title: "Plane components tree",
                        description: "",
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
                title: "Backend",
                archivedAt: '',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Applying server",
                        description: "",
                        memberIds: [],
                        labelIds: [],
                    },
                    {
                        id: utilService.makeId(),
                        title: "Support filtration",
                        description: "",
                        memberIds: [],
                        labelIds: [],
                    },
                    {
                        id: utilService.makeId(),
                        title: "Planing the JSON file",
                        memberIds: [],
                        labelIds: [],
                    },
                ],
                style: {}
            },
            {
                id: utilService.makeId(),
                title: "QA",
                archivedAt: '',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Meeting with head manager for planning the code progress",
                        description: "",
                        memberIds: [],
                        labelIds: [],
                    },
                    {
                        id: utilService.makeId(),
                        title: "fixing Bugs",
                        description: "",
                        memberIds: [],
                        labelIds: [],
                    },
                ],
                style: {}
            }
        ],
        activities: [
            
        ],
        cmpsOrder: ["status-picker", "member-picker", "date-picker"]
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
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
                isStared: false
            },
            groups: []
        },
        ]
    return gBoards
}


function getGUsers (){

    return [
        {
            _id: "1014",
            fullname: "Roi Yotvat",
            username: "Roi Yotvat",
            password: "roi1010",
            imgUrl: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583580/sprint%204%20/T03E3RZ2KHV-U03HE9ZJTA6-79c26a7781c8-512_m1ydbz.png
    `,
            mentions: [{
                id: utilService.makeId(),
                boardId: "m101",
                taskId: "t101"
            }]
        },
        {
            _id: "1013",
            fullname: 'Yaara Yehuda',
            username: "yaara yehuda",
            password: "yaara123",
            imgUrl: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583460/sprint%204%20/T03E3RZ2KHV-U03KVHTDXAR-77f29bd19fdf-512_vqrj3l.jpg
    `,
            mentions: [{
                id: utilService.makeId(),
                boardId: "m101",
                taskId: "t101"
            }]
        },
        {
            _id: "1012",
            fullname: "Dekel Ido",
            username: "dekelido",
            password: "dekel1010",
            imgUrl: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583549/sprint%204%20/T03E3RZ2KHV-U03KC7A8R6F-97b018241b8a-512_ougkz6.jpg
    `,
            mentions: [{
                id: utilService.makeId(),
                boardId: "m101",
                taskId: "t101"
            }]
        },
        {
            _id: '1011',
            fullname: "Eldad Yikne",
            username: 'eldad',
            password: "aBambi123",
            imgUrl: `https://res.cloudinary.com/dwdpgwxqv/image/upload/v1663583512/sprint%204%20/T03E3RZ2KHV-U03GZ4S8P7C-0dcebbbdbc4f-512_tlntp4.jpg
    `,
            mentions: [{
                id: utilService.makeId(),
                boardId: "m101",
                taskId: "t101"
            }]
        },
    ]

}
