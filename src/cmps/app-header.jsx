import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/img/logo.gif'

export function AppHeader() {

  const [imgSrc, setImgSrc] = useState(Logo)
  const user = useSelector(state => state.userModule.user)
  const [userModalOpen, setUserModalOpen] = useState(false)



  return (
    <header className='app-header'>
      <section className='logo-container'>
        <Link to='/'>
          <img
            className='logo'
            src={Logo}
            alt=''
          />
          <span className='h1-logo'>Skyllo</span>
        </Link>
      </section>
      <div onClick={() => setUserModalOpen(!userModalOpen)} className='avatar-img-guest'></div>
      {userModalOpen &&
        <div className='user-modal'>
          <section className='user-modal-header'>
            <button onClick={() => setUserModalOpen(!userModalOpen)} className='close-user-modal'>X</button>
            Account
          </section>
          <div className='user-modal-content'>
            <div className='user-modal-details'>
              <div className='user-details'>

                <div className='avatar-img-guest'></div>
                <span>Guest</span>
              </div>
              <div className='user-modal-signup'>
                Sign up now
              </div>
            </div>
            <div className='user-modal-details'>
              <div className='user-modal-signup'>
                Logout
              </div>
            </div>
          </div>
        </div>
      }
    </header>
  )
}
