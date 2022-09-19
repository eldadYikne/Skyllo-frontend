
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../assets/img/edit-icon.svg'
import { ReactComponent as LabelExistIcon } from '../../assets/img/label-exist-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask } from '../../store/board.actions'
import { CreateLabel } from './create-new-label'
import { EditLabel } from './edit-label-cmp'



export const LabelsCmp = ({ task, group, setDynamicType, setTask, setHideHeader }) => {

    const dispatch = useDispatch()

    const board = useSelector(state => state.boardModule.board)
    const BoardLabels = board.labels
    const [isEditLabel, setIsEditLabel] = useState(false)
    const [isCreateLabel, setIsCreateLabel] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState('')

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

    const onChooseLabelToEdit = (label) => {
        console.log('label:', label)
        setIsEditLabel(!isEditLabel)
        setHideHeader(false)
        setSelectedLabel(label)
    }

    const labelExistIcon = (labelId) => {
        const exist = task.labelIds.find(id => {
            return labelId === id
        })
        if (exist) return <LabelExistIcon className='label-exist-icon' />
    }

    return <section>
        {!isEditLabel && !isCreateLabel && <div>
            <section className="labels-cmp">
                <h4>Labels</h4>
                <div className="labels-list">
                    {board.labels.map(label => {
                        return (
                            <div key={label.id} className="label-container">
                                <div style={{ backgroundColor: label.color }} className='label-color-box' onClick={() => onChooseLabel(label.id)}>
                                    {label.title ? label.title : ''}
                                    {labelExistIcon(label.id)}
                                </div>
                                <button className='edit-label-btn'>
                                    <EditIcon onClick={() => onChooseLabelToEdit(label)} />
                                </button>
                            </div>
                        )
                    })}
                </div>

                <button onClick={() => setIsCreateLabel(!isCreateLabel)} className='create-new-label-btn'>
                    Create a new label
                </button>
            </section>
        </div>}

        {isEditLabel &&
            <EditLabel setIsEditLabel={setIsEditLabel}
                selectedLabel={selectedLabel}
                setDynamicType={setDynamicType}
                setTask={setTask}
                setHideHeader={setHideHeader} />
        }

        {isCreateLabel &&
            <CreateLabel
                board={board}
                setHideHeader={setHideHeader}
                setIsCreateLabel={setIsCreateLabel}
                setDynamicType={setDynamicType}
                setTask={setTask} />
        }
    </section>
}
