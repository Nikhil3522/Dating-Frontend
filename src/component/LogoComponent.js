import logo from '../assets/images/logo.png'

function LogoComponent(){
    return (
        <div className="title">
            <img src={logo} width="45px" height="45px"/>
            <h3>title</h3>
        </div>
    )
}

export default LogoComponent;