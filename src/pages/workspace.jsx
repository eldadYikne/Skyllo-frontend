
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { BoardList } from '../cmps/board-list'
import { loadBoards } from '../store/board.actions'
export function WorkSpace() {

  const boards = useSelector(state => state.boardModule.boards)
  const dispacth = useDispatch()
  useEffect(() => {
    dispacth(loadBoards())
  }, [])

  return (
    <section className='workspace'>
      <BoardList loadBoards={loadBoards} boards={boards} />
    </section>
  )
}