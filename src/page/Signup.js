import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../component/ButtonComponent';
import hide from '../assets/icons/hide.png';
import shown from '../assets/icons/shown.png';
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({duration: 600})
    }, []);

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loader, setLoader] = useState(false);
    const [passwordSee, setPasswordSee] = useState(false);
    const [confirmPassSee, setConfirmPassSee] = useState(false);

    useEffect(() => {
        setTimeout(() =>{
            setAlert("");
        }, 7000)
    }, [alert])

    const sendOTP = () => {
        // console.log("sd");

        axios.post(process.env.REACT_APP_API_URL + '/mailverify', {
            mailId: email,
            name: name
        }).then(response => {
            console.log("response");
        }).catch(error => {
            setAlert("Something went wrong!")
        });
    }

    const onSubmit = async () => {
        if(step === 2){

            setLoader(true);

            const numberOtp = Number(otp.join(""));

            await axios.post(process.env.REACT_APP_API_URL + '/signup', {
                "otp": numberOtp,
                "name": name,
                "email": email,
                "password": password
            }).then(response => {
                localStorage.setItem('userEmail', `${email}`);
                localStorage.setItem('userName', `${name}`);
                localStorage.setItem('userPassword', `${password}`);
                console.log("fds", response);
                navigate('/userdetails');
                
            }).catch(error => {
                // console.error("err", error);
                setAlert("Wrong OTP")
            });

            setLoader(false);
            

        }else if(name != "" && email != "" && password != "" && confirmPassword != ""){
            if(!isValidEmail(email)){
                setAlert("Please enter a valid email address.");
            }else if (password === confirmPassword) {
                if (password.length >= 6) {
                  if (/\d/.test(password)) {
                    setAlert("");
                    sendOTP();
                    setStep(2);
                  } else {
                    setAlert("Password needs to contain at least one digit.");
                  }
                } else {
                  setAlert("Password needs to have 6 or more characters.");
                }
            } else {
                setAlert("Password and Confirm Password do not match.");
            }
        }else{
            setAlert("Please fill all the fields.")
        }
    }

    function isValidEmail(email) {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
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
                    <div className="inputDiv">
                        <p className="inputTitle" style={{"width": "140px"}}>Confirm Password</p>
                        <div style={{display: 'flex', paddingLeft: '5px', paddingRight: '5px'}}>
                            <input 
                            style={{outline: "none"}}
                                type={confirmPassSee ? "text" : "password"}
                                className="inputField"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <img 
                                style={{marginTop: '10px'}}
                                onClick={() => setConfirmPassSee(!confirmPassSee)} 
                                src={confirmPassSee ? hide: shown} 
                                width="30px"
                                height="30px"
                            />
                        </div>

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