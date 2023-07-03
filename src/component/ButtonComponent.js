import loader from '../assets/gif/loader.gif';

function ButtonComponent(props){
    return(
        <div className="buttonDiv">
            {props.loader ? 
                <img src={loader} height="50px"/>
            :
                <p>{props.title}</p>
            }
        </div>
        
    )
}

export default ButtonComponent;