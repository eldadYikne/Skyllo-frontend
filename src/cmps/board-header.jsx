
import { useDispatch } from 'react-redux';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/board.actions';

//icons
import { ReactComponent as SvgStar } from '../assets/img/star.svg';
import { ReactComponent as InviteMemberIcon } from '../assets/img/invite-member-icon.svg';
import { ReactComponent as MenuIcon } from '../assets/img/more-options-icon.svg';

export function BoardHeader({ board }) {
    const dispacth = useDispatch()
    const members = board.members


    const onSetIsStared = async (boardId) => {
        try {
            const board = await boardService.getById(boardId)
            const boadToUpdet = { ...board, style: { ...board.style, isStared: !board.style.isStared } }
            dispacth(updateBoard(boadToUpdet))
        } catch (err) {
            console.log(err);
        }
    }




    const getMemberBackground = (member) => {
        if (member.img) return `url(${member.img}) center center / cover`
        else return `url(https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
    }



    return (
        <section className="board-header ">
            
            <nav className="board-header main-container">
                <div className="nav-left">
                    <h1>{board.title}</h1>
                    <div className="board-header-nav-left-actions">
                        <div className="board-header-favorite-icon action-board-header">
                            {board.style.isStared ? <img onClick={() => onSetIsStared(board._id)} className='star-app-header' src={require('../assets/img/star.png')} />
                                : <SvgStar onClick={() => onSetIsStared(board._id)} className='star-board-preview' />}
                        </div>
                        <div className='board-header-members-container'>
                            {members && members.map(member => {
                                return <div key={member._id} className='board-header-member-box' style={{ background: getMemberBackground(member) }}></div>
                            })}
                        </div>

                        <div className='invite-member-icon'><InviteMemberIcon /></div></div>
                </div>

                <div className="nav-right">
                    <div className='board-header-menu-btn'>
                        <MenuIcon />
                        <p>Show Menu</p>
                    </div>
                </div>

            </nav>
        </section>
    )
}