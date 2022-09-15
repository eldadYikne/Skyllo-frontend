import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { boardService } from "../services/board.service";
import { addGroup } from "../store/board.actions";
import { GroupPreview } from "./group-preview";

export function GroupList() {
    const board = useSelector(state =>state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()

    console.log(board)
    useEffect(()=> {

    },[board])

    const onAddGroup = (title) =>{
        console.log(title)
        dispatch(addGroup(board._id, title, 'user addad gruop'))            
    }

    return (
        <section className="group-list">
            {board.groups.map((group) => {
                return (
                <li key={group.id}>
                    <GroupPreview group={group} boardId={board._id} />
                </li>
                )
                
            })}
            <button onClick={() => onAddGroup('hello')}>Add a new group</button>
            
        </section>
    )
}