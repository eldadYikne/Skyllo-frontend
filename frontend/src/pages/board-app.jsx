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
import { getCurrBoard, addGroup, updateBoard } from "../store/board.actions";
import { onSignup } from "../store/user.actions";
import { userService } from "../services/user.service";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Popover } from "../cmps/popover-cmp";
import { LoaderSkyllo } from "../cmps/loader-cmp";

// import { boardService } from '../services/board.service.js'

export function BoardApp() {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrBoard(params.boardId))
    }, [])

    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)


    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        const newBoard = structuredClone(board)

        if (!destination) {
            return;
        }

       

        console.log('group', result)
        // DRABBALE GROUP
        console.log(source.droppableId === destination.droppableId,source.droppableId , destination.droppableId)
        if (source.droppableId === destination.droppableId && type === "group") {
            console.log(source, 'sourcesourcesourcesourcesource');
            const currGroup = newBoard.groups.find(group => group.id === draggableId)
            newBoard.groups.splice(source.index, 1)
            newBoard.groups.splice(destination.index, 0, currGroup)

            // GRABBALE TASK IN SAME GROUP
        } else if (source.droppableId === destination.droppableId) {
            const group = newBoard.groups.find(group => group.id === source.droppableId)
            const currTask = group?.tasks?.find(task => task.id === draggableId)
            group?.tasks?.splice(source.index, 1);
            group?.tasks?.splice(destination.index, 0, currTask)
            // GRABBALE TASK 
        } else if (source.droppableId !== destination.droppableId) {
            const fromGroup = newBoard.groups.find(group => group.id === source.droppableId)
            const toGroup = newBoard.groups.find(group => group.id === destination.droppableId)
            const currTask = fromGroup.tasks.find(task => task.id === draggableId)
            fromGroup.tasks.splice(source.index, 1);
            toGroup.tasks.splice(destination.index, 0, currTask)

        }
        dispatch(updateBoard(newBoard))
    }

    if (!board) return <LoaderSkyllo />
    let backgroundStyle = board?.style?.bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'

    return <div  style={{ [backgroundStyle]: board?.style?.bgImg, objectFit: 'cover', backgroundSize: 'cover' }} className="main">


        <div style={{overflow:'auto'}}  className="board-app" >
            <BoardHeader board={board} />
            <Popover board={board} />
            <DragDropContext  onDragEnd={onDragEnd}>

                <Droppable   droppableId='all-groups' direction="horizontal" type="group">
                    {(provided) => {
                        return <li className='list-move-group'
                            {...provided.draggableProps}
                            ref={provided.innerRef} >

                            <GroupList board={board} >
                            </GroupList>
                            { provided.placeholder }

                        </li>
                    }}
                </Droppable>
            </DragDropContext>


            <Outlet />

        </div>
    </div >
}


