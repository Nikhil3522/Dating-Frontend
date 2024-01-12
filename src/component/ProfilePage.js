import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import college from '../assets/icons/college.png';
import city from '../assets/icons/city.png';
import down from '../assets/icons/down.png';
import verified from '../assets/icons/verified.png';
import React, { useRef } from 'react';
import location from '../assets/icons/location.png';
import Aos from "aos";
import "aos/dist/aos.css";
import SwipeDetector from './SwipeDetector';
import CryptoJS from "crypto-js";
import shopping from '../assets/images/shopping.png';
import art from '../assets/images/art.png';
import football from '../assets/images/football.png';
import music from '../assets/images/music.png';
import run from '../assets/images/run.png';
import videoGame from '../assets/images/videoGame.png';
import yoga from '../assets/images/yoga.png';
import volleyball from '../assets/images/volleyball.png';
import vlogging from '../assets/images/vlogging.png';
import tennis from '../assets/images/tennis.png';
import roadTrip from '../assets/images/roadTrip.png';
import cricket from '../assets/images/cricket.png';
import drink from '../assets/images/drink.png';
import guitar from '../assets/images/guitar.png';
import photography from '../assets/images/photography.png';
import meditation from '../assets/images/meditation.png';
import gym from '../assets/images/gym.png';
import golf from '../assets/images/golf.png';
import basketball from '../assets/images/basketball.png';

const ProfilePage = (props) => {
    const [profileData, setProfileData] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        Aos.init({ duration: 400 })
    }, []);

    useEffect(() => {
        var profileId;
        if (props.encryptData) {
            const secretPass = "XkhZG4fW2t2W";
            const bytes = CryptoJS.AES.decrypt(props.profileId, secretPass);
            profileId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } else {
            profileId = props.profileId;
        }

        let config = {
            url: process.env.REACT_APP_API_URL + `/getProfileDetail/${profileId}`,
            maxBodyLength: Infinity,
            withCredentials: true,
            method: 'POST'
        }

        axios.request(config)
            .then((res) => {
                setProfileData(res.data.data)
            })
            .catch((err) => {
                console.log("error", err);
            })

    }, []);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleSwipeLeft = () => {
        if (imageIndex < (profileData.image.length - 1)) {
            setImageIndex(imageIndex + 1);
        }
    };

    const handleSwipeRight = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        }
    };

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        touchEndX.current = event.changedTouches[0].clientX;
        handleSwipe();
    };

    useEffect(() => {
        console.log("profileData", profileData);
    }, [profileData])

    const handleSwipe = () => {
        const distance = touchEndX.current - touchStartX.current;

        if (distance > 0) {
            // Swiped right
            handleSwipeRight();
        } else if (distance < 0) {
            // Swiped left
            handleSwipeLeft();
        }
    };

    return (
        profileData &&
        <div className="tinderCard_container">
            <div className="detailProfileDiv " >
                <SwipeDetector
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                />
                <img
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-y' }}
                    className="profileImages"
                    src={`https://backend-ioyu.onrender.com/assets/image/${profileData.image[imageIndex]}`}
                />
                <img
                    //   onClick={() => setViewProfile(-1)} 
                    onClick={() => props.hideProfilePage()}
                    style={{ marginLeft: '-60px' }}
                    src={down}
                    width="60px"
                    data-aos="flip-down"
                />
                <div className="imageBarIndicator" style={{ width: '100%', marginTop: '-3px' }}>
                    {
                        profileData.image.map((item, index) => (
                            <div key={index} style={{ width: `${100 / profileData.image.length}%`, backgroundColor: `${index === imageIndex ? 'white' : 'gray'}` }} ></div>
                        ))
                    }
                </div>

                <h1 data-aos="zoom-out-down">{profileData.name}, {profileData.age}
                    {profileData.verified && <img src={verified} width="30px" style={{ marginTop: '7px', position: 'absolute' }} />}
                </h1>
                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>
                    <img style={{ marginLeft: '-40px', position: 'absolute' }} src={college} width="35px" />: {profileData.college}
                </h3>
                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>
                    <img style={{ marginLeft: '-40px', position: 'absolute' }} src={city} width="35px" />: {profileData.city}
                </h3>
                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>
                    <img style={{ marginLeft: '-40px', position: 'absolute' }} src={location} width="35px" />: 10 Km
                </h3>
                {/* {profileData.bio &&
                <div>
                    <h3 style={{textAlign: 'left', margin: '5px'}}>About Me</h3>
                    <p style={{textAlign: 'Left', padding:'10px', backgroundColor: 'whitesmoke'}}>{profileData.bio}</p>
                </div>
                } */}
                <div>
                    <h3 style={{ textAlign: 'left', margin: '5px' }}>Interests</h3>
                    <div className='interestOptionDiv'>
                        {profileData.interest.map((item, index) => (
                            <div className="interestOptionBox">
                                <img src={require(`../assets/images/${item.toLowerCase()}.png`)} width="30px" height="30px" />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'none', justifyContent: 'space-around', marginTop: '30px' }}>
                    <div data-aos="fade-right" style={{ border: '1px solid red', minWidth: '40%', minHeight: '40px', borderRadius: '10px', backgroundColor: 'red', color: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                        <h2 style={{ lineHeight: '5px' }}>NOPE</h2>
                    </div>
                    <div data-aos="fade-left" style={{ border: '1px solid green', minWidth: '40%', minHeight: '40px', borderRadius: '10px', backgroundColor: 'green', color: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                        <h2 style={{ lineHeight: '5px' }}>LIKE</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage;