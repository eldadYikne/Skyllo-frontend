import { Link } from "react-router-dom";
import { TaskDetails } from "./task-details";

export function TaskPreview() {


    return (
        <section className="task-preview">
            {/* <Link to={`task/${task.id}`}> */}
            <Link to={`task/task:id`}>
            <h1>Hello task!</h1>
            <span>Task actions</span>
            </Link>
        </section>
    )
}