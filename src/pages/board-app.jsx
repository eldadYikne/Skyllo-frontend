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
    
   

    return <div className="board-app">
            <BoardHeader />
            <GroupList />
        </div>
    
}


