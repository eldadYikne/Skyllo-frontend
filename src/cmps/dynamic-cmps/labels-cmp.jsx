
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../assets/img/edit-icon.svg'
import { ReactComponent as LabelExistIcon } from '../../assets/img/label-exist-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask } from '../../store/board.actions'
import { CreateLabel } from './create-new-label'
import { EditLabel } from './edit-label-cmp'

export const LabelsCmp = ({ task, group, setDynamicType, setTask, setHideHeader, comeFromMiniEdit }) => {

    const dispatch = useDispatch()

    const board = useSelector(state => state.boardModule.board)
    const BoardLabels = board.labels
    const [isEditLabel, setIsEditLabel] = useState(false)
    const [isCreateLabel, setIsCreateLabel] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState('')
    const user = useSelector(state => state.userModule.user)

    const onChooseLabel = (labelId, ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (!task.labelIds) task.labelIds = []
        if (!task.labelIds?.includes(labelId)) {
            const newLabelsToTask = [...task.labelIds, labelId]
            const taskToUpdate = { ...task, labelIds: newLabelsToTask }
            console.log(taskToUpdate)
            console.log('label cmp board:', board._id)
            // setTask(taskToUpdate)
            dispatch(saveTask(board._id, group.id, taskToUpdate, { text: 'choose label', user: user }))
        }

        else {
            const newLabelIds = task.labelIds.filter(currLabelId => currLabelId !== labelId)
            const taskToUpdate = { ...task, labelIds: newLabelIds }
            // setTask(taskToUpdate)

            dispatch(saveTask(board._id, group.id, taskToUpdate, { text: 'deleted task', user }))
        }
    }

    const onChooseLabelToEdit = (label, ev) => {
        console.log('label:', label)
        ev.preventDefault()
        ev.stopPropagation()

        setIsEditLabel(!isEditLabel)
        setHideHeader(false)
        setSelectedLabel(label)
    }

    const labelExistIcon = (labelId) => {
        const exist = task?.labelIds?.find(id => {
            return labelId === id
        })
        if (exist) return <LabelExistIcon className='label-exist-icon' />
    }

    const onChooseCreateLabel = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        setIsCreateLabel(!isCreateLabel)
    }

    const onHoverLabel = (ev, color) => {
        ev.target.style.background = utilService.lightenDarkenColor(color, -10);
    }

    const onLeaveHoverLabel = (ev, color) => {
        ev.target.style.background = color
    }

    return <section>
        {!isEditLabel && !isCreateLabel && <div>
            <section className="labels-cmp">
                <h4>Labels</h4>
                <div className="labels-list">
                    {board.labels.map(label => {
                        return (
                            <div className="label-container">
                                <div style={{ backgroundColor: label.color }}
                                    key={label.id}
                                    onMouseEnter={(ev) => onHoverLabel(ev, label.color)}
                                    onMouseLeave={(ev) => onLeaveHoverLabel(ev, label.color)}
                                    className='label-color-box' onClick={(ev) => onChooseLabel(label.id, ev)}>
                                    <div className='labels-details-mini-color' style={{ backgroundColor: utilService.lightenDarkenColor(label.color, -25) }}></div>
                                    {label.title ? label.title : ''}
                                    {labelExistIcon(label.id)}
                                </div>

                                {!comeFromMiniEdit && <button className='edit-label-btn'>
                                    <EditIcon onClick={(ev) => onChooseLabelToEdit(label, ev)} />
                                </button>}
                            </div>
                        )
                    })}
                </div>

                {!comeFromMiniEdit && <button onClick={(ev) => onChooseCreateLabel(ev)} className='create-new-label-btn'>
                    Create a new label
                </button>}
            </section>
        </div>}

        {isEditLabel &&
            <EditLabel
                user={user}
                group={group}
                task={task}
                setIsEditLabel={setIsEditLabel}
                selectedLabel={selectedLabel}
                setDynamicType={setDynamicType}
                setHideHeader={setHideHeader} />
        }

        {isCreateLabel &&
            <CreateLabel
                user={user}
                group={group}
                board={board}
                setHideHeader={setHideHeader}
                setIsCreateLabel={setIsCreateLabel}
                setDynamicType={setDynamicType}
                

            />
        }
    </section>
}
