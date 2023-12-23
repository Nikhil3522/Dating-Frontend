import ButtonComponent from "../component/ButtonComponent";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import 

const ForgetPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [alert, setAlert] = useState(null);
    const [state, setState] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 600 })
    }, []);

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

    const sendOTP = async () => {
        try {
          const response = await axios.post(process.env.REACT_APP_API_URL + '/forgetPasswordOTP', {
            mailId: email,
          });
          if(response.data.emailNotExist){
            return false;
          }
          return true;
        } catch (error) {
          setAlert('Something went wrong!');
          return false;
        }
      };
      

    const onSubmit = async () => {
        if(state === 3){
            if(password != "" && confirmPassword != ""){
                if (password === confirmPassword) {
                    if (password.length >= 6) {
                    if (/\d/.test(password)) {
                        setLoader(true);
                        
                        axios.post(process.env.REACT_APP_API_URL + '/newPassword', {
                            email: email,
                            password: password
                        }).then(response => {
                            navigate('/login');
                        }).catch(error => {
                            setAlert("Something went wrong!")
                        });

                        setLoader(false);

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
        }else if(state === 2){
            setLoader(true);

            const numberOtp = Number(otp.join(""));

            await axios.post(process.env.REACT_APP_API_URL + '/forgetPasswordOTPVerify', {
                "otp": numberOtp,
                "email": email,
            }).then(response => {
                console.log("Otp matched", response);
                if(response.data.message === "OTP Matched"){
                    setState(3);
                }else if(response.data.message === "Wrong OTP"){
                    setAlert("Wrong OTP")
                }
            }).catch(error => {
                setAlert("Something went wrong please try after sometime.")
            });
            setLoader(false);

        }else if (email) {
            if (isValidEmail(email)) {
                setLoader(true);
                const emailExist = await sendOTP();
                if(emailExist){
                    setAlert(null);
                    setState(2);
                }else{
                    setAlert("There is no account with this email id.");
                }
                setLoader(false);
            } else {
                setAlert("Please enter valid register Email Id")
            }
        } else {
            setAlert("Please enter your register Email Id")
        }
    }


    return (
        <div>
            {state === 1 &&
                <div className="inputDiv">
                    <p className="inputTitle" style={{ "width": "40px" }}>Email</p>
                    <input
                        type="email"
                        className="inputField"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            }

            {state === 2 &&
                <div>
                    <p style={{
                        fontSize: '20px'
                    }}>Type the verification Code <br /> we've sent on <b>{email}</b>.</p>

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

            {state === 3 &&
                <>
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
                </>
            }

            <p className="errorBox">{alert}</p>
           
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div onClick={() => loader === false && onSubmit()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Next" loader={loader}/>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;