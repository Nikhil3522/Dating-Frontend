import { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import axios from 'axios';
import { useState } from "react";
import '../LikePage.css';
import LikeRequestProfile from "../component/LikeRequestProfile";
import ProfilePage from "../component/ProfilePage";
import blackLoader from "../assets/gif/blackLoader.gif";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

const Like = () => {
    const navigate = useNavigate();

    const [like, setLike] = useState([]);
    const [profilePageShow, setProfilePageShow] = useState(false);
    const [showProfileId, setShowProfileId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [rejectUserId, setRejectUserId] = useState(null);
    const [rejectUserName, setRejectUserName] = useState(null);
    const [preLoader, setPreLoader] = useState(true);
    const [permission, setPermission] = useState(false);
    const [likeLength, setLikeLength] = useState(null);

    useEffect(() => {
        fetchLikeData();
    }, []);

    const fetchLikeData = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/myLike',
            withCredentials: true,
            
          };
          
        axios.request(config)
          .then((response) => {
            if(Array.isArray(response.data.data)){
                setLike(response.data.data);
            }else{
                setPermission(true);
                setLikeLength(response.data.data)
            }
            setPreLoader(false);
          })
          .catch((error) => {
            // console.log("errpr", error);
            if(error.response.status === 401){
                localforage.setItem('userLogin', {id: Date.now(), value: false});
                navigate('/login');
            }
        });
    }

    const handleClick = (profileId) => {
        setProfilePageShow(true);
        setShowProfileId(profileId);
    };

    const hideProfilePage = () => {
        setProfilePageShow(false);
    }

    const showAlertFunction = (id, name) => {
        setRejectUserId(id);
        setRejectUserName(name)
        setShowAlert(true);
    }

    const rejectLike = () => {
        const config={
            method: 'POST',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + `/notmatchProfile/${rejectUserId}`,
            withCredentials: true,
        }

        axios.request(config)
        .then((response) => {
            setRejectUserId(null);
            setRejectUserName(null);
            setShowAlert(false);
            window.location.reload();
            // fetchLikeData();
            // console.log("response", response)
        })
        .catch((error) => {
            console.log("error in rejecting the profile", error);
        })
    }

    return (
        profilePageShow === false ? 
        <div>
            {preLoader ? <img src={blackLoader} height="100px" style={{marginTop: '30vh'}}/> :
            permission ? <>
                <h3>{likeLength} Likes</h3>

                <div className="likeContainer">
                    {
                        Array.from({ length: likeLength }).map((_, index) => (
                            <div key={index} className="likeRequestProfileCard" onClick={() => navigate('/subscription/gold')}>
                                <img 
                                    className="profilePicture" 
                                    src="https://cdn.jwa.org/sites/default/files/mediaobjects/gal_gadot_2_sdcc_2014_cropped.jpg" 
                                    width="100%" 
                                    height="220px"
                                    style={{filter: 'blur(20px)'}}
                                />
                            </div>
                        ))
                    }
                </div>
            </>:
            <>
                { showAlert &&
                    <div style={{zIndex: 2,display: 'flex', paddingBottom: '45px', flexDirection: 'column', position: 'absolute',borderRadius: '15px', background: 'linear-gradient(283deg, rgba(255,91,61,1) 0%, rgba(253,45,114,1) 83%)', color: 'white', top: '30vh',left: '15vw', width: '70%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                        <h3>Are you sure you don't want to match with {rejectUserName}?</h3>
                        <div style={{display: 'flex', width: '80%', justifyContent: 'space-evenly', margin:'auto'}}>
                            <div 
                                onClick={() => rejectLike()}
                                style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                            >
                                YES
                            </div>
                            <div 
                                onClick={() => {
                                    setRejectUserId(null);
                                    setRejectUserName(null);
                                    setShowAlert(false);
                                }}
                                style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                            >
                                NO
                            </div>
                        </div>
                    </div>
                }
                <h3>{like.length} Likes</h3>
                {
                    like.length === 0 ? 
                    <div>
                        <h2>When someone like you, you'll be able to find them right here</h2>
                    </div> 
                    :
                    <div className="likeContainer">
                        {like.map((item, index) => (
                            <LikeRequestProfile
                                key={index} 
                                profileId={item} 
                                fetchLikeData={fetchLikeData}
                                handleClick={handleClick}
                                showAlertFunction={showAlertFunction}
                            />
                        ))}
                    </div>
                }
            </>}
            <NavigationBar />
        </div> :
        <ProfilePage 
            profileId={showProfileId} 
            hideProfilePage={hideProfilePage}
        />
    )
}

export default Like;