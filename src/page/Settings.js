import NavigationBar from "../component/NavigationBar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { useState } from "react";

const Settings = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const logout = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/logout',
            withCredentials: true,

        };

        axios.request(config)
            .then(async (response) => {
                await localforage.setItem('userLogin', {id: Date.now(), value: false});
                navigate('/login');
            })
            .catch((error) => {
                console.log("error in logout", error);
            });
    }

    return(
        <div>
            <h1>Settings</h1>
            {
                step === 1 ? <>
                    <div className="verifiedDiv" style={{ marginTop: '15px' }} onClick={logout}>
                        <h3>Logout</h3>
                    </div>

                    <div className="verifiedDiv" style={{ marginTop: '15px' }} onClick={() => setStep(2)}>
                        <h3>Privacy Policy</h3>
                    </div>

                    <div className="verifiedDiv" style={{ marginTop: '15px', }} onClick={() => setStep(3)}>
                        <h3>Delete Account</h3>
                    </div>
                </>
                : step === 2 ? <h1>Coming Soon Privacy Policy</h1>
                : step === 3 ?
                <>
                    <h3>Please mail us at support@dating.com to delete your account.</h3>
                </> 
                : null
            }
            

            <NavigationBar />
        </div>
    )
}

export default Settings;