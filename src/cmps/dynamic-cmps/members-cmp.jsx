import { userService } from "../../services/user.service"


export const MembersCmp = () => {

    const members = userService.getMembers()

    return <section className="members-cmp">
        <h3>Members</h3>
        <section className="members-list">
            {members.map((member) => {
                
                return (

                    <div key={member.img} className="member-preview">
                        <div className="avatar-img">
                            <img src={member.img} alt="" />
                            
                        </div>
                        <span>{member.fullname}</span>
                    </div>

                )
            })}

        </section>
    </section>

}
