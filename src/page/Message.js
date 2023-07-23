import NavigationBar from "../component/NavigationBar";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import MatchedProfile from "../component/MatchedProfile";
import { useNavigate } from "react-router-dom";
import localForage from 'localforage';


const Message = () => {
    const navigate = useNavigate();

    const [macthProfileId, setMatchProfileId] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/mydetails',
                withCredentials: true,
            };

            const response = await axios.request(config);
            setMatchProfileId(response.data.data.match);

            const ObjectId = response.data.data._id;
            const userId = response.data.data.userId;

            try {
                const newData = { id: Date.now(), ObjectId, userId };
                const updatedData = ["ObjectId", newData];
                await localForage.setItem('myData', updatedData);
            } catch (error) {
                console.error('Error saving data:', error);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <div>
            <h4>Chat</h4>
            <div>
                {macthProfileId.map((profileId, index) => (
                    <div onClick={() => navigate(`/message/` + profileId)}>
                        <MatchedProfile
                            profileId={profileId}
                            key={index}
                        />
                    </div>
                ))}
            </div>
            {/* <div>
                    <div onClick={() => setClick(true)} style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                        <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                        <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div>
                        <div style={{ width: '100%' }}>
                            <h2 style={{ lineHeight: '10px' }}>Name</h2>
                            <p style={{ lineHeight: '10px' }}>Last Message</p>
                        </div>
                    </div>

                    <div style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                        <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                        <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div>
                        <div style={{ width: '100%' }}>
                            <h2 style={{ lineHeight: '10px' }}>Name</h2>
                            <p style={{ lineHeight: '10px' }}>Last Message</p>
                        </div>

                        <div style={{ position: 'relative', backgroundColor: 'lightGreen', width: '40px', height: '30px', marginTop: '25px', borderRadius: '100%', color: 'white' }}><h3 style={{ marginTop: '0px' }}>2</h3></div>
                    </div>

                    <div style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                        <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                        <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div>
                        <div style={{ width: '100%' }}>
                            <h2 style={{ lineHeight: '10px' }}>Name</h2>
                            <p style={{ lineHeight: '10px' }}>Last Message</p>
                        </div>
                    </div>
                </div>   */}
            <NavigationBar />
        </div>
    )
}

export default Message;