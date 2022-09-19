import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";

export function TaskPreview({ task, loadTasks }) {

    // useEffect(()=>{
    //     loadTasks()
    // },[task.title])

    return (
        <section className="task-preview">
            <p>{task.title}</p>
        </section>
    )
}