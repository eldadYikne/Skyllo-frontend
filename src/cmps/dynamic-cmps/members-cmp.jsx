import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { userService } from "../../services/user.service"
import { saveTask } from "../../store/board.actions"


export const MembersCmp = ({ task, setTask, group }) => {

    const board = useSelector(state => state.boardModule.board)
    const members = board.members
    const dispatch = useDispatch()

    const onChooseMember = (memberId, ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('memberId:', memberId)
        
        if (!task.memberIds?.includes(memberId)) {
            const newMembersToTask = [...task.memberIds, memberId]
            const taskToUpdate = { ...task, memberIds: newMembersToTask }
            
            // setTask(taskToUpdate)
            dispatch(saveTask(board._id, group.id, taskToUpdate, { text: 'choose member', taskTilte: task.title, taskId: task.id,groupId:group.id, user: 'usery' }))
        }
        
        else {
            const newMemberIds = task.memberIds.filter(currMemberId => currMemberId !== memberId)
            const taskToUpdate = { ...task, memberIds: newMemberIds }
            setTask(taskToUpdate)
            dispatch(saveTask(board._id, group.id, taskToUpdate, 'deleted task'))
        }
    }

    
    const getMemberBackground = (member) => {
        // console.log('member:', member)
        if (member.img) return `url(${member.img}) center center / cover`
    }

    return <section className="members-cmp">
        <h3>Board Members</h3>
        <section className="members-list">
            {members.map((member) => {
                return (
                    <div key={member.img} className="member-preview"
                        onClick={(ev) => onChooseMember(member._id, ev)}
                    >
                        <div className="avatar-img-members-cmp"
                            style={{ background: getMemberBackground(member) }}
                        >
                        </div>
                        <p>{member.fullname}</p>
                    </div>

                )
            })}

        </section>
    </section>

}
