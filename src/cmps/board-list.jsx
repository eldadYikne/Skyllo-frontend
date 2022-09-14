import { useState } from 'react';
import { Link } from 'react-router-dom'
import { AddBoard } from './add-board';

export function BoardList({ boards }) {

    const [bgColorCreate, setColorCreate] = useState('')
    const [createIsShown, setIsShown] = useState(false)


    const onChangeColor = (ev) => {
        ev.preventDefault()
        console.log(ev.target.name);
        setColorCreate(ev.target.name)
    }



    return <div className='workspace'>
        <span>Popular templates</span>

        <section className="board-list">
            <div style={{ backgroundColor: bgColorCreate }} onClick={() => setIsShown(!createIsShown)} className='board-preview create-board'>
                Creat New Board
            </div>
            {createIsShown && <AddBoard onChangeColor={onChangeColor} />}


            {boards.map(board => {
                let bgImg = board.style.bgImg
                return <Link key={board._id} to={`board/${board._id}`} >
                    <div style={{ backgroundImage: `url(${bgImg}) ` }} className='board-preview'>
                        {board.title}
                    </div>
                </Link>

            })}


        </section>
    </div >


}



