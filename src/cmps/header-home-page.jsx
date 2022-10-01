import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from '../assets/img/logo.gif'
import { ReactComponent as LogoSvg } from '../assets/img/skyllo-logo.svg';



export const HomePageHeader = () => {
    const [imgSrc, setImgSrc] = useState(Logo)

    return <section className="home-page-header">
        <section className='logo-container-home-page'>
            <Link to='/'>
                <LogoSvg  stroke="#0052cc" fill=" #0052cc" />
                {/* <img
                    className='logo-home-page'
                    src={Logo}
                    alt=''
                /> */}

                <span className='h1-logo-home-page'>Skyllo</span>
            </Link>
        </section>
        <section className="home-page-login-signup">

            <Link className="home-page-login" to= {`/login/login`} >
                Login
            </Link>

            <Link className="home-page-signup" to= {`/login/signup`} >
                Get Skyllo for free
            </Link>
        </section>

    </section>
}