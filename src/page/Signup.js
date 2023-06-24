import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../component/ButtonComponent';
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setTimeout(() =>{
            setAlert("");
        }, 7000)
    }, [alert])

    const onSubmit = () => {
        if(step === 2){

            setLoader(true);

            axios.post(process.env.REACT_APP_API_URL + '/signup', {
                "name": name,
                "email": email,
                "password": password
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error(error);
            });

            setLoader(false);
            navigate('/userdetails');

        }else if(name != "" && email != "" && password != "" && confirmPassword != ""){
            if(password === confirmPassword){
                setStep(2);
            }else{
                setAlert("Password and Confirm Password is not same");
            }
        }else{
            setAlert("Please fill all the fields.")
        }
    }

    const handleInputChange = (index, event) => {
      const value = event.target.value;
      setOtp((prevOtp) => {
        const otpArray = [...prevOtp];
        otpArray[index] = value;
        return otpArray;
      });
  
      // Move to the next input box
      if (event.target.value && index < 3) {
        event.target.nextSibling.focus();
      }
    };
  
    const handleKeyDown = (index, event) => {
      // Move to the previous input box if Backspace is pressed
      if (event.key === "Backspace" && index > 0 && !event.target.value) {
        event.target.previousSibling.focus();
      }
    };
  
    const handlePaste = (event) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text/plain");
      if (pasteData.length === 4) {
        setOtp(pasteData.split(""));
      }
    };

    return(
        <div>
            {
                step === 1 ?
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
                </div> 
                :
                <div>
                    <p style={{
                        fontSize: '20px'
                    }}>Type the verification Code <br/> we've sent on <b>{email}</b>.</p>

                    <div>
                        {otp.map((digit, index) => (
                            <input
                            style={{ 
                                width: '50px', 
                                margin: '5px', 
                                height: '50px', 
                                border: 'none',
                                borderRadius: '15px',
                                backgroundColor: 'rgb(255,91,61)',
                                fontSize: '30px',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                            key={index}
                            type="number"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={(e) => handlePaste(e)}
                            placeholder="0"
                            />
                        ))}
                    </div>
                </div>
            }
            
            <p className="errorBox">{alert}</p>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div data-aos="zoom-in-up" onClick={() => onSubmit()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Next" loader={loader}/>
                </div>
            </div>

        </div>
    )
}

export default Signup;