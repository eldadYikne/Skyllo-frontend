import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { WorkSpace } from './pages/workspace'
import { LoginSignup } from './cmps/login-signup'
import { TaskDetails } from './cmps/task-details'

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
                        <Route path="board/:id" element={<BoardApp />} >
                            <Route path="board/:id/task/:id" element={<TaskDetails />} />
                        </Route>
                    </Routes>
                </main>
                <AppFooter />
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
