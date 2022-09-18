import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";

export function TaskPreview({ task }) {

    const bgColor = task.cover ? task.cover : ''
    return (
        <section className="task-preview">
            {bgColor && <div style={{ background: bgColor }} className="task-cover-background"> </div>}
            <p>{task.title}</p>
        </section>
    )
}