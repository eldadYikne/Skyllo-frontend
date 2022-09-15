import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";
import { TaskPreview } from "./task-preview";

export function TaskList({group}) {
    const board = useSelector(state => state.boardModule.board)
    console.log(group)
    console.log(board)
    return (
               <div className="list-container">
                {group.tasks.map((task)=> {
                    return (
                        <Link to={`task/${task.id}`} key={task.id}>
                        <div>
                            <TaskPreview task={task}/>  
                        </div>
                        </Link>
                    )
                })}
            </div> 
           


    )
}
