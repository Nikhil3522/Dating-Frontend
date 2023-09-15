import { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import axios from 'axios';
import { useState } from "react";
import '../LikePage.css';
import LikeRequestProfile from "../component/LikeRequestProfile";
import ProfilePage from "../component/ProfilePage";

const Like = () => {
    const [like, setLike] = useState([]);
    const [profilePageShow, setProfilePageShow] = useState(false);
    const [showProfileId, setShowProfileId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [rejectUserId, setRejectUserId] = useState(null);

    useEffect(() => {
        fetchLikeData();
    }, []);

    const fetchLikeData = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/mydetails',
            withCredentials: true,
            
          };
          
        axios.request(config)
          .then((response) => {
            setLike(response.data.data.like)
          })
          .catch((error) => {
            // console.log("errpr", error);
        });
    }

    const handleClick = (profileId) => {
        setProfilePageShow(true);
        setShowProfileId(profileId);
    };

    const hideProfilePage = () => {
        setProfilePageShow(false);
    }

    const showAlertFunction = (id) => {
        setRejectUserId(id);
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
            setShowAlert(false);
            fetchLikeData();
            // console.log("response", response)
        })
        .catch((error) => {
            console.log("error in rejecting the profile", error);
        })
    }

    return (
        profilePageShow === false ? 
        <div>
            { showAlert &&
                <div style={{zIndex: 2,display: 'flex', paddingBottom: '45px', flexDirection: 'column', position: 'absolute',borderRadius: '15px', background: 'linear-gradient(283deg, rgba(255,91,61,1) 0%, rgba(253,45,114,1) 83%)', color: 'white', top: '30vh',left: '15vw', width: '70%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                    <h3>Are you sure you want to reject this proposal?</h3>
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
                    <h2>When someone swipes right on you, you'll be able to find them right here</h2>
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
            <NavigationBar />
        </div> :
        <ProfilePage 
            profileId={showProfileId} 
            hideProfilePage={hideProfilePage}
        />
    )
}

export default Like;