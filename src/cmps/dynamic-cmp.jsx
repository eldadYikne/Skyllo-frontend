
import { useState } from 'react'
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { AttachmentCmp } from './dynamic-cmps/attachment-cmp'
import { ChecklistCmp } from './dynamic-cmps/checklist-cmp'
import { CoverCmp } from './dynamic-cmps/cover-cmp'
import { DatesCmp } from './dynamic-cmps/dates-cmp'
import { LabelsCmp } from './dynamic-cmps/labels-cmp'
import { MembersCmp } from './dynamic-cmps/members-cmp'


export function DynamicCmp({ type, setDynamicType , task, group, setTask, setIsChecklist }) {

    const [hideHeader, setHideHeader] = useState(true)
    const dynamicCmpToRender = (type) => {
        switch (type) {
            case 'members':
                return <MembersCmp
                task={task} 
                setTask={setTask}
                />
            case 'attachment':
                return <AttachmentCmp 
                task={task} 
                setTask={setTask}/>
            case 'cover':
                return <CoverCmp 
                    task={task} 
                    setTask={setTask}/>
            case 'labels':
                return <LabelsCmp task={task}
                    group={group}
                    setHideHeader={setHideHeader} 
                    setDynamicType={setDynamicType} 
                    setTask={setTask}/>
            case 'checklist':
                return <ChecklistCmp
                    task={task} 
                    setDynamicType={setDynamicType}
                    setTask={setTask}
                    setIsChecklist={setIsChecklist} />
            // case 'dates':
            //     return <DatesCmp />
        }
    }

    return (
        <section className="dynamic-cmp">
      {hideHeader&&  <section className="dynamic-cmp-header">{type}
        <button className='dynamic-cmp-close'>
        <CloseDynamicCmp onClick={() => setDynamicType('')} />
        </button>
        </section>
    }
            <section className='dynamic-cmp-content'>
                {dynamicCmpToRender(type)}
            </section>



        </section>
    )
}
