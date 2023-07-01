import { useNavigate } from 'react-router-dom';
import msg from '../assets/icons/msg.png';
import heart from '../assets/icons/heart.png';
import home from '../assets/icons/home.png';

const NavigationBar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbarDiv">
            <div onClick={() => navigate('/home')}>
                <img src={home} width="40px"/>
            </div>
            <div onClick={() => navigate('/like')}>
                <img src={heart} width="40px"/>
            </div>
            <div onClick={() => navigate('/message')}>
                <img src={msg} width="40px"/>
            </div>
            <div onClick={() => navigate('/profile')}>
                u
            </div>
        </div>
    )
}

export default NavigationBar;