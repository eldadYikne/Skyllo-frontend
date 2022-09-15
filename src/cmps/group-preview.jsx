import { TaskList } from "./task-list";

export function GroupPreview() {
    return (
        <section className="group-preview">
            <h1>This is the group name</h1>
            <div className="list-container">
            <TaskList />
            </div>
            <div className="add-task">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" 
            className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#000" strokeWidth="2" d="M12,22 L12,2 M2,12 L22,12"></path></svg>
            <p>Add a card</p>
            </div>
        </section>
    )
}