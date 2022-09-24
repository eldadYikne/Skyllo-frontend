import { FastAverageColor } from 'fast-average-color'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/img/logo.gif'
import { onLogout } from '../store/user.actions'


export function AppHeader() {

  const [imgSrc, setImgSrc] = useState(Logo)
  const user = useSelector(state => state.userModule.user)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const board = useSelector(state => state.boardModule.board)

  const dispatch = useDispatch()

  const onClickLogout = () => {

    dispatch(onLogout())

  }
  useEffect(() => {
    
    const newBgImg = board?.style?.bgImg
    console.log(newBgImg);
    const boardImg = newBgImg?.substring(4,newBgImg.length-1)
    console.log(boardImg);
    getBgColorOfImg(boardImg, board)

  }, [])

  const getBgColorOfImg = async (url, board) => {
    console.log('getBgColorOfImg');
    console.log('board', board);
    try {
      if (!board.style.backgroundColor) board.style.backgroundColor = ''
      const fac = new FastAverageColor();
      const color = await fac.getColorAsync(url)
      board.style.backgroundColor = color.rgb;
      console.log('Average color', color);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header style={{ background: board?.style?.backgroundColor }} className='app-header'>
      <section className='logo-hedear-container'>

        <div className='logo-container'>
          <Link to='/'>
            <img
              className='logo'
              src={Logo}
              alt=''
            />
            <span className='h1-logo'>Skyllo</span>
          </Link>
        </div>
      </section>

      {user?.imgUrl ? <div style={{ backgroundImage: `url(${user.imgUrl})` }} onClick={() => setUserModalOpen(!userModalOpen)} className='avatar-img-guest'> </div> : <div onClick={() => setUserModalOpen(!userModalOpen)} className='avatar-img-guest'></div>}

      {userModalOpen &&
        <div className='user-modal'>
          <section className='user-modal-header'>
            <button onClick={() => setUserModalOpen(!userModalOpen)} className='close-user-modal'>X</button>
            Account
          </section>
          <div className='user-modal-content'>
            <div className='user-modal-details'>
              <div className='user-details'>
                {user?.imgUrl ? <div style={{ backgroundImage: `url(${user.imgUrl})` }} className='avatar-img-guest'></div> : <div className='avatar-img-guest'> </div>}
                {user ? <span>{user.fullname} </span> : <span>Guest</span>}
              </div>
              {!user &&
                <Link to='/login'>
                  <div className='user-modal-signup'>
                    Sign up now
                  </div>
                </Link>
              }
            </div>
            <div className='user-modal-details'>
              <Link to='/login'>
                <div className='user-modal-signup' onClick={onClickLogout}>
                  Logout
                </div>
              </Link>
            </div>
          </div>
        </div>
      }
    </header>
  )
}
