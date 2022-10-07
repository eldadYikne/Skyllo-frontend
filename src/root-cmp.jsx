import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'


import { HomePage } from './pages/home-page'
import { WorkSpace } from './pages/workspace'
import { LoginSignup, Signup } from './cmps/user-signup'
import { TaskDetails } from './cmps/task-details'
import { BoardApp } from './pages/board-app'

import { Chart } from './cmps/chart-app'


export const RootCmp = () => {


    return (
        <div className='root-cmp'>
          
            <main className='main-app' >
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='login/:isSignup' element={<LoginSignup />} />
                    <Route path='workspace' element={<WorkSpace />} />
                    {/* <Route path='workspace/board/:boardId/chart' element={<Chart />} /> */}
                    <Route path='workspace/board/:boardId' element={<BoardApp  />} >
                        <Route path='chart' element={<Chart />} />
                        <Route path=':groupId/:taskId' element={<TaskDetails />} />
                        {/* <Route path='workspace/board/:boardId/chart' element={<Chart />} /> */}
                    </Route>
                </Routes>
            </main>

        </div>
    )
}


// Sign-up
// Login

// HomePage

// WorkSpace --> BoardList--->BoardPreview

// BoardApp--(BoardHeader)--->GroupList--->GroupPreview--->TaskList--->TaskPreview

// TaskDetails-->DynamicCmp

// DynamicCmp ( TaskMember,TaskLabel,TaskCover,TaskCopy,TasdDate,TaskAttachment,TaskCheckList)
