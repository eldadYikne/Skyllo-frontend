import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './img-uploader'
import { onLogin, onSignup } from '../store/user.actions'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/img/trello-logo-Sign-up.png'


import { ReactComponent as GuestIcon } from '../assets/img/activity-icon.svg'
import { ReactComponent as GoogleIcon } from '../assets/img/google-icon.svg'
import { useDispatch } from 'react-redux'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(true)
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(async () => {
        const users = await userService.getUsers()
        setUsers(users)
    }, [])

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    const handleChange = ev => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    const onClickLogin = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        dispatch(onLogin(credentials))
        clearState()
    }

    const onClickSignup = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        dispatch(onSignup(credentials))
        navigate(-1)
        clearState()
    }

    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }
    const onUploaded = (imgUrl) => {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-sign-up-page">
            <div className='login-page-header'>

                <img
                    className='logo-sign-up'
                    src={Logo}
                    alt=''
                />

                <h1>
                    Skyllo
                </h1>
            </div>
            <div className='login-sign-up-main-container'>
                <div className='sign-up-login-content'>
                    {!isSignup && <section>

                        <form className="login-form" onSubmit={onClickLogin}>
                            <h2 >Login to Skyllo</h2>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder="username"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <button onClick={onClickLogin} className='login-btn'>Log in</button>
                        </form>
                        <div className='login-span'><span>Or</span></div>
                        <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-guest-login'></div>
                                <p>Continue as guest</p>
                            </div>
                        </button>

                        <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-google-login'><GoogleIcon /></div>
                                <p>Continue with google</p>
                            </div>
                        </button>
                        {/* </div> */}
                        <div className='sign-up-login-links-btn'>
                            <p className="sign-up-login-btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</p>
                            <Link to='/'>
                                <p className="sign-up-login-btn-link">Home</p>
                            </Link>
                        </div>
                    </section>
                    }


                    {/* <div className="signup-section"> */}
                    {isSignup && <section>

                        <form className="signup-form" onSubmit={onClickSignup}>
                            <h2>Sign up to Skyllo</h2>
                            <input
                                type="text"
                                name="fullname"
                                value={credentials.fullname}
                                placeholder="Fullname"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            
                            <ImgUploader onUploaded={onUploaded} />

                            <button onClick={onClickSignup} >Signup</button>
                        </form>
                        <div className='login-span'><span>Or</span></div>
                        <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-guest-login'></div>
                                <p>Continue as guest</p>
                            </div>
                        </button>

                        <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-google-login'><GoogleIcon /></div>
                                <p>Continue with google</p>
                            </div>
                        </button>
                        {/* </div> */}
                        <div className='sign-up-login-links-btn'>

                            <p className="sign-up-login-btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</p>


                            <Link to='/'>
                                <p className="sign-up-login-btn-link">Home</p>
                            </Link>
                        </div>
                    </section>}
                </div>


            </div>
        </div>
    )
}
