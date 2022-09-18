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

// import { boardService } from '../services/board.service.js'

export function BoardApp() {

    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrBoard(params.boardId))
    }, [])

    const board = useSelector(state => state.boardModule.board)
    // const onRemoveGroup = (groupId) => {
    //     removeGroup(groupId)
    // }
    // const onAddGroup = () => {
    //     const group = GroupService.getEmptyGroup()
    //     addGroup(Group)
    // }
    // const onUpdateGroup = (group) => {
    //     const price = +prompt('New price?')
    //     const groupToSave = { ...group, price }
    //     updateGroup(groupToSave)
    // }
    if (!board) return <h1>Loading</h1>
    let backgroundStyle = board.style.bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'
    return <div style={{ [backgroundStyle]: board.style.bgImg, objectFit: 'cover', backgroundSize: 'cover'}} className="board-app" >
        <BoardHeader  board={board} />
        {board && <GroupList board={board} />}
        <Outlet />
    </div>
}


