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
            url: `http://localhost:8000/getUserDetail/${props.profileId}`,
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

    return (
        <div className="likeRequestProfileCard">
            {userData &&
            <>
                {/* <div> */}
                    <img className="profilePicture" src="https://cdn.jwa.org/sites/default/files/mediaobjects/gal_gadot_2_sdcc_2014_cropped.jpg" width="100%" height="220px"/>
                {/* </div> */}

                <div className="buttonContainer">
                    <div className="button" onClick={() => console.log("Nope")}>
                        {/* Reject Button */}
                        <img src={no} width="65px"/>
                    </div>

                    <div className="button"  onClick={() => console.log("Yes")}>
                        {/* Accept Buuton*/}
                        <img src={yes} width="55px"/>
                    </div>
                
                </div>
                
                <div className="likeRequInfo">
                    <h2>{userData.name}, {userData.age}</h2>
                </div>
            </>
            }
        </div>
    )
}

export default LikeRequestProfile;