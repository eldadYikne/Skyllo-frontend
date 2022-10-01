import { useState, useEffect } from 'react'
import { userService } from '../services/user.new.service'
import { ImgUploader } from './img-uploader'
import { onLogin, onSignup } from '../store/user.actions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logo from '../assets/img/trello-logo-Sign-up.png'
import { useDispatch } from 'react-redux'
import { uploadService } from '../services/upload.service'


import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode"
// 827098261859-v6v47a9sa4k29e97ucd6tmjf4la569oj.apps.googleusercontent.com

//icons
import { ReactComponent as LeftImageSvg } from '../assets/img/left-img-login.svg';
import { ReactComponent as RightImageSvg } from '../assets/img/right-img-login.svg';
import { ReactComponent as UploadIcon } from '../assets/img/upload-img-icon.svg';
import { ReactComponent as GuestIcon } from '../assets/img/activity-icon.svg'
import { ReactComponent as GoogleIcon } from '../assets/img/google-icon.svg'
import { utilService } from '../services/util.service'
import { LoaderSkyllo } from './loader-cmp'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '', imgUrl: '' })
    // const [isSignup, setIsSignup] = useState('')
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [isSignup, setIsSignup]  =  useState(null)
    // console.log('isSignuppppp:', isSignup)
    
    useEffect(async () => {
        const users = await userService.getUsers()
        setUsers(users)
        console.log('isSignupeeeeeeeeeeeeee:', params.isSignup)
        setIsSignup(params.isSignup)
    }, [params])

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        // setIsSignup(false)
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
        navigate('/workspace')
        clearState()
    }

    const onClickSignup = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        if (!credentials.imgUrl) {
            setTimeout(() => {
                dispatch(onSignup(credentials))
                clearState()
                navigate('/workspace')
            }, 6000)
        } else {
            dispatch(onSignup(credentials))
            navigate('/workspace')
            clearState()
        }
    }

    const toggleSignup = () => {
        // setIsSignup(!isSignup)
    }

    const onUploaded = async (ev) => {
        try {
            const data = await uploadService.uploadImg(ev)
            console.log(data.secure_url);
            setCredentials({ ...credentials, imgUrl: data.secure_url })
            console.log(credentials);
        } catch (err) {
            console.log(err);
        }
    }

    const handleGoogleSignup = (credentialResponse) => {
        var decoded = jwt_decode(credentialResponse.credential)

        const username = decoded.name
        const img = decoded.picture

        const userCred = { username: decoded.name, password: utilService.makeId(), fullname: decoded.name, imgUrl: decoded.picture }

        dispatch(onSignup(userCred))

        // console.log('decodeAAAAAAA:', credentialResponse
        // )

        navigate('/workspace')

    }
    const handleGoogleLogin = (credentialResponse) => {
        var decoded = jwt_decode(credentialResponse.credential)

        const username = decoded.name
        const img = decoded.picture
        const userCred = { username: decoded.name, isGoogleLogin: true, fullname: decoded.name, imgUrl: decoded.picture }

        dispatch(onLogin(userCred))

        navigate('/workspace')

    }

    if (isSignup === null) return <LoaderSkyllo/>

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
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
                <div className='sign-up-login-content'>
                    {params.isSignup === 'login' && <section>
        
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
                                <Link to='/workspace'><p>Continue as guest</p></Link>
                            </div>
                        </button>
                        {/* <div className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-google-login'><GoogleIcon /></div>
                                <p>Continue with google</p>
                            </div>
                        </div> */}
                        <GoogleLogin
                            // className='continue-as-guest'
                            style={{ backgroundColor: 'blue' }}
                            onSuccess={credentialResponse => {
                                handleGoogleLogin(credentialResponse)
                            }}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                        />



                        {/* 
                        <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-google-login'><GoogleIcon /></div>
                                <p>Continue with google</p>
                            </div>
                        </button> */}
                        {/* </div> */}
                        <div className='sign-up-login-links-btn'>
                            <Link to= {`/login/signup`}>
                            <p className="sign-up-login-btn-link">Signup</p>
                            </Link>
                            <span className='span-border'></span>
                            <Link to='/'>
                                <p className="sign-up-login-btn-link">Home</p>
                            </Link>
                        </div>
                    </section>
                    }
                    {/* <div className="signup-section"> */}
                    {params.isSignup === 'signup'&& <section>

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
                            <div className="upload-source-sign-up ">
                                <label htmlFor="sign-up-upload"><UploadIcon className='camera-icon' /></label>
                                <input className="input-computer-upload-sign-up"
                                    id='sign-up-upload'
                                    type="file"
                                    onChange={onUploaded} />

                            </div>

                            <button onClick={onClickSignup} >Signup</button>
                        </form>
                        <div className='login-span'><span>Or</span></div>
                        <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-guest-login'></div>
                                <Link to='/workspace'><p>Continue as guest</p></Link>
                            </div>
                        </button>
                        {/* <div className='continue-as-guest'> */}
                            
                            {/* <div className='continue-as-guest-content'>
                                <div className='avatar-img-google-login'><GoogleIcon /></div>
                                <p>Continue with google</p>
                            </div> */}
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                handleGoogleSignup(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                            {/* </div> */}
                        {/* <button className='continue-as-guest'>
                            <div className='continue-as-guest-content'>
                                <div className='avatar-img-google-login'><GoogleIcon /></div>
                                <p>Continue with google</p>
                            </div>
                        </button> */}
                        {/* </div> */}
                        <div className='sign-up-login-links-btn'>
                        <Link to= {`/login/login`}>
                            <p className="sign-up-login-btn-link">Login</p>
                            </Link>
                            <span className='span-border'></span>

                            <Link to='/'>
                                <p className="sign-up-login-btn-link">Home</p>
                            </Link>
                        </div>
                    </section>}
                </div>
            </div>
            {/* <div className='images-login'> 
                <LeftImageSvg/>  
                <RightImageSvg/>
            </div> */}
        </div>
    )
}
