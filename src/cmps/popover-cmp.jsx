import { useState } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { category, imagesCategory, popoverColorsConsts } from "../const/board-list-consts"
import { updateBoard } from "../store/board.actions"
import { ReactComponent as GoBackIcon } from '../assets/img/go-back-label-icon.svg'

export const Popover = ({ board }) => {
    const dispacth = useDispatch()
    const [isColors, setIsColors] = useState(false)
    const [isImages, setIsImages] = useState(false)
    const [isCategory, setCategory] = useState('')



    const classPopover = board.isPopoverShown ? "popover-container open" : "popover-container"

    const onShownPopover = () => {
        board.isPopoverShown = !board.isPopoverShown
        const boardToUpdate = { ...board }
        dispacth(updateBoard(boardToUpdate))
    }

    const onChangeColor = (color) => {
        const newBoard = structuredClone(board)
        newBoard.style.bgImg = color
        dispacth(updateBoard(newBoard))
    }
    const onGoBack = () => {
        setIsImages(true)
        setCategory('')
    }

    const onChangeCategory = (categoryName) => {
        setIsImages(false)
        setCategory(categoryName)
    }

    return <section className={classPopover}>
        <div className="popover-header">
            <span>Menu</span>
            {isImages && !isColors && <div className="colors-header-popover"> <span className="go-back-popover" onClick={() => setIsImages(false)}><GoBackIcon /></span> <span>Images</span> </div>}
            {isColors && !isImages && <div className="colors-header-popover"> <span className="go-back-popover" onClick={() => setIsColors(false)}><GoBackIcon /></span> <span>Colors</span> </div>}
            {!isColors && !isImages && isCategory && <div className="colors-header-popover"> <span className="go-back-popover" onClick={onGoBack}><GoBackIcon /></span> <span>{isCategory}</span> </div>}
            <button onClick={onShownPopover} className="close-btn-popover"><CloseDynamicCmp /></button>
        </div>
        {!isColors && !isImages && !isCategory&& <div className="img-colors-popover">

            <div onClick={() => setIsColors(true)} className="colors-popover"> <img src={'https://skello.herokuapp.com/static/media/color-teaser-sidebar.ec32a2ed8dd8198b8ef0.jpg'} />Colors</div>
            <div onClick={() => setIsImages(true)} className="imgs-popover"><img src={'https://skello.herokuapp.com/static/media/imgs-teaser-sidebar.8f9c1323c9c16601a9a4.jpg'} />Images</div>

        </div>}
        {isColors &&
            <div className="colors-container-popover">
                {popoverColorsConsts.map(color => {
                    return <div onClick={() => onChangeColor(color)} key={color} className='color-container' style={{ backgroundColor: color }} > </div>
                })}

            </div>
        }
        {isImages &&
            <div className="colors-container-popover">
                {category.map(category => {
                    let urlImg = `url(${category.bgImage})`
                    return <div className="image-category-container">
                        <div onClick={() => onChangeCategory(category.name)} key={category.name} className='color-container' style={{ backgroundImage: urlImg }} >  </div>
                        <span>{category.name}</span>
                    </div>
                })}

            </div>
        }
        {isCategory &&
            <div className="colors-container-popover">
                {imagesCategory[isCategory].map(bgImgUrl => {
                    let urlImg = `url(${bgImgUrl})`
                    return <div className="image-category-container">
                        <div onClick={() => onChangeColor(urlImg)} key={bgImgUrl} className='color-container' style={{ backgroundImage: urlImg }} >  </div>

                    </div>
                })}

            </div>
        }


    </section>
}