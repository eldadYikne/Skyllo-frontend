import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";

export function TaskPreview({ task }) {
    return (
        <section className="task-preview">
            <p>{task.title}</p>
        </section>
    )
}