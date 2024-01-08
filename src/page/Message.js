import { useState, useEffect } from "react";
import axios from "axios";
import localforage from 'localforage';
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import blackLoader from "../assets/gif/blackLoader.gif";
import CryptoJS from "crypto-js";

const Message = () => {
    const navigate = useNavigate();

    const [matchProfile, setMatchProfile] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const getUserDetail = async (sortedArray) => {

        const promises = sortedArray.map((item, index) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: process.env.REACT_APP_API_URL + `/getUserDetail/${item.index}`,
                withCredentials: true,
            };

            return axios.request(config)
                .then((response) => {
                    sortedArray[index] = { ...sortedArray[index], name: response.data.data.name, avatar: response.data.data.avatar };
                })
                .catch((error) => {
                    console.log("error", error);
                });
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
        setLoader(false);
        setMatchProfile(sortedArray); // Update the state with the updated array
    };


    const fetchData = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: process.env.REACT_APP_API_URL + '/mydetails',
                withCredentials: true,
            };

            const response = await axios.request(config);
            var temp = response.data.data.match;

            temp = temp.map((index) => ({
                index: index,
                time: null,
                content: null,
                numberOfUnseenMessages: null,
                sender: null,
                name: null,
                avatar: null,
            }));

            const ObjectId = response.data.data._id;
            const userId = response.data.data.userId;
            getAllData(temp);

            try {
                const newData = { id: Date.now(), ObjectId, userId };
                const updatedData = ["ObjectId", newData];
                await localforage.setItem('myData', updatedData);
            } catch (error) {
                console.error('Error saving data:', error);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response.status === 401) {
                localforage.setItem('userLogin', { id: Date.now(), value: false });
                navigate('/login');
            }
        }
    };

    function formatTimestamp(timestamp) {
        const dateObj = new Date(timestamp);

        const currentDate = new Date();
        const isToday = (
            dateObj.getFullYear() === currentDate.getFullYear() &&
            dateObj.getMonth() === currentDate.getMonth() &&
            dateObj.getDate() === currentDate.getDate()
        );

        if (isToday) {
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

            return `${formattedHours}:${formattedMinutes} ${period}`;
        } else {
            const year = dateObj.getFullYear().toString().substr(-2);
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');

            const finalDate = `${month}/${day}/${year}`;

            if (finalDate === '01/01/70') {
                return null;
            }
            return finalDate;
        }
    }

    const sortProfile = (filteredMessages) => {

        const sortedProfiles = filteredMessages.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeB - timeA; // Sort in descending order (most recent first)
        });

        getUserDetail(sortedProfiles);


    }

    const getAllData = (temp) => {

        Promise.all(
            temp.map((item) => {
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: process.env.REACT_APP_API_URL + `/chat/last-message/${item.index}`,
                    withCredentials: true,
                };

                return axios
                    .request(config)
                    .then((res) => res.data)
                    .catch((err) => {
                        console.log("error in getting the last message", err);
                        return null;
                    });
            })
        )
            .then((messages) => {
                // Filter out null values
                const newArray = messages.map((item, index) => ({
                    index: temp[index].index, // Access tempId here
                    content: item.lastMessage.length > 0 ? item.lastMessage[0].content : null,
                    createdAt: item.lastMessage.length > 0 ? item.lastMessage[0].createdAt : null,
                    numberOfUnseenMessages: item.numberOfUnseenMessages,
                    sender: item.lastMessage.length > 0 ? item.lastMessage[0].sender : null,
                }));

                let filteredMessages = newArray.filter((message) => message !== null);

                sortProfile(filteredMessages);
            });
    };

    const encrypt = async (text) => {
        const secretPass = "XkhZG4fW2t2W";

        const data = CryptoJS.AES.encrypt(
            JSON.stringify(text),
            secretPass
        ).toString(CryptoJS.enc.Base64URL);

        return data;
    };

    const redirectTo = async (profile) => {

        const regex = /\//;
        while (1) {
            var encrypted = await encrypt(profile.index);

            if (regex.test(encrypted)) {
                encrypted = await encrypt(profile.index);
            } else {
                break;
            }
        }

        while (1) {
            var encryptedAvatar = await encrypt(profile.avatar);

            if (regex.test(encryptedAvatar)) {
                encryptedAvatar = await encrypt(profile.avatar);
            } else {
                break;
            }
        }

        navigate(`/message/${encrypted}/${profile.name}/${encryptedAvatar}`)
    }

    return (
        <div>
            <h4>Chat</h4>
            <div style={{ paddingBottom: '100px' }}>
                {loader === false ?
                    matchProfile.length >= 1 ?
                        matchProfile.map((profile, index) => (
                            <div key={index} onClick={() => redirectTo(profile)}>
                                <div style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                                    <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                                    {/* Online indication of user */}
                                    {/* <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div> */}
                                    <div style={{ width: '100%' }}>
                                        <h2 style={{ lineHeight: '10px' }}>{profile.name}</h2>
                                        <p style={{ lineHeight: '10px' }}>{profile.content}</p>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column' }}>



                                        <p style={{ marginBottom: '0', width: '70px' }}>{formatTimestamp(profile['createdAt'])}</p>
                                        {profile.numberOfUnseenMessages > 0 && profile.sender == profile.index &&
                                            <p className="unseenMsg">{profile.numberOfUnseenMessages}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )) : 
                        <div>
                           <p style={{margin: '10px'}}>
                                Looks like you haven't found a match yet. Keep swiping! Your perfect match is just around the corner!
                           </p>
                        </div>
                    :
                    <img src={blackLoader} height="100px" style={{ marginTop: '30vh' }} />}
            </div>
            <NavigationBar />
        </div>
    )
}

export default Message;