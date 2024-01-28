import { useEffect, useState } from "react";
import ButtonComponent from "../component/ButtonComponent";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import localForage from 'localforage';
import hide from '../assets/icons/hide.png';
import shown from '../assets/icons/shown.png';

const Login = () => {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordSee, setPasswordSee] = useState(false);

    useEffect(() => {
        Aos.init({duration: 600})
    }, []);

    const onSubmit = async () => {
        setLoader(true);

        if(!email && !password){
            setAlert("Please fill the email id and password");
            setLoader(false);
            return;
        }

        let data = JSON.stringify({
            "email": email,
            "password": password
        });

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/login',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        axios.request(config)
        .then(async (response) => {
            console.log("response", response.data.message);
            if(response.data.message === "User LoggedIN!"){
                await localForage.setItem('userLogin', {id: Date.now(), value: true});
                // localStorage.setItem('userLogin', {id: Date.now(), value: true});
                window.location.reload(false);
                // navigate('/home');
            }else if(response.data.message === "Wrong Email or Passwod!" ){
                setAlert("Wrong Email or Password");
                setLoader(false);
            }else{
                setAlert("Something went wrong! Please try again after sometime.");
                setLoader(false);
            }
        })
        .catch((error) => {
            console.log(error);
            setLoader(false);
        });


    }

    return (
        <div>
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
                <div style={{display: 'flex', paddingLeft: '5px', paddingRight: '5px'}}>
                    <input 
                        type={passwordSee ? "text" : "password"}
                        className="inputField"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img 
                        style={{marginTop: '10px'}}
                        onClick={() => setPasswordSee(!passwordSee)} 
                        src={passwordSee ? hide: shown} 
                        width="30px"
                        height="30px"
                    />
                </div>
            </div>

            <p><a href="/#/forget-password">Forget password?</a> · <a href="/#+/signup">Sign up</a></p>

            <p className="errorBox">{alert}</p>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div data-aos="zoom-in-up" onClick={() => onSubmit()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Log in" loader={loader}/>
                </div>
            </div>
        </div>
    )
}

export default Login;
