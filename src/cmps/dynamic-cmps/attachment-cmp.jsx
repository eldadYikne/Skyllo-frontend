import { useState } from "react"



export const AttachmentCmp = () => {






    const [link, setLink] = useState('')

    return <section className="attachment-cmp">
        <div className="upload-source">Computer</div>
        <div className="upload-input">
            <label htmlFor="source">Put your link</label>
            <input type="text" name="" id="source" placeholder="paste your link" onChange={(ev)=>setLink(ev.target.value)} />
        </div>

        <div className="attach-btn">
            <button>
                Attach
            </button>
        </div>

    </section>

}