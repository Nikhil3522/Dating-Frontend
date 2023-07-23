import { useEffect, useState } from "react";
import axios from "axios";

const MatchedProfile = (props) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log("data", userData);
    }, [userData])

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

    return (
        <>
            {userData ? 
                <div  style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                    <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                    {/* Online indication of user */}
                    {/* <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div> */}
                    <div style={{ width: '100%' }}>
                        <h2 style={{ lineHeight: '10px' }}>{userData.name}</h2>
                        <p style={{ lineHeight: '10px' }}>Last Message</p>
                    </div>
                </div> 
                : 
                <h1>Loading....</h1>
            }
        </>
    )
}

export default MatchedProfile;