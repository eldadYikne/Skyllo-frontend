import { useState } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { detailsImgConsts } from "../const/board-list-consts"
import { updateBoard } from "../store/board.actions"
export const Popover = ({ board }) => {
    const dispacth = useDispatch()
    const [isColors, setIsColors] = useState(false)
    const classPopover = board.isPopoverShown ? "popover-container open" : "popover-container"
    const onShownPopover = () => {
        board.isPopoverShown = !board.isPopoverShown
        const boardToUpdate = { ...board }
        dispacth(updateBoard(boardToUpdate))

    }
const onChangeColor=()=>{

}
    return <section className={classPopover}>
        <div className="popover-header">
            {isColors? <span>Colors</span>:<span>Menu</span>}
            <button onClick={onShownPopover} className="close-btn-popover"><CloseDynamicCmp /></button>
        </div>
        {!isColors &&<div className="img-colors-popover">

            <div onClick={()=>setIsColors(false)} className="colors-popover"> <img src={'https://skello.herokuapp.com/static/media/color-teaser-sidebar.ec32a2ed8dd8198b8ef0.jpg'} />Colors</div>
            <div className="imgs-popover"><img src={'https://skello.herokuapp.com/static/media/imgs-teaser-sidebar.8f9c1323c9c16601a9a4.jpg'} />Images</div>

        </div>}
        {isColors&& 
        <div className="colors-container-popover">
           {detailsImgConsts.map(img => {
                let urlImg = `url(${img})`
                return <div onClick={() => onChangeColor(img)} key={img} className='img-container' > <img src={img} alt='' /></div>
            })}

        </div>
        }
    </section>
}