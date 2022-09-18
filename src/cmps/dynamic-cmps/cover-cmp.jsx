import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { detailsColorsConsts, detailsImgConsts, workspaceImgConsts } from "../../const/board-list-consts"
import { saveTask, updateBoard } from "../../store/board.actions"



export const CoverCmp = ({ task, setTask }) => {

    const [bgColorExmpel, setBgColorExmpel] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const onChangeColor = (color) => {
        const newColor = color.length > 9 ? `url(${color})` : color
        setBgColorExmpel(newColor)
        const taskToUpdate = { ...task, cover: color }
        setTask(taskToUpdate)
       
    }
    const onCoverSelected = () => {

    }
    let backgroundStyle = bgColorExmpel?.length > 9 ? 'backgroundImage' : 'backgroundColor'
    return <section className="cover-cmp">

        <div>

            <span> Size</span>
            <div className="cover-size-action">

                <div onClick={onCoverSelected} className="uncoverd-choice" style={{ [backgroundStyle]: bgColorExmpel }}>
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

                <div onClick={onCoverSelected} className="coverd-choice" style={{ background: bgColorExmpel }}>
                    <div className="two-line-background" >
                        <div className="line-background big " > </div>
                        <div className="line-background " > </div>
                    </div>


                </div>
            </div>
        </div>



        <div className='colors-container' >
            {detailsColorsConsts.map(color => {
                return <div onClick={() => onChangeColor(color)} key={color} className='color-container' style={{ backgroundColor: color }} > </div>
            })}
        </div>

        <div className='imgs-littel-container'>
            {detailsImgConsts.map(img => {
                let urlImg = `url(${img})`
                return <div onClick={() => onChangeColor(img)} key={img} className='img-container' > <img src={img} alt='' /></div>
            })}
        </div>
    </section>
}