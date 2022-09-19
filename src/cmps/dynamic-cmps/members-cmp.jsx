import { userService } from "../../services/user.service"


export const MembersCmp = ({task,setTask}) => {

    const members = userService.getMembers()


    const onChooseMember = (memberId) => {
        if (!task.memberIds?.includes(memberId)) {
            const newMembersToTask = [...task.memberIds, memberId]
            const taskToUpdate = { ...task, memberIds: newMembersToTask }
            setTask(taskToUpdate)
        }

        else {
            const newMemberIds = task.memberIds.filter(currMemberId => currMemberId !== memberId)
            const taskToUpdate = { ...task, memberIds: newMemberIds }
            setTask(taskToUpdate)
        }
    }

    const getMemberBackground = (member) => {
        // console.log('member:', member)
        if (member.img) return  `url(${member.img}) center center / cover` 
      }

    return <section className="members-cmp">
        <h3>Board Members</h3>
        <section className="members-list">
            {members.map((member) => {
                
                return (
                    <div key={member.img} className="member-preview"
                        onClick={() => onChooseMember(member._id)}
                    >
                        <div className="avatar-img-members-cmp" 
                        style={{ background:getMemberBackground(member)}}
                        >
                        </div>
                        <p>{member.fullname}</p>
                    </div>

                )
            })}

        </section>
    </section>

}
