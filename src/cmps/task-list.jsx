import { TaskPreview } from "./task-preview";

export function TaskList() {

    return (
    <section className="task-list">
            <li key="1">
                <TaskPreview />
            </li>
            <li key="2">
                <TaskPreview />
            </li>
            <li key="3">
                <TaskPreview />
            </li>
            <li key="4">
                <TaskPreview />
            </li>
        </section>

    )
}
