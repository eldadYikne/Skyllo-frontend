
export const AddBoard = ({onChangeColor}) => {



    


    return <div className="creat-board-model">

<span>Create Board</span>



        <div className='colors-container' >
            <div>

                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#001f3f" src={require("../assets/img/color0.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#0074D9" src={require("../assets/img/color1.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#7FDBFF" src={require("../assets/img/color2.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#39CCCC" src={require("../assets/img/color3.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#B10DC9" src={require("../assets/img/color4.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#F012BE" src={require("../assets/img/color5.png")} alt='' /></div>
            </div>
            <div>

                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#85144b" src={require("../assets/img/color6.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#FF4136" src={require("../assets/img/color7.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#FF851B" src={require("../assets/img/color8.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#FFDC00" src={require("../assets/img/color9.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#3D9970" src={require("../assets/img/color10.png")} alt='' /></div>
                <div onClick={onChangeColor}  className={'color-container'} ><img className='' name="#2ECC40" src={require("../assets/img/color11.png")} alt='' /></div>
            </div>


        </div>

    </div>
}