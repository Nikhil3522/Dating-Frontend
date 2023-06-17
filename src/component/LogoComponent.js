import logo from '../assets/images/logo.png'

function LogoComponent(){
    return (
        <div className="title">
            <img src={logo} width="70px" height="70px"/>
            <h1>title</h1>
        </div>
    )
}

export default LogoComponent;