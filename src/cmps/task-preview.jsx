import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { boardService } from "../services/board.service";
import { updateBoard } from "../store/board.actions";
import { TaskDetails } from "./task-details";

export function TaskPreview({ task }) {

    const board = useSelector(state => state.boardModule.board)
    const labelsOpen = board.toggleLabels

    const [taskLabels, setTaskLabels] = useState()
    const [taskMembers, setTaskMembers] = useState()
    const dispatch = useDispatch()

    let bgColor = task.cover ? task.cover : ''
    let backgroundStyle = bgColor?.length > 9 ? 'backgroundImage' : 'backgroundColor'
    let heightImg
    if (bgColor?.length > 9) {
        bgColor = `url(${bgColor})`
        heightImg = '162px'
    } else {
        heightImg = '32px'
    }

    const loadLabels = () => {
        if (!task) return
        if (!task.labelIds) return
        const labelIds = task.labelIds
        const taskLabel = labelIds?.map(id => {
            return boardService.getLabelsById(board, id)
        })
        return setTaskLabels(taskLabel)
    }
    const loadMembers = () => {
        if (!task) return
        const membersIds = task.memberIds
        const taskMembers = membersIds?.map(id => {
            console.log('iddddddddddd:', id)

            return boardService.getMembersById(board, id)
        })
        console.log('taskMembers:', taskMembers)

        return setTaskMembers(taskMembers)
    }

    useEffect(() => {
        loadLabels()
        loadMembers()
    }, [board])

    const onToggleLabels = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const newBoard = { ...board, toggleLabels: !board.toggleLabels }
        dispatch(updateBoard(newBoard))
    }

    const labelsClass = labelsOpen ? 'task-preview-label-preview-open' : 'task-preview-label-preview'

    return (
        <section className="task-preview">
            {bgColor && <div style={{ [backgroundStyle]: bgColor, height: heightImg }} className="task-cover-background"> </div>}
            {taskLabels &&
                <div className="task-preview-labels-list">
                    {taskLabels.map(label => {
                        return <div onClick={onToggleLabels}
                            key={label.color}
                            className={labelsClass}
                            style={{ backgroundColor: label.color }}>
                            {labelsOpen && <span>{label.title}</span>}
                        </div>
                    })}
                </div>
            }
            <p>{task.title}</p>
            <div className="task-preview-Characters">

                <div className="task-preview-pins">

                </div>

                <div className="task-preview-members-container">
                    {taskMembers && taskMembers.map(member => {
                        return <div className="task-preview-member-box">
                            
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}