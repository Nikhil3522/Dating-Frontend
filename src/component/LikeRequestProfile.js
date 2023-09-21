import { useEffect, useState } from "react";
import axios from "axios";
import yes from '../assets/icons/yes.png';
import no from '../assets/icons/no.png';

const LikeRequestProfile = (props) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL +`/getUserDetail/${props.profileId}`,
            withCredentials: true,
        };
          
        axios.request(config)
          .then((response) => {
            setUserData(response.data.data);
          })
          .catch((error) => {
            console.log("errpr", error);
        });
    }, [])

    const acceptLike = () => {
        const config={
            method: 'POST',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + `/matchProfile/${props.profileId}`,
            withCredentials: true,
        }

        axios.request(config)
        .then((response) => {
            props.fetchLikeData();
            // console.log("response", response)
        })
        .catch((error) => {
            // console.log("error in rejecting the profile", error);
        })
    }

    return (
        <div className="likeRequestProfileCard" onClick={() => props.handleClick(props.profileId)}>
    {userData && (
        <>
            {/* Profile Picture */}
            <img 
                className="profilePicture" 
                src="https://cdn.jwa.org/sites/default/files/mediaobjects/gal_gadot_2_sdcc_2014_cropped.jpg" 
                width="100%" 
                height="220px"
            />

            <div className="likeRequInfo">
                <h2>{userData.name}, {userData.age}</h2>
            </div>

            <div className="buttonContainer">
                <div className="button" style={{borderRight: '1px solid white'}} onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating
                    props.showAlertFunction(props.profileId, userData.name);
                }}>
                    {/* Reject Button */}
                    <img src={no} width="35px"/>
                </div>

                <div className="button" style={{borderLeft: '1px solid white'}} onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating
                    acceptLike()
                }}>
                    {/* Accept Button */}
                    <img src={yes} width="30px"/>
                </div>
            </div>

   
        </>
    )}
</div>

    )
}

export default LikeRequestProfile;