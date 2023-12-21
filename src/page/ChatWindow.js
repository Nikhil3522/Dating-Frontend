import React, { useEffect, useState } from 'react';
import send from '../assets/icons/send.png';
import emoji from '../assets/icons/emoji.png';
import tick from '../assets/icons/tick.png';
import doubleTick from '../assets/icons/double-tick.png';
import backPage from '../assets/icons/backPage.png';
import threeDot from '../assets/icons/threeDot.png';
import BlockComponent from '../component/BlockComponent';
import ProfilePage from '../component/ProfilePage';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import localforage from 'localforage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";

const ChatWindow = () => {
    const navigate = useNavigate();

    const { profileId } = useParams();
    const { index } = useParams();
    var { avatar } = useParams();
    const [ObjectId, setObjectId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState([]);
    const [chatRoom, setChatRoom] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [displayBlockComp, setDisplayBlockComp] = useState(false);
    const [profilePageShow, setProfilePageShow] = useState(false);
    const [showProfileId, setShowProfileId] = useState(null);
    // const [userName, setUsername] = useState(null);

    const socket = io('http://localhost:8900', {
        withCredentials: true,
    });

    useEffect(() => {
        const secretPass = "XkhZG4fW2t2W";

        const bytes = CryptoJS.AES.decrypt(avatar, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        avatar = data;

    }, [])

    const decryptData = async (text) => {
        const secretPass = "XkhZG4fW2t2W";

        const bytes = CryptoJS.AES.decrypt(text, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    };

    useEffect(() => {
    
        socket.on('changeOnlineStatus', (data) => {
            // When the event is received, update messageData
            setMessageData((prevMessageData) => {
              const updatedMessageData = prevMessageData.map((item) => {
                if(item){
                    if (item.seen === false) {
                        return { ...item, seen: true };
                    } else {
                        return item;
                    }
                }
              });
              return updatedMessageData;
            });
          });
    
      }, [messageData]);

    // useEffect(() => {
    //     var profileName = JSON.parse(localStorage.getItem('matchProfileName'));
    //     profileName && profileName.map((item) => item.index == index && setUsername(item.name))
    // })

    useEffect(() => {
        getMessage();
        getData();
    }, [])

    useEffect(() => {
        return () => {
            socket.emit('user_disconnecting', currentUserId);
            // socket.disconnect();
        };
    }, [currentUserId]);

    function convertDateFormat(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear().toString().substr(-2); // Get the last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
      
        return `${month}/${day}/${year}`;
    }

    const getMessage = async () => {

        const decrypted = await decryptData(profileId);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL +`/chat/get-messages/${decrypted}/${pageNumber}`,
            withCredentials: true,
        };

        axios.request(config)
          .then((response) => {
            var temp = response.data.messages;
            var tempDate = null;
            var finalTemp = [];
            // temp = temp.reverse();
            temp.map(async (item) => {
                const timeFormat = convertTimeFormat(item.createdAt);
                const dateFormat = convertDateFormat(item.createdAt);

                if(tempDate !== dateFormat){
                    finalTemp.push({date: dateFormat});
                    // setMessageData(prevMessageData => [...prevMessageData, {date: dateFormat}]);
                    tempDate = dateFormat 
                }
                let tempMessage = {
                    sender: item.sender,
                    content: item.content,
                    time: timeFormat,
                    seen: item.seen
                } 
                finalTemp.push(tempMessage);
                // setMessageData(prevMessageData => [...prevMessageData, tempMessage]);
            })

            rearrangeMessagesByDate(finalTemp);

          })
          .catch((error) => {
            console.log("errpr", error);
            if(error.response.status === 401){
                localforage.setItem('userLogin', {id: Date.now(), value: false});
                navigate('/login');
            }
        });
    }

    // useEffect(() => {
    //     if(ObjectId && currentUserId) connectSocket();
    // }, [ObjectId, currentUserId])

    // useEffect(() => {
    //     // Connect to the Socket.IO server
      
    //     // Listen for events from the server (e.g., 'newMessage')
    //     socket.on('message', (data) => {
    //       console.log('New message received:', data);
    //       // Handle the new message event here, e.g., update the state or trigger a notification
    //     });

    //      // Clean up the socket connection when the component unmounts
    //         return () => {
    //             socket.disconnect();
    //         };
    // }, []);

    useEffect(() => {

        socket.on('message', async (data) => {
            const decrypted = await decryptData(profileId);
           if(data.from == decrypted) {
            // {from: 22, message: 'd', time: '11:15 PM'}
            const renamedObject = {
                sender: data.from,
                content: data.message,
                time: data.time
            };

            setMessageData(prevMessageData => [renamedObject, ...prevMessageData]);
           }
          });
    
          socket.on('error', (error) => {
            console.error('Socket.IO Error:', error);
          });
    }, [])

    const connectSocket = () => {

        var roomId = currentUserId+"-"+profileId;

        if(profileId < currentUserId) roomId = profileId+"-"+currentUserId;
        
        setChatRoom(roomId);

        const socket = io('http://localhost:8900', {
            withCredentials: true,
        });

        // socket.emit('loggedin', {user_id: ObjectId});

        // console.log("room create")
        // Creting Room
        socket.emit('create', {room: roomId, userId:ObjectId, withUserId: profileId});
        
    }

    const rearrangeMessagesByDate = (msgData) => {

        var indexArr = [];
        
        for(let i=0; i< msgData.length; i++){
            if(msgData[i].date){
                indexArr.push(i);
            }
        }
        
        var preEle = null;
        
        for(let i=0; i<indexArr.length; i++){
            if(preEle === null && i===0){
                preEle = msgData[indexArr[i]];
                msgData.splice(indexArr[i], 1);
                for( let j=1; j<indexArr.length; j++){
                    indexArr[j] -= 1;
                }
            }else{
                var tempPreEle = preEle;
                preEle = msgData[indexArr[i]];
                msgData[indexArr[i]] = tempPreEle;
            }
        }
        
        msgData.push(preEle);
        // setMessageData(msgData);
        setMessageData((prevMessageData) => [...prevMessageData, ...msgData]);
    }

    const getData = async () => {
        try {
            const data = await localforage.getItem('myData');
            setObjectId(data[1]['ObjectId']);
            setCurrentUserId(data[1]['userId']);
        socket.emit('setUsername', data[1]['userId']);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const convertTimeFormat = (time) => {
        const timestamp = time;
        const date = new Date(timestamp);

        // Convert to IST
        const ISTOptions = { timeZone: "Asia/Kolkata", hour12: true, hour: "2-digit", minute: "2-digit" };
        const ISTTime = date.toLocaleString("en-US", ISTOptions);

        return ISTTime;
    }

    const getTime = () => {
        const timestamp = Date.now();
        const istTimeString = new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      
        // Extract the hours and minutes from the IST string representation
        const [istDate, istTime] = istTimeString.split(', ');
        const [istHours, istMinutes] = istTime.split(':');
      
        // Convert the hours to 12-hour format and determine AM/PM
        const isPM = parseInt(istHours, 10) >= 12;
        const formattedHours = String(parseInt(istHours, 10) % 12 || 12).padStart(2, '0');
        const formattedMinutes = String(parseInt(istMinutes, 10)).padStart(2, '0');
        const ampm = isPM ? 'AM' : 'PM';
      
        // Concatenate hours, minutes, and AM/PM indication in the desired format (e.g., 'hh:mm AM/PM')
        const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
        return formattedTime;
    }

    useEffect(() => {
        socket.on('messageback', (data) => {
            const renamedObject = {
                sender: data.from,
                content: data.message,
                time: data.time,
                seen: data.seen
            };
            setMessageData(prevMessageData => [renamedObject, ...prevMessageData]);
          });
    }, [])

    const emitMessage = async () => {
        
        const time = getTime();
        const decrypted = await decryptData(profileId);
        const inputData = {from: currentUserId, to: decrypted, message: message, time: time }

        socket.emit('message', inputData);

        // Clear the input field after sending the message
        setMessage('');
        const textarea = document.getElementById('messageTextarea');
        textarea.style.height = '50px';
    }

    const adjustTextareaHeight = () => {
        const textarea = document.getElementById('messageTextarea');
        textarea.style.height = 'auto'; // Reset the height to auto to properly calculate the scroll height
        textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scroll height
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    const calculateMessageWidth = (content) => {
        // Calculate the width based on the length of the content
        const contentLength = content.length;
        const minWidth = 80; // Minimum width for the message container
        const maxWidth = 220; // Maximum width for the message container
    
        // Calculate the width based on the content length
        const width = Math.min(maxWidth, minWidth + contentLength * 10); // Adjust the multiplier to control the width change
    
        return `${width}px`;
      };

    const hideBlockComp = () => {
        setDisplayBlockComp(false);

    }

    const hideProfilePage = () => {
        setProfilePageShow(false);
    }

    // const handleScroll = (e) => {
    //     const div = e.target;

        // console.log("window", window.innerHeight);

        // const scrolledFromTop = div.scrollTop;
        // if (scrolledFromTop === 0 && div.scrollHeight > div.clientHeight) {
        //     console.log("div.scrollTop")
        // }
    // }

    return (
        profilePageShow === false ? 
        <>
        <div className="title" style={{ backgroundColor: 'blue', background: 'linear-gradient(283deg, rgba(255,91,61,1) 0%, rgba(253,45,114,1) 83%)', width: '94%', maxWidth: '600px', position: 'absolute', top: '0', display: 'flex', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px'}}>
            { displayBlockComp && <BlockComponent hideBlockComp={hideBlockComp} profileId={profileId}/> }
            <div style={{display: 'flex'}}>
                <img onClick={() => navigate('/message')} src={backPage} width="70px" height="70px"/>
                <div style={{ display: 'flex', marginLeft: '5px'}} onClick={() => {
                    setProfilePageShow(true)
                    setShowProfileId(profileId)
                    }}>
                    <img src="https://i.pinimg.com/originals/71/6f/3e/716f3e0ded9ed9f6f3428b4b2b7a1ad2.jpg" width="60px" height="60px" style={{ borderRadius: '50%', marginTop: '5px' }}/>
                    <div style={{color: 'white', marginLeft: '5px'}}>
                        <p style={{lineHeight: '25px', fontSize: '20px'}}>{index && index}</p>
                        {/* <div style={{lineHeight: '5px', display: 'flex'}}>
                            <div style={{width:"15px", marginTop:'-5px', marginRight: '5px', minHeight:"15px", backgroundColor: "lightgreen", borderRadius: '50%'}}></div>Online
                        </div> */}
                    </div>
                </div>
            </div>
            <div>
                <img 
                    onClick={() => setDisplayBlockComp(!displayBlockComp)}
                    src={threeDot} 
                    height={"30px"} 
                    style={{marginTop: '20px'}}
                />
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', height: '85vh'}}>
            <div 
                // onScroll={handleScroll} 
                style={{ padding: '10px', display: 'flex', flexDirection: 'column-reverse', overflowY: displayBlockComp ? 'hidden':'scroll' }}
            >
                {messageData.map((msg, index) => (
                    msg && msg.date ? (
                        <p key={index}>{msg.date}</p>
                    ) : (
                        msg && ( // Check if msg is not null or undefined
                        <div key={index} className='msg-content' style={{ width: calculateMessageWidth(msg.content), alignSelf: msg.sender == currentUserId ? 'flex-end' : 'flex-start', borderTopRightRadius: msg.sender !== currentUserId ? '10px' : '0', borderTopLeftRadius: msg.sender == currentUserId ? '10px' : '0' }}>
                            {msg.content.split('\n').map((line, index) => (
                            <p key={index} style={{ marginTop: '0', marginBottom: '0' }}>{line}</p>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto' }}>
                            {msg.sender == currentUserId && <img src={msg.seen === true ? doubleTick : tick} width={"20px"} />}
                            <p style={{ lineHeight: '2px', marginTop: '10px', marginBottom: '3px', fontSize: '13px', textAlign: msg.sender == currentUserId ? 'right' : 'left' }}>{msg.time}</p>
                            </div>
                        </div>
                        )
                    )
                ))}
            </div>


            <div
                id="messageContainer"
                style={{
                    // position: 'fixed',
                    // bottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '2px solid red',
                    borderRadius: '15px',
                    width: '95%',
                    minheight: '20px',
                    maxHeight: '150px', // Set a max height for the container, so it won't grow too much
                    // margin: 'auto',
                    marginLeft: '10px',
                    transition: 'bottom 0.3s ease', // Adding transition for smooth animation
                }}
            >
                <img style={{ borderRadius: '15px', height: '50px', marginTop: '5px' }} src={emoji}  />
                <textarea
                    id="messageTextarea" // Add an ID to the textarea
                    style={{
                        width: '75%',
                        maxHeight: '120px',
                        minHeight: '20px', // Set the minimum height to 30px
                        fontSize: '20px',
                        // border: '1px solid red',
                        border: 'none',
                        borderRadius: '15px',
                        // marginTop: '20px',
                        overflowY: 'hidden',
                        paddingTop: '15px',
        
                      }}
                    value={message}
                    onChange={handleInputChange}
                    placeholder="MESSAGE..."
                ></textarea>
                <img onClick={() => message && emitMessage()} style={{ backgroundColor: 'lightGreen', borderRadius: '15px', maxHeight: '40px',minHeight: '40px', marginTop: '10px' }} src={send}  />

                {/* <img style={{ backgroundColor: 'lightGreen', borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }} src={send} height="40px"/> */}
            </div>
        </div>
        </> : 
        <ProfilePage profileId={showProfileId} encryptData={1} hideProfilePage={hideProfilePage}/>
    )
}

export default ChatWindow;