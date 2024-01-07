import logo from '../assets/logo.png'

function LogoComponent(){
    return (
        <div className="title">
            <img src={logo} height="45px"/>
            {/* <h3>title</h3> */}
        </div>
    )
}

export default LogoComponent;