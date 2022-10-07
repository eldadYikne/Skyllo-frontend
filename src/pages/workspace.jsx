
import { useEffect } from 'react'
import React from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppHeader } from '../cmps/app-header'
import { BoardList } from '../cmps/board-list'
import { HomePageHeader } from '../cmps/header-home-page'
import { loadBoards } from '../store/board.actions'
export function WorkSpace() {

  const boards = useSelector(state => state.boardModule.boards)
  const user = useSelector(state => state.userModule.user)
  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(loadBoards())
  }, [])

  return (
    <React.Fragment>
    {!user &&  <HomePageHeader />}
    {user && <AppHeader />}  
    <section className='workspace'>
      <BoardList loadBoards={loadBoards} boards={boards} />
    </section>
    </React.Fragment>
  )
}