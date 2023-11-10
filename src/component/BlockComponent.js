import close from '../assets/icons/close.png';
import { useState, useEffect, react } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlockComponent = (props) => {
    const navigate = useNavigate();
    const [step, setStep] =useState(1);
    const [reportReason, setReportReason] = useState(null);

    useEffect(() => {
        Aos.init({duration: 400})
    }, []);

    const unmatchProfile = () => {
        let config = {
            method : 'POST',
            maxBodyLength: Infinity,
            url : process.env.REACT_APP_API_URL +`/undomatchProfile/${props.profileId}`,
            withCredentials: true,
        }

        axios.request(config)
          .then((response) => {
            navigate('/message');
          })
          .catch((error) => {
            console.log("errpr", error);
        });


    }

    const blockProfile = () => {
        let config = {
            method : 'POST',
            maxBodyLength: Infinity,
            url : process.env.REACT_APP_API_URL +`/block/${props.profileId}`,
            withCredentials: true,
        }

        axios.request(config)
          .then((response) => {
            navigate('/message');
          })
          .catch((error) => {
            console.log("errpr", error);
        });
    }

    return (
        <div style={{display: 'flex', paddingBottom: '45px', flexDirection: 'column', position: 'absolute',borderRadius: '15px', background: 'linear-gradient(283deg, rgba(255,91,61,1) 0%, rgba(253,45,114,1) 83%)', color: 'white', top: '30vh',left: '15vw', width: '70%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
            <div style={{ display: 'flex', marginRight: '10px', justifyContent: 'flex-end' }}>
                <img
                    onClick={props.hideBlockComp}
                    src={close} 
                    height="45px" 
                    width="45px" 
                />
            </div>
            {
                step === 1 ?
                <>
                    <div data-aos="fade-down"
                        onClick={() => setStep(2)} 
                        style={{backgroundColor: 'whitesmoke', color: 'black', margin: '10px', width: '60%', marginLeft: '20%', height: '40px', lineHeight: '40px', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', fontSize: '18px'}}
                    >
                        BLOCK
                    </div>
                    <div
                        data-aos="fade-left"
                        onClick={() => setStep(3)} 
                        style={{backgroundColor: 'whitesmoke', color: 'black', margin: '10px', width: '60%', marginLeft: '20%', height: '40px', lineHeight: '40px', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', fontSize: '18px'}}
                    >
                        UNMATCH
                    </div>
                    <div
                        data-aos="fade-up"
                        onClick={() => setStep(4)} 
                        style={{backgroundColor: 'whitesmoke', color: 'black', margin: '10px', width: '60%', marginLeft: '20%', height: '40px', lineHeight: '40px', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', fontSize: '18px'}}
                    >
                        REPORT
                    </div>
                </> :
                step === 2 ? 
                <>
                    <h3>Proceeding with this action cannot be undo. Are you absolutely sure you want to continue?</h3>
                    <div style={{display: 'flex', width: '80%', justifyContent: 'space-evenly', margin:'auto'}}>
                        <div 
                            onClick={() => blockProfile()}
                            style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                        >
                            YES
                        </div>
                        <div 
                            onClick={props.hideBlockComp}
                            style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                        >
                            NO
                        </div>
                    </div>
                </> :
                step ===3 ?
                <>
                    <h3>Do you wish to proceed and unmatch this user?</h3>
                    <div style={{display: 'flex', width: '80%', justifyContent: 'space-evenly', margin:'auto'}}>
                        <div 
                            onClick={() => unmatchProfile()}
                            style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                        >
                            YES
                        </div>
                        <div 
                            onClick={props.hideBlockComp}
                            style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                        >
                            NO
                        </div>
                    </div>
                </> : step === 4 &&
                <>
                    <h3>Select a reason why you want to report this user.</h3>
                    {
                        !reportReason ? 
                        <>
                            <div 
                                onClick={() => setReportReason("Fake Profile")}
                                style={{fontSize: '17px', borderTop: '1px solid white', borderBottom: '1px solid white', width: '90%', marginLeft: 'auto', marginRight: 'auto', lineHeight: '40px'}}
                            >
                                Fake Profile
                            </div>
                            <div 
                                onClick={() => setReportReason("Scammers")}
                                style={{fontSize: '17px', borderTop: '1px solid white', borderBottom: '1px solid white', width: '90%', marginLeft: 'auto', marginRight: 'auto', lineHeight: '40px'}}
                            >
                                Scammers
                            </div>
                            <div 
                                onClick={() => setReportReason("Someone is selling somethings")}
                                style={{fontSize: '17px', borderTop: '1px solid white', borderBottom: '1px solid white', width: '90%', marginLeft: 'auto', marginRight: 'auto', lineHeight: '40px'}}
                            >
                                Someone is selling somethings
                            </div>
                            <div 
                                onClick={() => setReportReason("This user is under 18")}
                                style={{fontSize: '17px', borderTop: '1px solid white', borderBottom: '1px solid white', width: '90%', marginLeft: 'auto', marginRight: 'auto', lineHeight: '40px'}}
                            >
                                This user is under 18
                            </div>
                        </> : 
                        <>
                            <textarea 
                                placeholder='Please explain in details'
                                style={{fontSize: '17px', width: '85%', margin: 'auto', height: '100px', borderRadius: '15px', padding: '10px'}}
                            >
                            </textarea>

                            <button style={{width: '60%', margin: 'auto', marginTop: '25px', lineHeight: '30px', border: 'none', borderRadius: '35px'}}>SUBMIT</button>
                        </>
                    }
                    
                </>
            }
        </div>
    )
}

export default BlockComponent;