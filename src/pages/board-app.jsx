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
        if (!destination) {
            return
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        
        const group = board.groups[source.droppableId];
        
        const newTaskIds = Array.from(group.tasks, (task)=>task.id)
        console.log('newTaskIds',newTaskIds)
        
    }

    if (!board) return <h1>Loading</h1>
  
    return <div  className="board-app" >
        <BoardHeader board={board} />

        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {board && <GroupList board={board} />}
        </DragDropContext>

        <Outlet />

    </div>
}


