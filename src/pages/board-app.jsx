// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.service";
import { getCurrBoard, addGroup } from "../store/board.actions";
import { onSignup } from "../store/user.actions";
import { userService } from "../services/user.service";
import { DragDropContext } from "react-beautiful-dnd";

// import { boardService } from '../services/board.service.js'

export function BoardApp() {

    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrBoard(params.boardId))
        userService.signup({ username: 'dekel', password: '123' })
    }, [])

    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)


    const onDragEnd = (result) => {
        const { destination, source, draggabaleId } = result
    }

    if (!board) return <h1>Loading</h1>
    let backgroundStyle = board.style.bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'
    return <div style={{ [backgroundStyle]: board.style.bgImg, objectFit: 'cover', backgroundSize: 'cover' }} className="board-app" >
        <BoardHeader board={board} />

        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {board && <GroupList board={board} />}
        </DragDropContext>

        <Outlet />
        {/* <div className='black-screen'></div> */}

    </div>
}


