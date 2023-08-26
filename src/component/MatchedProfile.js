import { useEffect, useState } from "react";
import axios from "axios";

const MatchedProfile = (props) => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastMsg, setLastMsg] = useState(null);
    const [numberOfUnseenMsg, setNumberOfUnseenMsg] = useState(null);

    useEffect(() => {
        convertTimeFormat();
        // console.log("mp", props.index);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL +`/getUserDetail/${props.profileId}`,
            withCredentials: true,
        };
          
        axios.request(config)
          .then((response) => {
            setUserData(response.data.data);

            const temp = {
                index: props.index,
                name: response.data.data.name
            };
            
            const storedValue = localStorage.getItem('matchProfileName');
            let updatedStoredValue;
            
            if (storedValue) {
                const storedValueArray = JSON.parse(storedValue);
                const hasExistingIndex = storedValueArray.some(item => item.index === props.index);
            
                if (!hasExistingIndex) {
                    updatedStoredValue = [...storedValueArray, temp];
                } else {
                    updatedStoredValue = storedValueArray;
                }
            } else {
                updatedStoredValue = [temp];
            }
            
            localStorage.setItem('matchProfileName', JSON.stringify(updatedStoredValue));
            
            getLastMessage();
          })
          .catch((error) => {
            console.log("errpr", error);
        });
    }, [])

    const getLastMessage = () => {
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL+`/chat/last-message/${props.profileId}`,
            withCredentials: true,
        }

        axios.request(config)
        .then((res) => {
            // console.log("afds", res.data.lastMessage[0]);
            setLastMsg(res.data.lastMessage[0]);
            setNumberOfUnseenMsg(res.data.numberOfUnseenMessages);
            setLoading(false);
        })
        .catch((err) => {
            console.log("error in getting the last message", err)
        })
    }

    const convertTimeFormat = (time) => {
        const timestamp = time;
        const date = new Date(timestamp);

        // Convert to IST
        const ISTOptions = { timeZone: "Asia/Kolkata", hour12: true, hour: "2-digit", minute: "2-digit" };
        const ISTTime = date.toLocaleString("en-US", ISTOptions);

        return ISTTime;
    }

    return (
        <>
            {loading === false ? 
                <div  style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                    <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                    {/* Online indication of user */}
                    {/* <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div> */}
                    <div style={{ width: '100%' }}>
                        <h2 style={{ lineHeight: '10px' }}>{userData.name}</h2>
                        <p style={{ lineHeight: '10px' }}>{lastMsg ? lastMsg.content : null}</p>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>

                    

                    <p style={{marginBottom: '0', width: '70px'}}>{lastMsg && convertTimeFormat(lastMsg.createdAt)}</p>
                    {numberOfUnseenMsg > 0 && lastMsg.sender == props.profileId &&
                        <p className="unseenMsg">{numberOfUnseenMsg}</p>
                    }
                    </div>

                </div> 
                : 
                <h1>Loading....</h1>
            }
        </>
    )
}

export default MatchedProfile;