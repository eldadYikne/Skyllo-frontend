const initialState = {
    boards: [],
    board: null,
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
            
        case 'SET_BOARD':
            return{ ...state, board: action.board }

        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards, lastRemovedBoard }
            
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.board] }
           
        case 'UPDATE_BOARD':            
            return{ ...state, board: action.board }
            // console.log('newState.board:', newState.board)
            
        case 'UNDO_REMOVE_BOARD':
            if (state.lastRemovedBoard) {
                return { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break
        default: return newState
    }

    // For debug:
    // window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    // return newState
}
