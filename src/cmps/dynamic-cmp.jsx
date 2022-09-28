
import { useState } from 'react'
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { AttachmentCmp } from './dynamic-cmps/attachment-cmp'
import { ChecklistCmp } from './dynamic-cmps/checklist-cmp'
import { CoverCmp } from './dynamic-cmps/cover-cmp'
import { LabelsCmp } from './dynamic-cmps/labels-cmp'
import { MembersCmp } from './dynamic-cmps/members-cmp'
import { TaskDate } from './dynamic-cmps/task-date'


export function DynamicCmp({ type, setDynamicType, task, group, setIsChecklist, mouseLocation, board,comeFromMiniEdit ,getBgColorOfImg}) {

    const [hideHeader, setHideHeader] = useState(true)

    const onCloseDynamicCmp = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        
        setDynamicType('')
    }


    const dynamicCmpToRender = (type) => {
        switch (type) {
            case 'members':
                return <MembersCmp
                    group={group}
                    task={task}
                    
                />
            case 'attachment':
                return <AttachmentCmp
                    group={group}
                    task={task}
                    />
            case 'cover':
                return <CoverCmp
                    getBgColorOfImg={getBgColorOfImg}
                    task={task} />
            case 'labels':
                return <LabelsCmp task={task}
                    group={group}
                    setHideHeader={setHideHeader}
                    setDynamicType={setDynamicType}
                    comeFromMiniEdit={comeFromMiniEdit}
                    />
            case 'checklist':
                return <ChecklistCmp
                    task={task}
                    setDynamicType={setDynamicType}
                    setIsChecklist={setIsChecklist}
                    group={group} 
                    /> 
            case 'dates':
                return <TaskDate 
                    board={board}
                    group={group}
                    task={task}
                    setDynamicType={setDynamicType}
                    />
        }
    }

    return (
        <section style={{ top: mouseLocation + 40 }} className="dynamic-cmp"
            onClick={ev=>ev.preventDefault()}
        >
            {hideHeader && <section className="dynamic-cmp-header">{type}
                <button className='dynamic-cmp-close'>
                    <CloseDynamicCmp onClick={onCloseDynamicCmp} />
                </button>
            </section>
            }
            <section className='dynamic-cmp-content'>
                {dynamicCmpToRender(type)}
            </section>
        </section>
    )
}
