



export const ChecklistCmp = ({setDynamicType, setTask})=> {
    const addChecklist = (ev) => {
        ev.preventDefault()
    }


    return <section className="checklist-cmp">
        <form onSubmit={addChecklist}>
            <label htmlFor="title-checklist" className="checklist-title">Title</label>
            <input type="text" id="title-checklist" placeholder="Checklist"/>
            <button>Add</button>
        </form>

    </section>
}