// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'
import React from 'react'
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
import { AppHeader } from "../cmps/app-header";
import { HomePageHeader } from '../cmps/header-home-page';
// import { boardService } from '../services/board.service.js'

export function BoardApp() {

    const params = useParams()
    const dispatch = useDispatch()
    const board = useSelector(state => state.boardModule.board)
    const [headerColor, setHeaderColor] = useState()

    useEffect(() => {
        dispatch(getCurrBoard(params.boardId))

        return () => { dispatch(updateBoard(null)) }
    }, [])
useEffect(()=>{
   if(board) onChangeHeaderColor(board)
},[board.style])
    const user = useSelector(state => state.userModule.user)


    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        const newBoard = structuredClone(board)
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId && type === "group") {
            // DRABBALE GROUP
            const currGroup = newBoard.groups.find(group => group.id === draggableId)
            newBoard.groups.splice(source.index, 1)
            newBoard.groups.splice(destination.index, 0, currGroup)

        } else if (source.droppableId === destination.droppableId) {
            // GRABBALE TASK IN SAME GROUP
            const group = newBoard.groups.find(group => group.id === source.droppableId)
            const currTask = group?.tasks?.find(task => task.id === draggableId)
            group?.tasks?.splice(source.index, 1);
            group?.tasks?.splice(destination.index, 0, currTask)

        } else if (source.droppableId !== destination.droppableId) {
            // GRABBALE TASK 

            const fromGroup = newBoard.groups.find(group => group.id === source.droppableId)
            const toGroup = newBoard.groups.find(group => group.id === destination.droppableId)
            const currTask = fromGroup.tasks.find(task => task.id === draggableId)
            fromGroup.tasks.splice(source.index, 1);
            toGroup.tasks.splice(destination.index, 0, currTask)

            return dispatch(updateBoard(newBoard, { text: `moved from ${fromGroup.title} to ${toGroup.title}`, title: currTask.title, taskId: currTask.id, user: user, groupId: fromGroup.id }))
        }

        dispatch(updateBoard(newBoard))

    }


    const onChangeHeaderColor = (board) => {
        const newBgImg = board?.style?.bgImg
        const boardImg = newBgImg?.substring(4, newBgImg.length - 1)
        getBgColorOfImg(boardImg, board)

    }

    const getBgColorOfImg = async (url, board) => {
        console.log('board', board)
        if (!board) return
        try {
            if (board.style?.bgImg.length > 9) {
                const fac = new FastAverageColor();
                const color = await fac.getColorAsync(url)
                board.style.backgroundColor = color.rgb;
                console.log(' board.style.backgroundColor ', board.style.backgroundColor )
                
            } else if (board.style?.bgImg) {
                const color = hexToRgb(board.style?.bgImg)
                board.style.backgroundColor = ` rgba(${color.r},${color.g},${color.b},.45)`
            }
            setHeaderColor(board.style.backgroundColor)

        } catch (err) {
            console.log(err);

        }
        return headerColor

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
    let backgroundStyle = board?.style?.bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'
    const pageHeigth = user ? '124px' : '140px'


    return <React.Fragment>
        {!user && <HomePageHeader />}
        {user && <AppHeader  headerColor={headerColor} board={board} />}
        <div style={{ [backgroundStyle]: board?.style?.bgImg, objectFit: 'cover', backgroundSize: 'cover' }} className="main">


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
    </React.Fragment>
}


