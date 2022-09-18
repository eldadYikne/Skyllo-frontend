
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../assets/img/edit-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask } from '../../store/board.actions'
import { EditLabel } from './edit-label-cmp'



export const LabelsCmp = ({ task, group, setDynamicType }) => {

    const dispatch = useDispatch()

    const board = useSelector(state => state.boardModule.board)
    const BoardLabels = board.labels
    const [isEditLabel, setIsEditLabel] = useState(false)
    const [isCreateLabel, setIsCreateLabel] = useState(true)

    const onChooseLabel = (labelId) => {
        if (!task.labelIds?.includes(labelId)) {
            const newLabelsToTask = [...task.labelIds, labelId]
            const taskToUpdate = { ...task, labelIds: newLabelsToTask }
            dispatch(saveTask(board._id, group.id, taskToUpdate))
            console.log('taskToUpdateid:', taskToUpdate)
        }
        else {
            const newLabelIds = task.labelIds.filter(currLabelId => currLabelId !== labelId)
            const taskToUpdate = { ...task, labelIds: newLabelIds }
            dispatch(saveTask(board._id, group.id, taskToUpdate))
            console.log('taskToUpdateelse:', taskToUpdate)
        }
    }
    return <section>
        {!isEditLabel && <div>
            <section className="labels-cmp">
                <h4>Labels</h4>
                <div className="labels-list">
                    {board.labels.map(label => {
                        return (
                            <div key={label.id} className="label-container">
                                <div style={{ backgroundColor: label.color }} className='label-color-box' onClick={() => onChooseLabel(label.id)}>
                                    {label.title ? label.title : ''}</div>
                                <button className='edit-label-btn'>
                                    <EditIcon onClick={() => setIsEditLabel(!isEditLabel)} />
                                </button>
                            </div>
                        )
                    })}
                </div>

                <button className='create-new-label-btn'>
                    Create a new label
                </button>
            </section>
        </div>}

        {isEditLabel &&
            <EditLabel setIsEditLabel={setIsEditLabel} setDynamicType={setDynamicType} />
        }
    </section>
}
