import { userService } from "../../services/user.service"

export function Members() {
    const members = userService.getMembers()
    return (
        <section>
            {members.map(member =>
            {
                return 

            })}
        </section>

    )
}