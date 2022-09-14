import { DynamicCmp } from "./dynamic-cmp";

export function TaskDetails() {
    return (
        <section className="task-preview">
            <h1>hello task details!</h1>
            <DynamicCmp />   
        </section>
    )
}