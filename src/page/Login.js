import { useEffect, useState } from "react";
import ButtonComponent from "../component/ButtonComponent";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import localForage from 'localforage';

const Login = () => {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        Aos.init({duration: 600})
    }, []);

    const onSubmit = async () => {
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
            await localForage.setItem('userLogin', {id: Date.now(), value: true});
            navigate('/home');
        })
        .catch((error) => {
            console.log(error);
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
                <input 
                    type="password"
                    className="inputField"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <p className="errorBox">{alert}</p>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div data-aos="zoom-in-up" onClick={() => onSubmit()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Next" loader={loader}/>
                </div>
            </div>
        </div>
    )
}

export default Login;