import NavigationBar from "../component/NavigationBar";
import '../Profile.css'
import edit from '../assets/icons/edit.png';
import verified from '../assets/icons/verified.png';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

const Profile = () => {
    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useState(async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/myDetails',
            withCredentials: true,

        };

        await axios.request(config)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("errpr", error);
            });
    }, []);

    const logout = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/logout',
            withCredentials: true,

        };

        axios.request(config)
            .then(async (response) => {
                await localforage.setItem('userLogin', {id: Date.now(), value: false});
                navigate('/login');
            })
            .catch((error) => {
                console.log("error in logout", error);
            });
    }

    return (
        <div className="profile-container">
            {
                data ?
                    <>
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                        <div className="wave wave4"></div>

                        <div className="profileIconDiv">
                            <img className="profilePictureIcon" src="https://i.pinimg.com/736x/ac/11/59/ac1159303e009a8bd1361fe86a435aa0.jpg" width="170px" />
                            <img
                                onClick={() => navigate('/profile/edit')}
                                src={edit}
                                className="editIcon"
                            />
                            <div style={{ marginTop: '-20px' }}>
                                <h2>{data.data.name}, {data.data.age} {data.data.verified && <img className="verifiedTag" src={verified} width="40px" height="40px" />}</h2>
                            </div>
                        </div>

                        {/* <div>
                            <h3>Profile Complete</h3>
                            <div className="profileCompeteIndicater"></div>
                        </div> */}

                        {data.data.verified === false &&
                            <div className="verifiedDiv" onClick={() => navigate('/verified')}>
                                <h3>Get Verified <img className="verifiedTag" src={verified} width="40px" height="40px" /></h3>
                            </div>
                        }

                        <div className="verifiedDiv" style={{ marginTop: '15px' }} onClick={logout}>
                            <h3>Logout</h3>
                        </div>
                        <div>
                        </div>
                    </> : 'loading...'
            }

            <NavigationBar />
        </div>
    )
}

export default Profile; 