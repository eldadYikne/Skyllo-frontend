import { boardService } from "../services/board.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            console.log('Boards from DB:', boards)
            dispatch({
                type: 'SET_BOARDS',
                boards
            })

        } catch (err) {
            showErrorMsg('Cannot load boards')
            console.log('Cannot load boards', err)
        }
    }
}
export function getCurrBoard(boardId) {
    console.log('boardId',boardId)
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            console.log(board)
            dispatch({type: 'SET_BOARD', board})
        } catch (err) {
            showErrorMsg('Cannot load board')
            console.log('Cannot load board', err)
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveBoard(boardId))
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return (dispatch) => {
        boardService.save(board)
            .then(savedBoard => {
                console.log('Added Board', savedBoard);
                dispatch(getActionAddBoard(savedBoard))
                showSuccessMsg('Board added')
            })
            .catch(err => {
                showErrorMsg('Cannot add board')
                console.log('Cannot add board', err)
            })
    }
}

export function updateBoard(board,isStared) {
    return (dispatch) => {
        boardService.save(board,isStared)
            .then(savedBoard => {
                console.log('Updated Board:', savedBoard);
                dispatch(getActionUpdateBoard(savedBoard))
                showSuccessMsg('Board updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update board')
                console.log('Cannot save board', err)
            })
    }
}

export function addGroup(boardId, title, activity) {
    return async (dispatch) => {
        try {
            const board = await boardService.addGroup(boardId, title, activity)
            dispatch(getActionUpdateBoard(board))
            showSuccessMsg('Group Added')
        } catch(err) {
            showErrorMsg('Cannot add group')
            console.log('tassk');

            console.log('error:', err)
        }
    }
}

export function addTask( boardId, groupId, task, activity ) {
    return async (dispatch) => {
        try {
            const board = await boardService.saveTask(boardId, groupId, task, activity)
            dispatch(getActionUpdateBoard(board))
            showSuccessMsg('Group Added')
        } catch(err) {
            showErrorMsg('Cannot add group')
            console.log('error:', err)
        }
    }
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
