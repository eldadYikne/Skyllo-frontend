import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { utilService } from "../../services/util.service"
import { saveTask } from "../../store/board.actions"

export const ChecklistCmp = ({task, setDynamicType, group })=> {

    const dispatch = useDispatch()
    const params = useParams()
    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)

    const groupId = params.groupId

    const addChecklist = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('ev:eeeeeeeeeeeeeee')
        
        const newChecklist = {
            id: utilService.makeId(),
            title: ev.target[0].value? ev.target[0].value : 'Checklist',
            todos: [],
            isFocus: true
        }

        if (task.checklists){
            var taskToUpdate = {...task, checklists:[...task.checklists, newChecklist]}
        } else {
            taskToUpdate = {...task, checklists: [newChecklist]}
        }
        dispatch(saveTask(board._id, groupId , taskToUpdate, {text: `added ${newChecklist.title} checklist`, user}))
        setDynamicType('') 
    }


    return <section className="checklist-cmp">
        <form onSubmit={addChecklist}>
            <label htmlFor="title-checklist" className="checklist-title">Title</label>
            <input type="text" id="title-checklist" placeholder="Checklist"/>
            <button>Add</button>
        </form>

    </section>
}