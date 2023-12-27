import { useNavigate } from 'react-router-dom';
import msg from '../assets/icons/msg.png';
import heart from '../assets/icons/heart.png';
import home from '../assets/icons/home.png';
import { useState } from 'react';
import user from '../assets/icons/user.png';

const NavigationBar = () => {
    const navigate = useNavigate();
    const [DPURL, setDPURL] = useState(null);

    useState(() => {
        setDPURL(localStorage.getItem('DP'));
    }, [])

    return (
        <div className="navbarDiv">
            <div onClick={() => navigate('/home')}>
                <img src={home} width="30px"/>
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>HOME</h6> */}
            </div>
            <div onClick={() => navigate('/like')}>
                <img src={heart} width="30px"/>
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>LIKE</h6> */}
            </div>
            <div onClick={() => navigate('/message')}>
                <img src={msg} width="30px"/>
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>CHAT</h6> */}
            </div>
            <div onClick={() => navigate('/profile')}>
                <img 
                    style={{borderRadius: '50%', height: '30px', width: '30px', objectFit: 'cover'}}
                    src={DPURL ? DPURL : user}
                    width="30px"
                /> 
                {/* <h6 style={{marginTop: '-4px', color: 'white'}}>PROFILE</h6> */}
            </div>
        </div>
    )
}

export default NavigationBar;