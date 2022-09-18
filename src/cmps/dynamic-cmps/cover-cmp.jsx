import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { detailsColorsConsts } from "../../const/board-list-consts"
import { saveTask } from "../../store/board.actions"



export const CoverCmp = ({ task, setTask }) => {

    const [bgColorExmpel, setBgColorExmpel] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const onChangeColor = (color) => {
        
        setBgColorExmpel(color)
        const taskToUpdate = { ...task, cover: color }
        setTask(taskToUpdate)
        // dispatch(saveTask(params.boardId, params.groupId, updatedTask))
    }
    const onCoverSelected = () => {

    }

    return <section className="cover-cmp">

        <div>

            <span> Size</span>
            <div className="cover-size-action">

                <div onClick={onCoverSelected} className="uncoverd-choice" style={{ background: bgColorExmpel }}>
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
    </section>
}