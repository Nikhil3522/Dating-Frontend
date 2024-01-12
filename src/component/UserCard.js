import '../assets/css/usercard.css';
import axios from 'axios';
import up from '../assets/icons/up.png';
import { useEffect, useState } from 'react';
import React, { useRef } from 'react';

const UserCard = (props) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        let tempImageName = `${process.env.REACT_APP_PRE_IMAGE_URL}/assets/image/${props.person.image[imageIndex]}`;
        setImageUrl(tempImageName);
    }, [imageIndex])

    const changeImage = (direction) => {
        if (direction === "next" && imageIndex < (props.person.image.length - 1)) {
            setImageIndex(imageIndex + 1);
        } else if (direction === "back" && imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        }
    }

    const nope = (person) => {

        let config = {
            method: 'POST',
            url: process.env.REACT_APP_API_URL + `/nope/${person.userId}`,
            withCredentials: true,
            maxBodyLength: Infinity,
        };

        axios.request(config)
            .then((res) => {
                console.log("res", res);
            })
            .catch((err) => {
                console.log("err", err);
            })

        props.reCallAPI(person.userId);
    }

    const likeProfile = (userId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + `/like/${userId}`,
            withCredentials: true,
        }

        axios.request(config)
            .then((response) => {
                console.log("like the profile", response);
            })
            .catch((error) => {
                console.log("error in liking the profile", error);

                if (error.response.status === 429) {
                    props.changeLikeLimitExceedValue(true);
                }
            })
    }




    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        touchEndX.current = event.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const distance = touchEndX.current - touchStartX.current;

        if (distance > 0) {
            changeImage("back");

        } else if (distance < 0) {
            changeImage("next");
        }
    };


    return (
        <div className='usercard-main-container' style={{ zIndex: `${props.z}`, position: 'absolute' }}>
            <div className="imageBarIndicator" style={{ marginTop: '0px', width: '95%', margin: 'auto' }}>
                {
                    props.person.image.map((item, index) => (
                        <div key={index} style={{ width: `${100 / props.person.image.length}%`, backgroundColor: `${index === imageIndex ? 'red' : 'gray'}` }} ></div>
                    ))

                }
            </div>
            <div className='img-container'
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={imageUrl}
                    width="95%"
                    height="100%"
                />
                <div className='info-container'
                    onClick={() => props.changeViewProfileIndex(props.key)}>
                    <div>
                        <h1>{props.person.name}, {props.person.age} </h1>
                        <img onTouchStart={() => props.changeViewProfileIndex(props.key)} className="upIcon" src={up} width="45px" />
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <div className='nope-btn' onClick={() => nope(props.person)}>
                    NOPE
                </div>
                <div className='like-btn' onClick={() => {
                    likeProfile(props.person.userId);
                    props.reCallAPI(props.person.userId);
                }}>
                    LIKE
                </div>
            </div>

        </div>
    )
}

export default UserCard;