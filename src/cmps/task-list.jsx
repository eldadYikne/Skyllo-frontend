import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { boardService } from "../services/board.service";
import { TaskDetails } from "./task-details";
import { TaskPreview } from "./task-preview";

export function TaskList({group, boardId}) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
        console.log('useeffect:', group)
    },[])

    // useEffect(() => {
    //     loadTasks()
    // },[tasks])

    const loadTasks = async () => {
        console.log('1', group.id)
        const tasksToDisplay = await boardService.getTasks(boardId, group.id)
        console.log('loadtasks: ' ,group)
        setTasks(tasksToDisplay)        
    }

    const board = useSelector(state => state.boardModule.board)
    if(!tasks) return <h1>Loading</h1>
    return (
               <div className="list-container">
                {tasks.map((task)=> {
                    return (
                        <Link to={`${group.id}/${task.id}`} key={task.id}>
                        <div>
                            <TaskPreview task={task} loadTasks={loadTasks}/>  
                        </div>
                        </Link>
                    )
                })}
            </div> 
    )
}
