import { httpService } from "./http.service";
import { utilService } from './util.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard, getCurrBoard } from '../store/board.actions.js'
import { store } from '../store/store'
import { socketService, SOCKET_EVENT_BOARD_ADDED, SOCKET_EVENT_BOARD_UPDATED } from "./socket.service";

const boardChannel = new BroadcastChannel('boardChannel')
    ; (() => {
        boardChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
        socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) => {
            console.log('GOT from socket', board)
            store.dispatch(getActionAddBoard(board))
        })
        socketService.on(SOCKET_EVENT_BOARD_UPDATED, (board) => {
            // console.log('GOT from socket', board)
            store.dispatch(getActionUpdateBoard(board))
        })
        console.log('soceeekt');

    })()



export const boardService = {
    query,
    getById,
    remove,
    save,
    createBoard,
    addGroup,
    removeGroup,
    saveTask,
    removeTask,
    getLabelsById,
    getMembersById
}

const BASE_URL = 'board/'

async function query(filterBy = {}) {
    try {
        const boards = await httpService.get(BASE_URL, { params: filterBy })
        return boards
    } catch (err) {
        console.log('Oops,', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const board = await httpService.get(BASE_URL + boardId)
        // boardChannel.postMessage(getCurrBoard(board))
        return board
    } catch (err) {
        console.log('Oops,', err)
        throw err
    }
}

async function remove(boardId) {
    try {
        await httpService.delete(BASE_URL + boardId)
        // boardChannel.postMessage(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Oops,', err)
        throw err
    }
}

async function save(board, activity = '') {
    if (board === null) return
    if (board._id) {
        try {
            const boardToUpdate = await httpService.put(BASE_URL + board._id, board)
            console.log('board service', board)
            if (activity) {
                board.activities.unshift(createActivity(activity.text, activity.title, activity.taskId, activity.user, activity.groupId))
                // board.activities.unshift(createActivity(activity.text, task.title, task.id, activity.user, groupId))

                console.log('activity', activity)

            }
            // boardChannel.postMessage(getActionAddBoard(boardToUpdate))
            return boardToUpdate
        } catch (err) {
            console.log('Oops,', err)
            throw err
        }
    } else {
        try {
            console.log('boardddddd',board)
            
            const boardToAdd = await httpService.post(BASE_URL, board)
            // boardChannel.postMessage(getActionUpdateBoard(boardToAdd))
            console.log('boardToAdd',boardToAdd)
            
            return boardToAdd
        } catch (err) {
            console.log('Oops,', err)
            throw err
        }
    }
}

function createBoard(title, bgImg) {
    return {
        title: title,
        archivedAt: '',
        createdAt: Date.now(),
        createdBy: {},
        style: {
            bgImg,
            backgroundColor:''
        },
        groups: [],
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
        board.activities.unshift(createActivity(activity.text, task.title, task.id, activity.user, groupId))
        group.tasks.splice(taskIdx, 1, task)
    } else {
        task.id = utilService.makeId()
        console.log(task);
        board.activities.unshift(createActivity(activity.text, task.title, task.id, activity.user, groupId))
        group.tasks.push(task)
    }

    return save(board)
}

async function removeTask(boardId, groupId, task, activity) {
    const board = await getById(boardId)
    const group = board.groups.find((group) => group.id === groupId)
    const taskIdx = group.tasks.findIndex((currTask) => currTask.id === task.id)
    group.tasks.splice(taskIdx, 1)
    board.activities.unshift(createActivity(activity.text, task.title, task.id, activity.user, groupId))
    return save(board)
}
const createActivity = (text = '', taskTitle = '', taskId = '', user = '', groupId = '') => {
    return {
        id: utilService.makeId(),
        txt: text,
        createdAt: new Date(),
        byMember: user,
        groupId,
        task: {
            id: taskId,
            title: taskTitle
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