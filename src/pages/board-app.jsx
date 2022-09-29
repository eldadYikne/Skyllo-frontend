// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { BoardHeader } from "../cmps/board-header";
import { GroupList } from "../cmps/group-list";
import { boardService } from "../services/board.new.service";
import { getCurrBoard, addGroup, updateBoard } from "../store/board.actions";
import { onSignup } from "../store/user.actions";
import { userService } from "../services/user.new.service";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Popover } from "../cmps/popover-cmp";
import { LoaderSkyllo } from "../cmps/loader-cmp";
import { FastAverageColor } from "fast-average-color";
// import { boardService } from '../services/board.service.js'

export function BoardApp() {

    const params = useParams()
    const dispatch = useDispatch()
    const board = useSelector(state => state.boardModule.board)

    useEffect(() => {
        dispatch(getCurrBoard(params.boardId))
        onChangeHeaderColor(board)
        return () => { dispatch(updateBoard(null)) }

    }, [])

    const user = useSelector(state => state.userModule.user)


    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        const newBoard = structuredClone(board)

        if (!destination) {
            return;
        }
        // DRABBALE GROUP
        if (source.droppableId === destination.droppableId && type === "group") {
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


    const onChangeHeaderColor = (board) => {
        const newBgImg = board?.style?.bgImg
        const boardImg = newBgImg?.substring(4, newBgImg.length - 1)
        getBgColorOfImg(boardImg, board)

    }
    const getBgColorOfImg = async (url, board) => {
        
        try {
            if (!board.style.backgroundColor) board.style.backgroundColor = ''
            if (board.style?.bgImg.length > 9) {
                const fac = new FastAverageColor();
                const color = await fac.getColorAsync(url)
                board.style.backgroundColor = color.rgb;
            } else if (board.style?.bgImg) {
                const color = hexToRgb(board.style?.bgImg)
                board.style.backgroundColor = ` rgba(${color.r},${color.g},${color.b},.45)`
            }
            const newBoard = structuredClone(board)
            dispatch(updateBoard(newBoard))
        } catch (err) {
            console.log(err);

        }
    }
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }



    if (!board) return <LoaderSkyllo />
    // if (!board.style.backgroundColor) return <LoaderSkyllo />
    let backgroundStyle = board?.style?.bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'
    const pageHeigth = user ? '124px' : '140px'
    return <div style={{ [backgroundStyle]: board?.style?.bgImg, objectFit: 'cover', backgroundSize: 'cover' }} className="main">


        <div className="board-app" >
            <BoardHeader board={board} />
            <Popover board={board} />
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId='all-groups' direction="horizontal" type="group">
                    {(provided) => {
                        return <li className='list-move-group'
                            // style={{ maxHeight: `calc(100vh - ${pageHeigth})` }}
                            {...provided.draggableProps}
                            ref={provided.innerRef} >

                            <GroupList board={board} >
                            </GroupList>
                            {provided.placeholder}

                        </li>
                    }}
                </Droppable>
            </DragDropContext>


            <Outlet />

        </div>
    </div >
}


