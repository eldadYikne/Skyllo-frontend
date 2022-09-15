import { Link } from "react-router-dom";
import { TaskList } from "./task-list";

export function GroupPreview({ group }) {

    console.log(group)

    return (
        <section className="group-preview">
            <div className="group-header">
                <h1>{group.title}</h1>
            </div>
            {/* <div className="list-container">
                {group.tasks.map((task)=> {
                    return (
                        <Link to={`task/${task.id}`} key={task.id}>
                        <div>
                            <TaskList task={task}/>  
                        </div>
                        </Link>
                    )

                })}
            </div> */}
            <div className="list-container">
                <TaskList group={group}/>        
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