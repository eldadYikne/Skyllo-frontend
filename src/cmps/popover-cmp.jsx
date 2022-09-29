import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { ReactComponent as ActivityIcon } from '../assets/img/activity-icon.svg'
import { category, imagesCategory, popoverColorsConsts } from "../const/board-list-consts"
import { updateBoard } from "../store/board.actions"
import { ReactComponent as GoBackIcon } from '../assets/img/go-back-label-icon.svg'
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import moment from "moment/moment"
export const Popover = ({ board }) => {
    const dispacth = useDispatch()
    const [isColors, setIsColors] = useState(false)
    const [isImages, setIsImages] = useState(false)
    const [isCategory, setCategory] = useState('')
    const user = useSelector(state => state.userModule.user)
    const classPopover = board.isPopoverShown ? "popover-container open" : "popover-container"
    const getValidTaks = (taskId) => {
        const validTasksIds = board.groups.some(group => {
            return group.tasks.some(task => task.id === taskId)
        })
        return validTasksIds
    }
    const findGroup = (taskId) => {
        const currGroup = board.groups.find(group => {
            return group.tasks.some(task => task.id === taskId)
        })
    if(!currGroup) return null
        return currGroup.id
    }
    const onShownPopover = () => {
        board.isPopoverShown = !board.isPopoverShown
        const boardToUpdate = { ...board }
        dispacth(updateBoard(boardToUpdate))
    }
    const onChangeColor = (color) => {
        const newBoard = structuredClone(board)
        newBoard.style.bgImg = color
        newBoard.isPopoverShown = !newBoard.isPopoverShown
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
        <div>
            <div className="popover-header">
                {!isColors && !isImages && !isCategory && <span>Menu</span>}
                {isImages && !isColors && <div className="colors-header-popover"> <span className="go-back-popover" onClick={() => setIsImages(false)}><GoBackIcon /></span> <span>Images</span> </div>}
                {isColors && !isImages && <div className="colors-header-popover"> <span className="go-back-popover" onClick={() => setIsColors(false)}><GoBackIcon /></span> <span>Colors</span> </div>}
                {!isColors && !isImages && isCategory && <div className="colors-header-popover"> <span className="go-back-popover" onClick={onGoBack}><GoBackIcon /></span> <span>{isCategory}</span> </div>}
                <button onClick={onShownPopover} className="close-btn-popover"><CloseDynamicCmp /></button>
            </div>
        </div>
        <div className="popover-main-content">
            {!isColors && !isImages && !isCategory && <div className="img-colors-popover">
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
                        return <div key={category.name} className="image-category-container">
                            <div onClick={() => onChangeCategory(category.name)} className='color-container' style={{ backgroundImage: urlImg }} >  </div>
                            <span>{category.name}</span>
                        </div>
                    })}
                </div>
            }
            {isCategory &&
                <div className="colors-container-popover">
                    {imagesCategory[isCategory].map(bgImgUrl => {
                        let urlImg = `url(${bgImgUrl})`
                        return <div key={bgImgUrl} className="image-category-container">
                            <div onClick={() => onChangeColor(urlImg)} className='color-container' style={{ backgroundImage: urlImg }} >  </div>
                        </div>
                    })}
                </div>
            }
            {!isCategory && !isImages && !isColors && <div className="activity-popover"> <ActivityIcon /> Activities</div>}
            {!isCategory && !isImages && !isColors && <section className="activities-container">
                {board?.activities?.map(activity => {
                let currGroup=findGroup(activity.task.id)
                    return <div key={activity.id} className="activity-container">
                        {activity?.byMember?.imgUrl ? <div ><img className="img-user-activity" src={`${activity?.byMember?.imgUrl}`} /></div> :
                            <div className='avatar-img-guest-popover'></div>}
                        <div className="activity-info-time">
                            <div className="activity-info">
                                {activity?.byMember?.username ? <span className="user-name">{activity?.byMember?.username}</span> : <span className="user-name">Guest</span>}
                                <span className="activity-task-name">{activity.txt}</span>
                                {activity.txt !== 'deleted task' && getValidTaks(activity.task.id) ? <Link to={`${currGroup}/${activity.task.id}`} key={activity.task.id} onClick={onShownPopover}> <span>{activity.task.title}</span>   </Link> : <span>{activity.task.title}</span>}
                            </div>
                            <span className="time-ago">{moment(activity.createdAt).fromNow()} </span>
                        </div>
                    </div>
                })}
            </section>}
        </div>
    </section>
}