import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { boardService } from "../services/board.service";
import { storeAddGroup } from "../store/board.actions";
import { GroupPreview } from "./group-preview";

export function GroupList() {
    const board = useSelector(state =>state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()

    console.log(board)
    useEffect(()=> {

    },[board])

    const addGroup = (title) =>{
        console.log(title)
        dispatch(storeAddGroup(board._id, title, ''))            
    }

   
    return (
        <section className="group-list">
            {board.groups.map((group) => {
                return (
                <li key={group.id}>
                    <GroupPreview group={group} />
                </li>
                )
                
            })}
            <button onClick={() => addGroup('hello')}>Add a new group</button>
            
        </section>
    )
}