// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { Outlet } from "react-router-dom";

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
    
   

    return <div>
            <h1 style={{color: 'black'}}>Boards App</h1>
            <Outlet/>
            
    
        </div>
    
}


