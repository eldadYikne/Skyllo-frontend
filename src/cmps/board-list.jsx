import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { boardService } from '../services/board.new.service';
import { addBoard, loadBoards, removeBoard, updateBoard } from '../store/board.actions';
import { AddBoard } from './add-board';
import { ReactComponent as SvgStar } from '../assets/img/star.svg';
import { ReactComponent as SvgClock } from '../assets/img/clock.svg';
import { LoaderSkyllo } from './loader-cmp';
import { FastAverageColor } from 'fast-average-color';

export function BoardList({ boards, loadBoards }) {

    const [bgColorCreate, setColorCreate] = useState('#39CCCC')
    const [createIsShown, setIsShown] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const onChangeColor = (info) => {
        setColorCreate(info)
    }

    const createNewBoard = async (text) => {
        try {
            if (!text) return
            const board = await boardService.createBoard(text, bgColorCreate)
            dispatch(addBoard(board))
            setIsShown(false)
        } catch (err) {
            console.log(err);
        }
    }
    const onSetIsStared = (board) => {
        console.log('board', board);
        let boadrToUpdate = structuredClone(board)
        boadrToUpdate = { ...board, style: { ...board.style, isStared: !boadrToUpdate.style.isStared } }
        dispatch(updateBoard(boadrToUpdate))
        console.log(boadrToUpdate);
        setTimeout(() => {
            dispatch(loadBoards())
        }, 1000);


    }

    const onRemoveBoard = (boardId) => {
        console.log(boardId);
        dispatch(removeBoard(boardId))
    }
  
    return <div className='workspace'>

        <span className='title-workspace'>
            <SvgStar width="2.5%"
                height="2.5%"
                fill="#172b4d"
                stroke="#172b4d" />  <span>
                Starred boards
            </span>
        </span>
        <section className="board-list">

            {createIsShown && <AddBoard setIsShown={setIsShown} createNewBoard={createNewBoard} bgColorCreate={bgColorCreate} onChangeColor={onChangeColor} />}


            {boards.map(board => {
                const bgImg = board.style?.bgImg
                let backgroundStyle = bgImg?.length > 9 ? 'backgroundImage' : 'backgroundColor'
                {
                    return board.style?.isStared && <div key={board._id} className='board-previwe-container'>
                        <Link to={`board/${board._id}`} >
                            <div  style={{ [backgroundStyle]: bgImg }} className='board-preview'>
                                <div className='darken-board-preview'>
                                </div>
                                <span className="board-previw-title">{board.title}</span>
                            </div>
                        </Link>
                        {/* <span onClick={() => onRemoveBoard(board._id)} className='remove-board'> x </span> */}
                        <img onClick={() => onSetIsStared(board)} className='star-board-preview stared' src={require('../assets/img/star.png')} />
                    </div>
                }

            })}
        </section >
        <span className='title-workspace'>
            <SvgClock width="2.5%"
                height="2.5%"
                fill="#172b4d"
                stroke="#172b4d" />
            <span>
                Most popular templates
            </span>
        </span>

        <section className="board-list">
            {boards.map(board => {
                const bgImg = board.style?.bgImg

                let backgroundStyle = bgImg?.length > 9 ? 'backgroundImage' : 'backgroundColor'
                {
                    return !board.style?.isStared && <div key={board._id} className='board-previwe-container'>
                        <Link to={`board/${board._id}`} >
                            <div style={{ [backgroundStyle]: bgImg }} className='board-preview'>
                                <div className='darken-board-preview'>
                                </div>
                                <span className="board-previw-title">{board.title}</span>
                            </div>
                        </Link>
                        {/* <span onClick={() => onRemoveBoard(board._id)} className='remove-board'> x </span> */}
                        <SvgStar strokeWidth="6%" onClick={() => onSetIsStared(board)} className='star-board-preview' />
                    </div>
                }
            })}
            <div onClick={() => setIsShown(!createIsShown)} className='board-preview create-board'>
                Create new board
            </div>

        </section>
    </div >


}



