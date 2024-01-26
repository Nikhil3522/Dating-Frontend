import NavigationBar from "../component/NavigationBar";
import '../Profile.css'
import edit from '../assets/icons/edit.png';
import verified from '../assets/icons/verified.png';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import blackLoader from "../assets/gif/blackLoader.gif";

const Profile = () => {
    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useState(async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/myDetails',
            withCredentials: true,

        };

        await axios.request(config)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("errpr", error);
                if(error.response.status === 401){
                    localforage.setItem('userLogin', {id: Date.now(), value: false});
                    navigate('/login');
                }
            });
    }, []);

    return (
        <div className="profile-container">
            {
                data ?
                    <>
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                        <div className="wave wave4"></div>

                        <div className="profileIconDiv">
                            <img 
                                className="profilePictureIcon" 
                                src={data.data.avatar} 
                                width="170px" 
                            />
                            <img
                                onClick={() => navigate('/profile/edit')}
                                src={edit}
                                className="editIcon"
                            />
                            <div style={{ marginTop: '-20px' }}>
                                <h2>{data.data.name}, {data.data.age} {data.data.verified && <img className="verifiedTag" src={verified} width="40px" height="40px" />}</h2>
                            </div>
                        </div>

                        {/* <div>
                            <h3>Profile Complete</h3>
                            <div className="profileCompeteIndicater"></div>
                        </div> */}

                        {data.data.verified === false &&
                            <div className="verifiedDiv" onClick={() => navigate('/verified')}>
                                <h3>Get Verified <img className="verifiedTag" src={verified} width="40px" height="40px" /></h3>
                            </div>
                        }

                        <div className="verifiedDiv" style={{ marginTop: '15px' }} onClick={() => navigate('/settings')}>
                            <h3>Settings & privacy</h3>
                        </div>

                        {/* {
                            data.data.permission === 1 
                            ?
                            <div style={{paddingBottom: '150px'}}>
                                <div className="subscriptionContainer">
                                    <div className="subscriptionDiv">
                                        <h3>Gold Pack</h3>
                                        <p>Unlimited Likes</p>
                                        <p>See Who Likes You</p>
                                        <p className="price">&#8377;99</p>

                                        <div className="continueBtn" style={{ marginTop: '15px' }} onClick={() => navigate('/subscription/gold')}>
                                            <h3 style={{lineHeight: '45px'}}>CONTINUE</h3>
                                        </div>
                                    </div>

                                    <div className="subscriptionDiv">
                                        <h3>Diamond Pack</h3>
                                        <p>Unlimited Likes</p>
                                        <p>See Who Likes You</p>
                                        <p>Priority Likes</p>
                                        <p className="price">&#8377;199</p>

                                        <div className="continueBtn" style={{ marginTop: '15px' }} onClick={() => navigate('/subscription/diamond')}>
                                            <h3 style={{lineHeight: '45px'}}>CONTINUE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <h2 className="enjoySub">Enjoy The Subscription</h2>
                            </div>
                        } */}

                        <div>
                        </div>
                    </> : <img src={blackLoader} height="100px" style={{marginTop: '30vh'}}/>
            }

            <NavigationBar />
        </div>
    )
}

export default Profile; 