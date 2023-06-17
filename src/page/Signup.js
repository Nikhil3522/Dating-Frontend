import {useState, useEffect} from "react";
import ButtonComponent from '../component/ButtonComponent';
import Aos from "aos";
import "aos/dist/aos.css";

const Signup = () => {
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");

    useEffect(() => {
        Aos.init({duration: 600})
    }, []);

    useEffect(() => {
        setTimeout(() =>{
            setAlert("");
        }, 7000)
    }, [alert])

    const onSubmit = () => {
        if(name != "" && email != "" && password != "" && confirmPassword != ""){
            if(password !== confirmPassword){
                setAlert("Password and Confirm Password is not same");
            }
        }else{
            setAlert("Please fill all the fields.")
        }

    }

    return(
        <div>
            <div className="inputDiv">
                <p className="inputTitle" style={{"width": "40px"}}>Name</p>
                <input 
                    type="text"
                    className="inputField"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="inputDiv">
                <p className="inputTitle" style={{"width": "40px"}}>Email</p>
                <input 
                    type="email"
                    className="inputField"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="inputDiv">
                <p className="inputTitle" style={{"width": "70px"}}>Password</p>
                <input 
                    type="password"
                    className="inputField"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="inputDiv">
                <p className="inputTitle" style={{"width": "140px"}}>Confirm Password</p>
                <input 
                    type="password"
                    className="inputField"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            
            
            <p className="errorBox">{alert}</p>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div data-aos="zoom-in-up" onClick={() => onSubmit()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Next" />
                </div>
            </div>

        </div>
    )
}

export default Signup;