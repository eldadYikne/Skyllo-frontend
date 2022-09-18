
import { useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../assets/img/edit-icon.svg'
import { utilService } from '../../services/util.service'
import { saveTask } from '../../store/board.actions'



export const LabelsCmp = ({task}) => {

    const board = useSelector(state => state.boardModule.board)

    const BoardLabels = board.labels



    const onChooseLabel = (labelId) =>{
        if (!task.labelIds?.includes(labelId)){
            const newLabelsToTask = [...task.labelIds, labelId]
            const taskToUpdate = {...task, labelIds: newLabelsToTask}
            dispatch(saveTask(board._id, group.id, taskToUpdate))

        }
        else{

        }
    }


    return <section className="labels-cmp">
        <h4>Labels</h4>
        <div className="labels-list">
            {llll.map(label => {
                return (
                    <div key={label.id} className="label-container">
                        <div style={{ backgroundColor: label.color }} className='label-color-box' onClick={()=> onChooseLabel(label.id)}>
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

const llll = [
    {
        //light purple
        id: utilService.makeId(),
        title: "Done",
        color: "#7fb973"
    },
    {
        //light blue
        id: utilService.makeId(),
        title: "Progress",
        color: "#78afcf"
    },
    {
        //green
        id: utilService.makeId(),
        title: "Free time",
        
        color: "#b8b8d1"
    },
    {
        //red
        id: utilService.makeId(),
        title: "Urgent",
        color: "#dd5959"
    },
    {
        //yellow
        id: utilService.makeId(),
        title: "Can wait",
        color: "#dfd762"
    },
    {
        //orange
        id: utilService.makeId(),
        title: "Priority",
        color: "#fea967"
    }
]