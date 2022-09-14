import { Link } from 'react-router-dom'

export function BoardList() {
    return (
 <section className="board-list">
 <li key="1">
     <Link key='1' to="board/1">Board 1</Link>
 </li>
 <li key="2">
     <Link key='2' to="board/2">Board 2</Link>
 </li>
 <li key="3">
     <Link key='3' to="board/3">Board 3</Link>
 </li>
 <li key="4">
     <Link key='4' to="board/4">Board 4</Link>
 </li>
</section>
        
    )
}