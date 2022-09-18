import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";

export function TaskPreview({ task, loadTasks }) {

    // useEffect(()=>{
    //     loadTasks()
    // },[task.title])

    return (
        <section className="task-preview">
            <h1>{task.title}</h1>
        </section>
    )
}