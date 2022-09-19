import { utilService } from "../../services/util.service"

export const ChecklistCmp = ({task, setDynamicType, setTask})=> {

    const addChecklist = (ev) => {
        ev.preventDefault()
        const newChecklist = {
            id: utilService.makeId(),
            title: ev.target[0].value,
            todos: [],
            isFocus: true
        }

        if (task.checklists){
            var taskToUpdate = {...task, checklists:[...task.checklists, newChecklist]}
        } else {
            taskToUpdate = {...task, checklists: [newChecklist]}
        }
        setTask(taskToUpdate)
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