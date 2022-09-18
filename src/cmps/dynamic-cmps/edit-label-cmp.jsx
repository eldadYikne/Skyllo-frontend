
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as CloseDynamicCmp } from '../../assets/img/close-task-form.svg'
import { ReactComponent as GoBackIcon } from '../../assets/img/go-back-label-icon.svg'
import { detailsColorsConsts } from '../../const/board-list-consts';


export const EditLabel = ({ setDynamicType, setIsEditLabel }) => {


    const [editInputText, setEditInputText] = useState('')
    const [selectedLabelColor, setSelectedLabelColor] = useState('')
    const dispatch = useDispatch()



    const onLabelSave = (ev) => {

        ev.preventDefault();
        console.log('editInputText:', editInputText)

        const labelToSave = {
            title: editInputText,
            color: selectedLabelColor
        }



    }

    //     if (boardLabelIdx !== -1) {
    //         // edit
    //         board.labels.splice([boardLabelIdx], 1, labelToSave);
    //         dispatch(onSaveBoard(board));
    //     } else {
    //         // add
    //         const newLabelIds = [...task.labelIds, labelToSave.id]
    //         const updatedTask = { ...task, labelIds: newLabelIds }
    //         const groupIdx = board.groups.findIndex(currGroup => group.id === currGroup.id);
    //         const taskIdx = board.groups[groupIdx].tasks.findIndex(currTask => task.id === currTask.id);
    //         board.groups[groupIdx].tasks.splice(taskIdx, 1, updatedTask);
    //         board.labels.push(labelToSave)
    //         dispatch(onSaveBoard(board));
    //     }

    // }

    const handleChangeLabelText = (ev) => {
        const text = ev.target.value
        setEditInputText(text)
    }

    const handleChangeLabelColor = (color) => {
        setSelectedLabelColor(color)
    }


    return <section className="edit-label-cmp">
        <section className="dynamic-cmp-header">{'Edit label'}
            <button className='close-edit-label-modal'>
                <CloseDynamicCmp onClick={() => setDynamicType('')} />
            </button>

            <button className='go-back-label-edit'>
                <GoBackIcon onClick={() => setIsEditLabel(false)} />
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
                        </div>
                    })}
                </section>
                    <section className='edit-label-btns'>
                <button className='create-new-label-btn'>
                    Save label
                </button>

                <span className='delete-label-btn'>
                    Delete
                </span>
                    </section>
            </form>

        </section>

    </section>
}