import { useState } from "react";
import axios from 'axios';
// import "./tinderCard.css"
import '../App.css';
import NavigationBar from "../component/NavigationBar";
import ProfileCard from "../component/ProfileCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verified from '../assets/icons/verified.png';
import back from '../assets/icons/back.png';
import next from '../assets/icons/next.png';
import college from '../assets/icons/college.png';
import city from '../assets/icons/city.png';
import down from '../assets/icons/down.png';
import SwipeDetector from "../component/SwipeDetector";
import React, { useRef } from 'react';
import location from '../assets/icons/location.png';
import customize from '../assets/icons/customize.png';
import Aos from "aos";
import "aos/dist/aos.css";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ButtonComponent from "../component/ButtonComponent";
import blackLoader from "../assets/gif/blackLoader.gif";
import blackClose from "../assets/icons/black-close.png";
import localforage from "localforage";
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
import UserCard from "../component/UserCard";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [viewProfile, setViewProfile] = useState(-1);
  const [imageIndex, setImageIndex] = useState(0);
  const [showPreferenceDiv, setShowPreferenceDiv] = useState(false);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [distance, setDistance] = useState(null);
  const [preLoader, setPreLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  const [likeLimitExceed, setLikeLimitExceed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const changeLikeLimitExceedValue = (value) => {
    setLikeLimitExceed(value);
  }

  useEffect(() => {
    // Function to calculate and update the time left
    function calculateTimeLeft() {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const timeDifference = endOfDay - now;

      if (timeDifference > 0) {
        let hours = Math.floor(timeDifference / 3600000);
        if(hours < 10){
          hours = `0${hours}`;
        }
        let minutes = Math.floor((timeDifference % 3600000) / 60000);
        if(minutes < 10){
          minutes = `0${minutes}`;
        }
        let seconds = Math.floor((timeDifference % 60000) / 1000);
        if(seconds < 10){
          seconds = `0${seconds}`;
        }

        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      } else {
        setTimeLeft('00:00:00');
      }
    }

    // Calculate the time left initially
    calculateTimeLeft();

    // Update the time left every second
    const interval = setInterval(calculateTimeLeft, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const reCallAPI = (userId) => {
    if (data[0].userId == userId) {
      setData(null);
      setPreLoader(true);
      getData();
    }

    const updatedData = data.slice(0, -1); // x is the index to remove
    setData(updatedData);
  }

  useEffect(() => {
    Aos.init({ duration: 400 })
  }, []);

  const changeViewProfileIndex = (index) => {
    setViewProfile(index);
    let pop_N_times = data.length - index - 1;
    while (pop_N_times > 0) {
      data.pop();
      pop_N_times--;
    }
  }

  useEffect(() => {

    let config = {
      methid: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_URL + '/mydetails',
      withCredentials: true,

    }

    axios.request(config)
      .then((res) => {
        console.log("res", res);
        if (res.data.message === "User not exist") {
          localStorage.setItem('userEmail', res.data.data.email);
          localStorage.setItem('userName', res.data.data.name);
          // localStorage.setItem('userPassword', res.data.data.);

          navigate('/userdetails');
          return;
        }
        setMinAge(res.data.data.recommendationPreferences.ageRange.min);
        setMaxAge(res.data.data.recommendationPreferences.ageRange.max);
        setDistance(res.data.data.recommendationPreferences.radius);
        localStorage.setItem('DP', res.data.data.avatar);

        getData();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localforage.setItem('userLogin', { id: Date.now(), value: false });
          navigate('/login');
        }
      })

  }, [])

  const getData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_URL + '/home',
      withCredentials: true,
    };

    axios.request(config)
      .then((response) => {
        setData(response.data.userList.reverse());
        setPreLoader(false);
      })
      .catch((error) => {
        // console.log("errpr", error);
        //   if(error.response.status === 401){
        //     localforage.setItem('userLogin', {id: Date.now(), value: false});
        //     navigate('/login');
        // }
        if(error.response.status && error.response.status === 429){
          setLikeLimitExceed(true);
        }
      });
  }

  const savePreference = () => {

    let data = JSON.stringify({
      recommendationPreferences: {
        radius: parseInt(distance),
        ageRange: {
          min: minAge,
          max: maxAge
        }
      }
    });

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_URL + '/editProfile',
      withCredentials: true,
      data: data
    };

    axios.request(config)
      .then(() => {
        setShowPreferenceDiv(false);
        getData();
      }).catch((err) => {
        console.log("error in saving preference", err);
      })
  }

  const handleSwipeLeft = () => {
    if (imageIndex < (data[viewProfile].image.length - 1)) {
      setImageIndex(imageIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };


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
      // Swiped right
      handleSwipeRight();
    } else if (distance < 0) {
      // Swiped left
      handleSwipeLeft();
    }
  };



  return (
    <>
      {
        likeLimitExceed ?
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <div
          style={{
            background:
              'radial-gradient(circle, rgba(201,205,255,0.6) 0%, rgba(255,187,255,0.6) 100%)',
            padding: '25px',
            borderRadius: '15px',
            width: '80%',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            textAlign: 'center',
          }}
        >
          <h2>You can't like more today. You've hit your daily limit.</h2>
          <h3>Try after {timeLeft}</h3>
  
          <div
            className="continueBtn"
            style={{ marginTop: '15px', width: '95%' }}
            onClick={() => navigate('/subscription/gold')}
          >
            <h3 style={{ lineHeight: '45px' }}>Unlock now for just ₹99</h3>
          </div>
        </div>
      </div> :

          <>
            <img
              style={{ position: 'absolute', top: '15px', right: '30px', width: "30px" }}
              src={showPreferenceDiv ? blackClose : customize}
              onClick={() => setShowPreferenceDiv(!showPreferenceDiv)}
            />
            {
              showPreferenceDiv ?
                <div>

                  <div style={{ width: '85%', margin: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3>Age Range</h3>
                      <h3>{minAge} - {maxAge}</h3>
                    </div>
                    <RangeSlider
                      min={18}
                      max={40}
                      defaultValue={[minAge, maxAge]}
                      id="range-slider-red"
                      onInput={(e) => {
                        setMinAge(e[0]);
                        setMaxAge(e[1]);
                      }}
                    />
                  </div>


                  <div style={{ width: '85%', margin: 'auto', marginTop: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3>Distance Range</h3>
                      <h3>{distance}Km</h3>
                    </div>
                    <input
                      type="range"
                      defaultValue={distance}
                      min={1}
                      max={100}
                      onChange={(e) => setDistance(e.target.value)}
                      style={{ width: '100%' }}
                      id="range"

                      className="range-field"
                    />
                  </div>

                  <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '100px' }}>
                    <div onClick={() => savePreference()} style={{ display: 'inline-block' }}>
                      <ButtonComponent title="Save" loader={loader} />
                    </div>
                  </div>

                </div> : preLoader ? <img src={blackLoader} height="100px" style={{ marginTop: '30vh' }} /> :
                  <div 
                  // className="tinderCard_container"
                  >
                    {viewProfile !== -1 ?
                      // <div style={{display: 'flex'}}>
                      <div 
                      // className="detailProfileDiv "
                       >
                        {/* <SwipeDetector
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              /> */}
                        <img
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          style={{ touchAction: 'pan-y' }}
                          className="profileImages"
                          src={`${data[viewProfile].image[imageIndex]}`} 
                        />
                        <img
                          onClick={() => setViewProfile(-1)}
                          style={{ marginLeft: '-60px' }}
                          src={down}
                          width="60px"
                          data-aos="flip-down"
                        />
                        <div className="imageBarIndicator" style={{ width: '100%', marginTop: '-3px' }}>
                          {
                            data[viewProfile].image.map((item, index) => (
                              <div key={index} style={{ width: `${100 / data[viewProfile].image.length}%`, backgroundColor: `${index === imageIndex ? 'white' : 'gray'}` }} ></div>
                            ))
                          }
                        </div>

                        <h1 data-aos="zoom-out-down">{data[viewProfile].name}, {data[viewProfile].age}
                          {/* {data[viewProfile].verified && <img src={verified} width="30px" style={{marginTop: '7px', position: 'absolute'}} /> } */}
                        </h1>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>
                          <img style={{ marginLeft: '-40px', position: 'absolute' }} src={college} width="35px" />: {data[viewProfile].college}
                        </h3>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>
                          <img style={{ marginLeft: '-40px', position: 'absolute' }} src={city} width="35px" />: {data[viewProfile].city}
                        </h3>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>
                          <img style={{ marginLeft: '-40px', position: 'absolute' }} src={location} width="35px" />: {data[viewProfile].radius === 0 ? 1 : data[viewProfile].radius} Km
                        </h3>
                        {data[viewProfile].bio &&
                          <div>
                            <h3 style={{ textAlign: 'left', margin: '5px' }}>About Me</h3>
                            <p style={{ textAlign: 'Left', padding: '10px', backgroundColor: 'whitesmoke', fontSize: '20px' }}>{data[viewProfile].bio}</p>
                          </div>
                        }
                        <div>
                          <h3 style={{ textAlign: 'left', margin: '5px' }}>Interests</h3>
                          <div className='interestOptionDiv'>
                            {data[viewProfile].interest.map((item, index) => (
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
                          <div data-aos="fade-left" onClick={() => setViewProfile(-1)} style={{ border: '1px solid green', minWidth: '40%', minHeight: '40px', borderRadius: '10px', backgroundColor: 'green', color: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                            <h2 style={{ lineHeight: '5px' }}>LIKE</h2>
                          </div>
                        </div>

                        {/* </div> */}
                      </div> : 
                      data.length === 0 ?
                         <h4 style={{marginTop: '100px'}}>You've run out of people. Expand yoour age and distance preference to see more people.</h4>
                      :
                      data && data.map((person, index) => (
                        <UserCard
                          person={person}
                          z={index}
                          key={index}
                          reCallAPI={reCallAPI} 
                          changeLikeLimitExceedValue={changeLikeLimitExceedValue}
                          changeViewProfileIndex={() => changeViewProfileIndex(index)} 
                        />
                      ))

                      // data && data.map((person, index) =>
                      //   <ProfileCard 
                      //     reCallAPI={reCallAPI} 
                      //     changeLikeLimitExceedValue={changeLikeLimitExceedValue}
                      //     person={person} key={index} 
                      //     changeViewProfileIndex={() => changeViewProfileIndex(index)} 
                      //   />
                      // )
                    }
                  </div>
            }
          </>
      }

      {viewProfile === -1 &&
        <NavigationBar />
      }
    </>
  )
}

export default Home;