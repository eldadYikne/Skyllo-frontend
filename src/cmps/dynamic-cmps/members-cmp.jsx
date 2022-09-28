import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { userService } from "../../services/user.service"
import { saveTask } from "../../store/board.actions"
import { ReactComponent as MemberExistIcon } from '../../assets/img/member-exist-icon.svg'


export const MembersCmp = ({ task, group }) => {

    const board = useSelector(state => state.boardModule.board)
    const members = board.members
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)

    const onChooseMember = (memberId, ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (!task.memberIds) task.memberIds = []
        if (!task.memberIds?.includes(memberId)) {
            const newMembersToTask = [...task.memberIds, memberId]
            const taskToUpdate = { ...task, memberIds: newMembersToTask }
            dispatch(saveTask(board._id, group.id, taskToUpdate, { text: 'choose member', user: user }))
        }

        else {
            const newMemberIds = task.memberIds.filter(currMemberId => currMemberId !== memberId)
            const taskToUpdate = { ...task, memberIds: newMemberIds }
            dispatch(saveTask(board._id, group.id, taskToUpdate, { text: 'deleted member', user: user }))
        }
    }


    const memberExistIcon = (memberId) => {
        console.log('memberId:', memberId)
        
        const exist = task?.memberIds?.find(id => {
            return memberId === id})
            console.log('task.memberIds:', task.memberIds)
            
        if (exist) return <MemberExistIcon className='member-exist-icon-member-cmp' />
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
                        {memberExistIcon(member._id)}
                    </div>

                )
            })}

        </section>
    </section>

}
