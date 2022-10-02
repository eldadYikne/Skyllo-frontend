
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { ReactComponent as CloseDynamicCmp } from '../../assets/img/close-task-form.svg'
import { ReactComponent as GoBackIcon } from '../../assets/img/go-back-label-icon.svg'
import { ReactComponent as ChosenColorIcon } from '../../assets/img/label-exist-icon.svg'
import { detailsColorsConsts } from '../../const/board-list-consts';
import { labelsColors } from '../../const/board-list-consts';
import { utilService } from '../../services/util.service';
import { saveTask, updateBoard } from '../../store/board.actions';

export const EditLabel = ({ setDynamicType, setIsEditLabel, selectedLabel, setHideHeader, group, user }) => {
    const board = useSelector(state => state.boardModule.board)

    const params = useParams()
    const taskId = params.taskId
    const groupId = params.groupId

    // const currGroup = board.groups.find(group => group.id === groupId)
    const currTask = group.tasks.find(task => task.id === taskId)

    const [editInputText, setEditInputText] = useState(selectedLabel.title)
    const [selectedEditColor, setSelectedEditColor] = useState(selectedLabel.color)
    const dispatch = useDispatch()

    const onLabelSave = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        const labelToSave = {
            id: selectedLabel.id,
            title: editInputText,
            color: selectedEditColor
        }

        const boardLabelIdx = board.labels.findIndex(boardLabel => {
            return boardLabel.id === labelToSave.id
        })

        const boardToUpdate = structuredClone(board)
        boardToUpdate.labels.splice([boardLabelIdx], 1, labelToSave);

        dispatch(updateBoard(boardToUpdate))
        setIsEditLabel(false)
        setHideHeader(true)
    }

    const onRemoveLabel = (ev) => {
        ev.preventDefault()
        const boardToUpdate = structuredClone(board)
        boardToUpdate.groups.forEach(group => {
                    group.tasks.forEach(task => {
                        task.labelIds = task.labelIds.filter(labelId => labelId !== selectedLabel.id)
                    })
                })
        boardToUpdate.labels = boardToUpdate.labels.filter(label => label.id !== selectedLabel.id)      
        dispatch(updateBoard(boardToUpdate))
        setIsEditLabel(false)
        setHideHeader(true)
    }

    const handleChangeLabelText = (ev) => {
        const text = ev.target.value
        setEditInputText(text)
    }

    const handleChangeLabelColor = (color, ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setSelectedEditColor(color)
    }

    const selectedColorIcon = (color) => {
        if (color === selectedEditColor) return <ChosenColorIcon className='color-chosen-icon' />
    }

    const onGoBack = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        setIsEditLabel(false)
        setHideHeader(true)
    }
    const onHoverLabel = (ev, color) => {
        ev.target.style.background = utilService.lightenDarkenColor(color, -10);
    }

    const onLeaveHoverLabel = (ev, color) => {
        ev.target.style.background = color
    }

    return <section className="edit-label-cmp">
        <section className="dynamic-cmp-header">{'Edit label'}
            <button className='close-edit-label-modal'>
                <CloseDynamicCmp onClick={() => setDynamicType('')} />
            </button>
            <button className='go-back-label-edit'>
                <GoBackIcon onClick={onGoBack} />
            </button>
        </section>

        <section className='edit-labels-modal'>
            <h4>Name</h4>
            <form className='edit-label-form' onSubmit={(ev) => onLabelSave(ev)}>
                <input onChange={handleChangeLabelText} type='text' value={editInputText} id='' />
                <h4>Select a color</h4>
                <section className='edit-labels-color-container'>
                    {labelsColors.map(color => {
                        return <div className='label-edit-color-box'
                            onMouseEnter={(ev) => onHoverLabel(ev, color)}
                            onMouseLeave={(ev) => onLeaveHoverLabel(ev, color)}
                            onClick={(ev) => handleChangeLabelColor(color, ev)}
                            key={color}
                            style={{ backgroundColor: color }}>
                            {selectedColorIcon(color)}
                        </div>
                    })}

                </section>
                <section className='edit-label-btns'>
                    <button className='create-new-label-btn'>
                        Save label
                    </button>
                    <span onClick={onRemoveLabel} className='delete-label-btn'>
                        Delete
                    </span>
                </section>
            </form>

        </section>

    </section>
}