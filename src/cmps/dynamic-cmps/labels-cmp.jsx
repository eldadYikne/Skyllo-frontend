
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../assets/img/edit-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask } from '../../store/board.actions'



export const LabelsCmp = ({ task, group, setDynamicType, setTask }) => {

    const dispatch = useDispatch()

    const board = useSelector(state => state.boardModule.board)
    const BoardLabels = board.labels
    const [isEditLabel, setIsEditLabel] = useState(true)
    const [isCreateLabel, setIsCreateLabel] = useState(true)

    const onChooseLabel = (labelId) => {
        console.log(task)
        if (!task.labelIds?.includes(labelId)) {
            const newLabelsToTask = [...task.labelIds, labelId]
            const taskToUpdate = { ...task, labelIds: newLabelsToTask }
            console.log(taskToUpdate)
            setTask(taskToUpdate)
            
            
        }
        else {
            const newLabelIds = task.labelIds.filter(currLabelId => currLabelId !== labelId)
            const taskToUpdate = { ...task, labelIds: newLabelIds }
            setTask(taskToUpdate)   
        }
    }

    return <section className="labels-cmp">
        <h4>Labels</h4>
        <div className="labels-list">
            {board.labels.map(label => {
                return (
                    <div key={label.id} className="label-container">
                        <div style={{ backgroundColor: label.color }} className='label-color-box' onClick={() => onChooseLabel(label.id)}>
                            {label.title ? label.title : ''}</div>
                        <button className='edit-label-btn'>
                            <EditIcon />
                        </button>
                    </div>
                )
            })}
        </div>

        <button className='create-new-label-btn'>
            Create a new label
        </button>

    </section>
}
