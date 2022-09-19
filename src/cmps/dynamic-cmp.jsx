
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { AttachmentCmp } from './dynamic-cmps/attachment-cmp'
import { ChecklistCmp } from './dynamic-cmps/checklist-cmp'
import { CoverCmp } from './dynamic-cmps/cover-cmp'
import { DatesCmp } from './dynamic-cmps/dates-cmp'
import { LabelsCmp } from './dynamic-cmps/labels-cmp'
import { MembersCmp } from './dynamic-cmps/members-cmp'


export function DynamicCmp({ type, setDynamicType , task, setSections, group, setTask }) {

    const dynamicCmpToRender = (type) => {

        switch (type) {
            case 'members':
                return <MembersCmp />
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
                    setDynamicType={setDynamicType} 
                    setTask={setTask}/>
            case 'checklist':
                return <ChecklistCmp 
                    setDynamicType={setDynamicType}
                    setSections={setSections}
                        />
            // case 'dates':
            //     return <DatesCmp />
        }
    }

    return (
        <section className="dynamic-cmp">
            <section className="dynamic-cmp-header">{type}
                <button className='dynamic-cmp-close'>
                    <CloseDynamicCmp onClick={() => setDynamicType('')} />
                </button>
            </section>

            <section className='dynamic-cmp-content'>
                {dynamicCmpToRender(type)}
            </section>



        </section>
    )
}
