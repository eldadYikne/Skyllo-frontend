import { ReactComponent as CloseDynamicCmp } from '../../assets/img/close-task-form.svg'
import { ReactComponent as GoBackIcon } from '../../assets/img/go-back-label-icon.svg'
import { ReactComponent as ChosenColorIcon } from '../../assets/img/label-exist-icon.svg'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { detailsColorsConsts } from '../../const/board-list-consts';
import { updateBoard } from '../../store/board.actions';
import { utilService } from '../../services/util.service'
import { useEffect } from 'react'


export const CreateLabel = ({ setDynamicType, setIsCreateLabel, setTask, setHideHeader,board }) => {
    const params = useParams()
    const taskId = params.taskId
    const groupId = params.groupId

    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)

    const [editInputText, setEditInputText] = useState('')
    const [selectedEditColor, setSelectedEditColor] = useState('green')

    const dispatch = useDispatch()

    const onLabelSave = (ev) => {
        ev.preventDefault()
        const labelToSave = {
            id: utilService.makeId(),
            title: editInputText,
            color: selectedEditColor
        }

        const newLabelIds = [...task.labelIds, labelToSave.id]
        const taskToUpdate = { ...task, labelIds: newLabelIds }

        const groupIdx = board.groups.findIndex(currGroup => group.id === currGroup.id)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(currTask => task.id === currTask.id)
        
        board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToUpdate)
        const boardToUpdate = { ...board, labels: [...board.labels, labelToSave] }
        dispatch(updateBoard(boardToUpdate))

        // setTask(taskToUpdate)
        setHideHeader(true)
        setIsCreateLabel(false)
    }

    useEffect(() => {
        setHideHeader(false)
        
    }, [])
    
    const handleChangeLabelText = (ev) => {
        const text = ev.target.value
        setEditInputText(text)
    }

    const handleChangeLabelColor = (color) => {
        setSelectedEditColor(color)
    }

    const onGoBack = () => {
        setIsCreateLabel(false)
        setHideHeader(true)
    }

    const selectedColorIcon = (color) => {
        if (color === selectedEditColor) return <ChosenColorIcon className='color-chosen-icon' />
    }

    return <section className="edit-label-cmp">
        <section className="dynamic-cmp-header">{'Create new label'}
            <button className='close-edit-label-modal'>
                <CloseDynamicCmp onClick={() => setDynamicType('')} />
            </button>
            <button className='go-back-label-edit'>
                <GoBackIcon onClick={onGoBack} />
            </button>
        </section>

        <section className='edit-labels-modal'>
            <h4>Name</h4>
            <form className='edit-label-form' onSubmit={onLabelSave}>
                <input onChange={handleChangeLabelText} type='text' value={editInputText} id='' />
                <h4>Select a color</h4>
                <section className='edit-labels-color-container'>
                    {detailsColorsConsts.map(color => {
                        return <div className='label-edit-color-box'
                            onClick={() => handleChangeLabelColor(color)}
                            key={color}
                            style={{ backgroundColor: color }}>
                                {selectedColorIcon(color)}
                        </div>
                    })}
                </section>
                <section className='edit-label-btns'>
                    <button className='create-new-label-btn'>
                        Create
                    </button>
                </section>
            </form>
        </section>
    </section>

}