// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'
import { Outlet } from "react-router-dom";
import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
// import { boardService } from '../services/board.service.js'
export function BoardApp() {
    // useEffect(() => {
    //     loadBoards()
    // }, [])
    // const onRemoveBoard = (boardId) => {
    //     removeBoard(boardId)
    // }
    // const onAddBoard = () => {
    //     const board = boardService.getEmptyBoard()
    //     board.vendor = prompt('Vendor?')
    //     addBoard(board)
    // }
    // const onUpdateBoard = (board) => {
    //     const price = +prompt('New price?')
    //     const boardToSave = { ...board, price }
    //     updateBoard(boardToSave)
    // }
    return <div>
            <h1 style={{color: 'black'}}>Boards App</h1>
            <BoardHeader />
            <GroupList />
        </div>
}