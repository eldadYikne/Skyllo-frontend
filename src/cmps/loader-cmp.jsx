import { ReactComponent as LoaderGif } from '../assets/img/loader.gif'



export const LoaderSkyllo = () => {



    return <section className='page-loader'>
        <section className='loader-gif'>
            {/* <img src={require(`../assets/img/loader.gif`)} alt="" /> */}
            <img src={require(`../assets/img/hover-logo.gif`)} alt="" />
        </section>
    </section>
}