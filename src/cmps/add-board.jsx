import { useRef, useState } from 'react';
import { ReactComponent as SvgImgDisplay } from '../assets/img/createImg.svg';
import { workspaceImgConsts, workspaceColorsConsts } from '../const/board-list-consts';


export const AddBoard = ({ onChangeColor, bgColorCreate, createNewBoard,setIsShown }) => {
     const[ text,setText] =useState('')

    const changeHandel = (ev) => {
        ev.preventDefault()
        setText(ev.target.value)
        console.log(text,'tetx')
    }

    const classBtn= text? 'btn-create-board-filled ': "btn-create-board"
    
    return <div className="creat-board-modal">
        <div className='title-create-board'>
        <span>Create Board</span>
        <span className='exit-create-board' onClick={()=>setIsShown(false)}>X</span>

        </div>
        <div style={{ background: bgColorCreate }} className="img-board-display">
            <SvgImgDisplay />
        </div >
    <div className='create-board-actions'>
        <h5 htmlFor="">Background</h5>
        <div className='imgs-littel-container'>
            {workspaceImgConsts.map(img => {
                let urlImg = `url(${img})`
                return <div onClick={() => onChangeColor(urlImg)} key={img} className='img-container' > <img src={img} alt='' /></div>
            })}
        </div>

        <div className='colors-container' >
            {workspaceColorsConsts.map(color => {
                return <div onClick={() => onChangeColor(color)} key={color} className='color-container' style={{ backgroundColor: color }} > </div>
            })}
        </div>

        <div className='input-text'>
            <label htmlFor='text' >Board Title</label>
            <input id='text' type="text" onChange={changeHandel} />
        </div>

        <button onClick={() => createNewBoard(text)} className={classBtn}>Create</button>
            </div>

    </div>
}
