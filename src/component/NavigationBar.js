import { useNavigate } from 'react-router-dom';
import msg from '../assets/icons/msg.png';
import heart from '../assets/icons/heart.png';
import home from '../assets/icons/home.png';
import { useState, useEffect } from 'react';
import user from '../assets/icons/user.png';
import axios from 'axios';

const NavigationBar = () => {
    const navigate = useNavigate();
    const [DPURL, setDPURL] = useState(null);
    const [likeCount, setLikeCount] = useState(null);

    const expirationTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    const currentTime = new Date().getTime();

    useState(() => {
        setDPURL(localStorage.getItem('DP'));
    }, [])

    const mylikeCount = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/myLikeCount',
            withCredentials: true,
        }
    
        axios.request(config)
        .then((res) => {
            const dataToStore = {
                value: res.data.data,
                timestamp: currentTime,
            };
            // Save 'likeCount' to localStorage
            localStorage.setItem('likeCount', JSON.stringify(dataToStore));
            setLikeCount(res.data.data);
        })
        .catch((error) => {
            console.log("error navbar", error);
        });
    }

    useEffect(() => {

        const storedData = localStorage.getItem('likeCount');

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const storedTimestamp = parsedData.timestamp;
            
            // Check if the data has not expired
            if (currentTime - storedTimestamp < expirationTime) {
                setLikeCount(parsedData.value);
            }else{
                mylikeCount();
            }
        }else{
            mylikeCount();
        }

    }, [])

    return (
        <div className="navbarDiv">
            <div onClick={() => navigate('/home')}>
                <img src={home} width="30px"/>
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>HOME</h6> */}
            </div>
            <div onClick={() => navigate('/like')}>
                <img src={heart} width="30px"/>
                {(likeCount && likeCount > 0) &&
                <p className='likeCountText'>{likeCount}</p>}
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>LIKE</h6> */}
            </div>
            <div onClick={() => navigate('/message')}>
                <img src={msg} width="30px"/>
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>CHAT</h6> */}
            </div>
            <div onClick={() => navigate('/profile')}>
                <img 
                    style={{borderRadius: '50%', height: '30px', width: '30px', objectFit: 'cover'}}
                    // src={DPURL ? DPURL : user}
                    src={user}
                    width="30px"
                /> 
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>PROFILE</h6> */}
            </div>
        </div>
    )
}

export default NavigationBar;