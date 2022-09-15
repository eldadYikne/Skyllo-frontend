import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/app-header'
import { HomePage } from './pages/home-page'
import { WorkSpace } from './pages/workspace'
import { LoginSignup } from './cmps/login-signup'
import { TaskDetails } from './cmps/task-details'
import { BoardApp } from './pages/board-app'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='login' element={<LoginSignup />} />
                        <Route path='workspace' element={<WorkSpace />} />
                        <Route path="workspace/board/:id" element={<BoardApp />} >
                            <Route path="board/:id/task/:id" element={<TaskDetails />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        )
    }
}

// Sign-up
// Login

// HomePage

// WorkSpace --> BoardList--->BoardPreview 

// BoardApp--(BoardHeader)--->GroupList--->GroupPreview--->TaskList--->TaskPreview

// TaskDetails-->DynamicCmp

// DynamicCmp ( TaskMember,TaskLabel,TaskCover,TaskCopy,TasdDate,TaskAttachment,TaskCheckList)
