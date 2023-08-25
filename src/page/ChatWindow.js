import React, { useEffect, useState } from 'react';
import send from '../assets/icons/send.png';
import emoji from '../assets/icons/emoji.png';
import tick from '../assets/icons/tick.png';
import doubleTick from '../assets/icons/double-tick.png';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import localForage from 'localforage';
import axios from 'axios';

const ChatWindow = () => {
    const { profileId } = useParams();
    const [ObjectId, setObjectId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState([]);
    const [chatRoom, setChatRoom] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const socket = io('http://localhost:8900', {
        withCredentials: true,
    });

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
      

    const getMessage = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL +`/chat/get-messages/${profileId}/${pageNumber}`,
            withCredentials: true,
        };

        axios.request(config)
          .then((response) => {
            const temp = response.data.messages;
            temp.map(async (item) => {
                const timeFormat = convertTimeFormat(item.createdAt);
                let tempMessage = {
                    sender: item.sender,
                    content: item.content,
                    time: timeFormat,
                    seen: item.seen
                } 
                setMessageData(prevMessageData => [...prevMessageData, tempMessage]);
            })
          })
          .catch((error) => {
            console.log("errpr", error);
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

        socket.on('message', (data) => {
           if(data.from == profileId) {
            console.log("new Msg", data);
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

        console.log("room create")
        // Creting Room
        socket.emit('create', {room: roomId, userId:ObjectId, withUserId: profileId});
        
    }

    const getData = async () => {
        try {
            const data = await localForage.getItem('myData');
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

    const emitMessage = async () => {
        
        const time = getTime();
        // socket.emit('message', {room: chatRoom, message, from: currentUserId});
        // const recipientUsername = 'recipientUsername';
        const inputData = {from: currentUserId, to: profileId, message: message, time: time }

        socket.emit('message', inputData);
        const renamedObject = {
            sender: inputData.from,
            content: inputData.message,
            time: inputData.time
        };
        setMessageData(prevMessageData => [renamedObject, ...prevMessageData]);
        
    
        // Add the sent message to the local state for real-time display
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { from: currentUserId, message: message },
        // ]);
    
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

    return (
        <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', height: '85vh'}}>
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column-reverse', overflowY: 'scroll' }}>
                {messageData.map((msg, index) => (
                    msg.date ? 
                    <>
                        <p>{msg.date}</p>
                    </>
                    :
                    <div key={index} className='msg-content' style={{width: calculateMessageWidth(msg.content),  alignSelf: msg.sender == currentUserId ? 'flex-end': 'flex-start', borderTopRightRadius: msg.sender !== currentUserId ? '10px' : '0',borderTopLeftRadius: msg.sender == currentUserId ? '10px' : '0' }}>
                        <p style={{marginTop: '0', marginBottom: '0'}}>{msg.content}</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto'}}>
                            { msg.sender == currentUserId  && <img src={msg.seen === true ? doubleTick : tick} width={"20px"}/>}
                            <p style={{lineHeight: '2px', marginTop: '10px', marginBottom: '3px', fontSize: '13px', textAlign: msg.sender == currentUserId ? 'right': 'left'}}>{msg.time}</p>
                        </div>
                    </div>
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
                <img onClick={emitMessage} style={{ backgroundColor: 'lightGreen', borderRadius: '15px', maxHeight: '40px',minHeight: '40px', marginTop: '10px' }} src={send}  />

                {/* <img style={{ backgroundColor: 'lightGreen', borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }} src={send} height="40px"/> */}
            </div>
        </div>
    )
}

export default ChatWindow;