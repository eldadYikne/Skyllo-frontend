import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/img/logo.gif'
// import Logo from '../assets/img/logo.gif'

export function AppHeader () {

const [imgSrc, setImgSrc] = useState(Logo)


  return (
    <header className='app-header'>
      <section className='logo-container'>
        <Link to='/'>
          <img
            className='logo'
           src= {Logo}
            alt=''

            // onMouseOver={ setImgSrc('../assets/img/hover-logo.gif')}
          />

          <span className='h1-logo'>Skyllo</span>
        </Link>

      </section>
        <div className='avatar-img'></div>
    </header>
  )
}
