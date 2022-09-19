import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { boardService } from '../services/board.service';
import { addBoard, loadBoards, removeBoard, updateBoard } from '../store/board.actions';
import { AddBoard } from './add-board';
import { ReactComponent as SvgStar } from '../assets/img/star.svg';

export function BoardList({ boards }) {

    const [bgColorCreate, setColorCreate] = useState('#39CCCC')
    const [createIsShown, setIsShown] = useState(false)
    const dispacth = useDispatch()


    const onChangeColor = (info) => {
        setColorCreate(info)
    }

    const createNewBoard = async (text) => {
        try {
            if (!text) return

            const board = await boardService.createBoard(text, bgColorCreate)
            dispacth(addBoard(board))
            setIsShown(false)
        } catch (err) {
            console.log(err);
        }
    }
    const onSetIsStared = async (boardId) => {
        try {
            const board = await boardService.getById(boardId)
            dispacth(updateBoard(board))
        } catch (err) {
            console.log(err);
        }

    }

    const onRemoveBoard = (boardId) => {
        console.log(boardId);
        dispacth(removeBoard(boardId))
    }

    return <div className='workspace'>

        {/* <span>Stard templates</span>
        <section className='stard-boards'>


        </section> */}



      
        <section className="board-list">
            <div onClick={() => setIsShown(!createIsShown)} className='board-preview create-board'>
                Creat New Board
            </div>
            {createIsShown && <AddBoard setIsShown={setIsShown} createNewBoard={createNewBoard} bgColorCreate={bgColorCreate} onChangeColor={onChangeColor} />}


            {boards.map(board => {
                const bgImg = board.style?.bgImg
                let backgroundStyle = bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'
                return <div className='board-previwe-container'>
                    <Link key={board._id} to={`board/${board._id}`} >
                        <div style={{ [backgroundStyle]: bgImg }} className='board-preview'>
                            {board.title}
                        </div>
                    </Link>
                    <span onClick={() => onRemoveBoard(board._id)} className='remove-board'> x </span>
                    {board.style.isStared ? <img onClick={() => onSetIsStared(board._id)} className='star-board-preview' src={require('../assets/img/star.png')} />
                        : <SvgStar onClick={() => onSetIsStared(board._id)} className='star-board-preview' />}
                </div>

            })}


        </section>
    </div >


}



