
import { useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../assets/img/edit-icon.svg'



export const LabelsCmp = () => {

    const board = useSelector(state => state.boardModule.board)

    const labels = board.labels

    return <section className="labels-cmp">

        <h4>Labels</h4>
        <div className="labels-list">
            {labels.map(label => {
                return (
                    <div className="label-container">
                        <div style={{ backgroundColor: label.color }} className='label-color-box'>{label.title ? label.title : ''}</div>
                        <button className='edit-label-btn'>
                            <EditIcon />
                        </button>
                    </div>
                )
            })}
        </div>

        <button className='create-new-label-btn'>
            Create a new label
        </button>

    </section>
}