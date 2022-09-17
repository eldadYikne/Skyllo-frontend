
import { ReactComponent as CloseDynamicCmp } from '../assets/img/close-task-form.svg'
import { MembersCmp } from './dynamic-cmps/members-cmp'






export function DynamicCmp() {
    return (
        <section className="dynamic-cmp">
            <section className="dynamic-cmp-header">dynamic title
                <button className='dynamic-cmp-close'>
                    <CloseDynamicCmp />
                </button>
            </section>

            <section className='dynamic-cmp-content'>
            <MembersCmp/>

            </section>



        </section>
    )
}