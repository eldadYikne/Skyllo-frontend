import { userService } from "../../services/user.service"


export const MembersCmp = ({ task, onSaveTask }) => {

    const members = userService.getMembers()
    
    const onAddMember = (memberId) => {
        if (!task.memberIds.length) task.memberIds = []
        task.memberIds.push(memberId)
        onSaveTask(task)
    }

    return <section className="members-cmp">
        <h3>Members</h3>
        <section className="members-list">
            {members.map((member) => {
                
                return (

                    <div key={member._id} className="member-preview" onClick={()=>onAddMember(member._id)} >
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
