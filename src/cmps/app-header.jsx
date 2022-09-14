import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export function AppHeader () {
  return (
    <header className='app-header'>
      <section className='logo-container'>
        <Link to='/'>
          <img
            className='logo'
            src={require(`../assets/img/logo.gif`)}
            alt=''
          />

          <span>Trello</span>
        </Link>

      </section>
        <div className='avatar-img'></div>
    </header>
  )
}
