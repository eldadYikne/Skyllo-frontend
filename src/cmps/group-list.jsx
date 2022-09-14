import { GroupPreview } from "./group-preview";

export function GroupList() {

    return (
        <section className="group-list">
            <li key="1">
                <GroupPreview />
            </li>
            <li key="2">
                <GroupPreview />
            </li>
            <li key="3">
                <GroupPreview />
            </li>
            <li key="4">
                <GroupPreview />
            </li>
        </section>
    )
}