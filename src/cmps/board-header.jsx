
import { useDispatch } from 'react-redux';
import { boardService } from '../services/board.new.service';
import { updateBoard } from '../store/board.actions';

//icons
import { ReactComponent as SvgStar } from '../assets/img/star.svg';
import { ReactComponent as InviteMemberIcon } from '../assets/img/invite-member-icon.svg';
import { ReactComponent as MenuIcon } from '../assets/img/more-options2-icon.svg';
import { ReactComponent as CloseUsersModalIcon } from '../assets/img/close-task-form.svg';
import { ReactComponent as MemberExistIcon } from '../assets/img/member-exist-icon.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { userService } from '../services/user.new.service';
import { Link } from 'react-router-dom';

export function BoardHeader({ board }) {
    const dispatch = useDispatch()
    if (!board.members) board.members = []
    const members = board.members
    const membersToDisplay = members.slice(0, 4)

    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)
    const [isExtraMembersModalOpen, setIsExtraMembersModalOpen] = useState(false)
    const [users, setUsers] = useState(null)

    if (!board.isPopoverShown) board.isPopoverShown = false
    const onSetIsStared = async (boardId) => {
        try {
            const board = await boardService.getById(boardId)
            const boardToUpdate = { ...board, style: { ...board.style, isStared: !board.style.isStared } }
            dispatch(updateBoard(boardToUpdate))
        } catch (err) {
            console.log(err);
        }
    }
    const onShownPopover = () => {
        board.isPopoverShown = !board.isPopoverShown
        const boardToUpdate = { ...board }
        dispatch(updateBoard(boardToUpdate))

    }

    const loadUsers = async () => {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        }
        catch {
            console.log('cannot load users')
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])


    const getMemberBackground = (member) => {
        if (member.img) return `url(${member.img}) center center / cover`
        else return `url(https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
    }

    const getUserBackground = (user) => {
        if (user.imgUrl) return `url(${user.imgUrl}) center center / cover`
        else {
            return `url(https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
        }
    }

    const memberExistIcon = (userlId) => {
        const exist = board?.members?.find(member => {
            return userlId === member._id
        })
        if (exist) return <MemberExistIcon className='member-exist-icon' />
    }

    const onAddMemberToBoard = (user) => {
        const boardToUpdate = structuredClone(board)
        const currMember = {
            _id: user._id,
            fullname: user.fullname,
            img: user.imgUrl
        }

        const existMember = boardToUpdate.members.filter(member => {
            return member._id === currMember._id
        })

        const exist = board?.members?.find(member => {
            return user._id === member._id
        })

        if (exist) {
            boardToUpdate.groups.forEach(group => {
                group.tasks?.forEach(task => {
                    task.memberIds = task.memberIds?.filter(memberId => {
                        return memberId !== exist._id
                    })
                })
            })
            boardToUpdate.members = boardToUpdate.members.filter(member => {
                return member._id !== exist._id
            })
            return dispatch(updateBoard(boardToUpdate))
        }

        if (existMember.length !== 0 && existMember) return
        boardToUpdate.members.push(currMember)
        dispatch(updateBoard(boardToUpdate))

    }


    return (
        <section className="board-header ">

            <nav className="board-header main-container board-header-main-nav">
                <div className="nav-left">
                    <div className='board-title-board-header'>
                        <h3>{board.title}</h3>
                    </div>
                    <div className="board-header-nav-left-actions">
                        <div className="board-header-favorite-icon action-board-header">
                            {board.style?.isStared ? <img onClick={() => onSetIsStared(board._id)} className='star-app-header' src={require('../assets/img/star.png')} />
                                : <SvgStar onClick={() => onSetIsStared(board._id)} className='star-board-preview' />}
                        </div>

                        {board.members.length!==0 &&<span className='board-header-border-left'></span>}
                        <div className='board-header-members-container'>
                            {members && membersToDisplay.map(member => {
                                
                                {
                                    return member.img ? <div className='board-header-member-box' key={member._id} style={{ background: getMemberBackground(member) }}></div> :
                                        <div className='avatar-img-guest-member-box' key={member._id}>
                                            
                                        </div>
                                        
                                }
                            })}
                            {members.length > 4 && <div className='board-header-extra-member-box'
                                onClick={() => setIsExtraMembersModalOpen(!isExtraMembersModalOpen)}
                            >+{members.length - 4}</div>}
                        </div>
                        {isExtraMembersModalOpen &&
                            <section className='board-header-users-modal'>
                                <div className='users-modal-header'>
                                    <span>Board members</span>
                                    <CloseUsersModalIcon className='close-users-modal-icon' onClick={() => setIsExtraMembersModalOpen(!isExtraMembersModalOpen)} />
                                </div>
                                <div className='users-modal-content'>
                                    <div className='users-modal-users-list'>

                                        {members && members.map(member => {
                                            return <div className='users-modal-user-preview'

                                                key={member._id}>
                                                {member.img ? <div className='users-modal-user-box' key={member._id} style={{ background: getMemberBackground(member) }}></div> :
                                                    <div className='avatar-img-guest-user-box' key={member._id}></div>}
                                                <span>{member.fullname}</span>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </section>
                        }
                        <span className='board-header-border-left'></span>
                        <div className='invite-member-icon' onClick={() => setIsMembersModalOpen(!isMembersModalOpen)}>
                            <InviteMemberIcon />
                        </div>

                        {isMembersModalOpen &&
                            <section className='board-header-users-modal'>

                                <div className='users-modal-header'>
                                    <span>Invite users to board</span>
                                    <CloseUsersModalIcon className='close-users-modal-icon' onClick={() => setIsMembersModalOpen(!isMembersModalOpen)} />
                                </div>
                                <div className='users-modal-content'>

                                    <div className='users-modal-users-list'>

                                        {users && users.map(user => {
                                            return <div className='users-modal-user-preview'
                                                onClick={() => onAddMemberToBoard(user)}
                                                key={user._id}>
                                                {user.imgUrl ? <div className='users-modal-user-box' key={user._id} style={{ background: getUserBackground(user) }}></div> :
                                                    <div className='avatar-img-guest-user-box' key={user._id}></div>}
                                                <span>{user.fullname}</span>
                                                {memberExistIcon(user._id)}
                                            </div>
                                        })}
                                    </div>
                                </div>

                            </section>
                        }


                    </div>
                </div>

                
                <div className="nav-right">
                <Link to={`chart`} >
                    <div className='board-header-menu-btn'>
                        <MenuIcon />
                        <p >Dashboard</p>
                    </div>
                    </Link>
                
                    <div onClick={onShownPopover} className='board-header-menu-btn'>
                        <MenuIcon />
                        <p >Show menu</p>
                    </div>
                </div>
            </nav>
        </section>
    )
}