import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { detailsColorsConsts, detailsImgConsts, workspaceImgConsts } from "../../const/board-list-consts"

export const CoverCmp = ({ task, setTask }) => {

    const [bgColorExmpel, setBgColorExmpel] = useState(`url(${task.cover?.color})`)
    const [bgColorTextExmple, setBgColorTextExmple] = useState(`url(${task.cover?.color})`)
    console.log('task.cover?.color', task.cover?.color);
    const [text, setText] = useState('')
    const [isFullCover, setFullCover] = useState(task.cover?.isFullCover)
    const [isDark, setIsDark] = useState(task.cover?.isDark)
    let backgroundStyle = bgColorExmpel?.length > 9 ? 'backgroundImage' : 'backgroundColor'
    const classBtn = text ? 'btn-create-board filled ' : "btn-create-board"
    let coverChoice = isFullCover ? "coverd-choice choice" : "coverd-choice  "

    const onChangeColor = (color, ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const newColor = color.length > 9 ? `url(${color})` : color
        setBgColorExmpel(newColor)
        setBgColorTextExmple(newColor)
        const taskToUpdate = { ...task, cover: { ...task.cover, color } }
        setTask(taskToUpdate)

    }


    const onCoverSelected = (isCover) => {
        console.log('isCover', isCover)
        console.log('isFullCover', isFullCover)
        setFullCover(isCover)

        const taskToUpdate = { ...task, cover: { ...task.cover, isFullCover: isCover } }
        setTask(taskToUpdate)
    }
    const changeHandel = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        setText(ev.target.value)
        console.log(text, 'tetx')
    }
    const onTasktCoverSelected = (isDarked) => {
        if (isDarked) {
            setBgColorTextExmple(`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),${bgColorExmpel}`)
        } else if (!isDarked) {
            setBgColorTextExmple(`linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),${bgColorExmpel}`)
        }
        console.log('isCover', isDarked)
        const taskToUpdate = { ...task, cover: { ...task.cover, isDark: isDarked } }
        setTask(taskToUpdate)

    }

    return <section className="cover-cmp">

        <div>

            <span> Size</span>
            <div className="cover-size-action">

                <div onClick={() => onCoverSelected(false)} className={isFullCover ? "uncoverd-choice" : "uncoverd-choice choice "} style={{ [backgroundStyle]: bgColorExmpel }}>
                    <div className="uncoverd-second-background" >
                        <div className="line-background big coverd" > </div>
                        <div className="line-background coverd" > </div>
                        <div className="square-container">
                            <div>
                                <div className="circel" > </div>
                            </div>
                            <div className="squaers">
                                <div className="square-littel" > </div>
                                <div className="square-littel" > </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => onCoverSelected(true)} className={coverChoice} style={{ background: bgColorTextExmple }}>
                    <div className="two-line-background" >
                        <div className={task.cover?.isDark ? "line-background big " : "line-background big dark "} > </div>
                        <div className={task.cover?.isDark ? "line-background  " : "line-background  dark "} > </div>
                    </div>


                </div>
            </div>
        </div>

        {task.cover?.color && <button onClick={(ev) => onChangeColor('', ev)} className='remove-btn filled'>Remove Cover</button>}

        {task.cover?.isFullCover && <div className="cover-size-action text">
            <div onClick={() => onTasktCoverSelected(true)} className={task.cover.isDark ? "coverd-choice darken choice" : "coverd-choice darken"} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),${bgColorExmpel}` }}>
                <p>
                    {task.title}
                </p>
            </div>
            <div onClick={() => onTasktCoverSelected(false)} className={task.cover.isDark ? "coverd-choice bright" : "coverd-choice bright choice"} style={{ background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),${bgColorExmpel}` }}>
                <p>
                    {task.title}
                </p>
            </div>
        </div>}
        <span>
            Colors
        </span>
        <div className='colors-container' >
            {detailsColorsConsts.map(color => {
                return <div onClick={(ev) => onChangeColor(color, ev)} key={color} className='color-container' style={{ backgroundColor: color }} > </div>
            })}
        </div>

        <span>
            Photos from Unsplash
        </span>
        <div className='imgs-littel-container'>
            {detailsImgConsts.map(img => {
                let urlImg = `url(${img})`
                return <div onClick={(ev) => onChangeColor(img, ev)} key={img} className='img-container' > <img src={img} alt='' /></div>
            })}
        </div>

        <div className='input-text'>
            <span>
                Img from URL
            </span>
            <input id='text' type="text" onChange={changeHandel} placeholder="Enter Img URL..." />
        </div>

        <button onClick={(ev) => onChangeColor(text, ev)} className={classBtn}>Create</button>
    </section >
}