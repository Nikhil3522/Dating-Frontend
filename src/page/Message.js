import { useState, useEffect } from "react";
import axios from "axios";
import localForage from 'localforage';
import { useNavigate } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";


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
                    sortedArray[index] = { ...sortedArray[index], name: response.data.data.name };
                })
                .catch((error) => {
                    console.log("error", error);
                });
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        setMatchProfile(sortedArray); // Update the state with the updated array
    };


    const fetchData = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/mydetails',
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
                name: null
            }));

            const ObjectId = response.data.data._id;
            const userId = response.data.data.userId;
            getAllData(temp);

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

            return `${month}/${day}/${year}`;
        }
    }

    const sortProfile = (filteredMessages) => {

        var originalArray = [];


        for (let i = 0; i < filteredMessages.length; i++) {
            originalArray[i] = {
                index: filteredMessages[i]['index'],
                time: formatTimestamp(filteredMessages[i]['createdAt']),
                content: filteredMessages[i]['content'],
                numberOfUnseenMessages: filteredMessages[i]['numberOfUnseenMessages'],
                sender: filteredMessages[i]['sender']
            };
        }

        const hhmmFormatArray = [];
        const mmddyyFormatArray = [];

        originalArray.forEach(item => {
            if (item.time.includes(':')) {
                hhmmFormatArray.push(item);
            } else {
                mmddyyFormatArray.push(item);
            }
        });

        hhmmFormatArray.sort((a, b) => a.time.localeCompare(b.time));
        mmddyyFormatArray.sort((a, b) => a.time.localeCompare(b.time));

        const sortedArray = hhmmFormatArray.concat(mmddyyFormatArray);

        var indexStartDate = -1;


        sortedArray.forEach((item, index) => {
            if (item.time.includes('/') && indexStartDate === -1) {
                indexStartDate = index;
                return;
            }
        });

        if (indexStartDate !== -1) {
            const reversedPortion1 = sortedArray.slice(0, indexStartDate).reverse();
            sortedArray.splice(0, indexStartDate + 1, ...reversedPortion1);

            const reversedPortion2 = sortedArray.slice(indexStartDate + 1).reverse();
            sortedArray.splice(indexStartDate + 1, sortedArray.length - indexStartDate - 1, ...reversedPortion2);
        } else {
            sortedArray.reverse();
        }

        getUserDetail(sortedArray);
        setLoader(false);
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
                    content: item.lastMessage[0].content,
                    createdAt: item.lastMessage[0].createdAt,
                    numberOfUnseenMessages: item.numberOfUnseenMessages,
                    sender: item.lastMessage[0].sender,
                }));

                let filteredMessages = newArray.filter((message) => message !== null);

                sortProfile(filteredMessages);
            });
    };

    return (
        <div>
            <h4>Chat</h4>
            <div>
                {loader === false && matchProfile.map((profile, index) => (
                    <div key={index} onClick={() => navigate(`/message/${profile.index}/${profile.name}`)}>
                        <div style={{ width: '90%', margin: 'auto', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
                            <img style={{ borderRadius: '15px' }} src="https://tse2.mm.bing.net/th?id=OIP.p7gZV4Td4lKOtIgk0pH_1QHaLH&pid=Api&P=0&h=180" height="80px" />
                            {/* Online indication of user */}
                            {/* <div style={{ backgroundColor: 'lightGreen', width: '20px', height: '16px', borderRadius: '50%', marginTop: '60px', marginLeft: '-12px' }}></div> */}
                            <div style={{ width: '100%' }}>
                                <h2 style={{ lineHeight: '10px' }}>{profile.name}</h2>
                                <p style={{ lineHeight: '10px' }}>{profile.content}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>



                                <p style={{ marginBottom: '0', width: '70px' }}>{profile.time}</p>
                                {profile.numberOfUnseenMessages > 0 && profile.sender == profile.index &&
                                    <p className="unseenMsg">{profile.numberOfUnseenMessages}</p>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <NavigationBar />
        </div>
    )
}

export default Message;