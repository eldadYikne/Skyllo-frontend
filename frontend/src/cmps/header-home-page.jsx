import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from '../assets/img/logo.gif'



export const HomePageHeader = () => {
    const [imgSrc, setImgSrc] = useState(Logo)

    return <section className="home-page-header">
        <section className='logo-container-home-page'>
            <Link to='/'>
                <img
                    className='logo-home-page'
                    src={Logo}
                    alt=''
                />

                <span className='h1-logo-home-page'>Skyllo</span>
            </Link>
        </section>
        <section className="home-page-login-signup">
            <Link to='/login'>
            <button className="home-page-login-btn">Login</button>
            </Link>
            <Link to='/login'>
            <button className="home-page-signup-btn">Sign up</button>
            </Link>

        </section>

    </section>
}