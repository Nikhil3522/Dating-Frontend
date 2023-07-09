import { useState } from "react";
import axios from 'axios';
// import "./tinderCard.css"
import '../App.css';
import NavigationBar from "../component/NavigationBar";
import ProfileCard from "../component/ProfileCard";
import { useEffect } from "react";
import verified from '../assets/icons/verified.png';
import back from '../assets/icons/back.png';
import next from  '../assets/icons/next.png';
import college from '../assets/icons/college.png';
import city from '../assets/icons/city.png';
import down from '../assets/icons/down.png';
import SwipeDetector from "../component/SwipeDetector";
import React, { useRef } from 'react';
import location from '../assets/icons/location.png';


const Home = () => {

    const [data, setData] = useState(null);
    const [viewProfile, setViewProfile] = useState(-1);
    const [imageIndex, setImageIndex] = useState(0);

    const changeViewProfileIndex = (index) => {
      setViewProfile(index);
      let pop_N_times = data.length - index - 1;
      while(pop_N_times > 0){
        data.pop();
        pop_N_times--;
      }
    }

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/home',
            withCredentials: true,
          };
          
        axios.request(config)
          .then((response) => {
            setData(response.data.userList.reverse());
          })
          .catch((error) => {
            // console.log("errpr", error);
        });
    }, [])


    const handleSwipeLeft = () => {
      if( imageIndex < (data[viewProfile].image.length-1)){
        setImageIndex(imageIndex + 1);
      }
    };
  
    const handleSwipeRight = () => {
      if(imageIndex > 0){
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
        <div className="tinderCard_container">
          {viewProfile !== -1 ? 
          <div className="detailProfileDiv " >
            {/* <SwipeDetector
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            /> */}
            <img 
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
              className="profileImages" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtS7dmYGlbT6up08GA0gSsRbSGbZ_gaCZ50w&usqp=CAU"
            />
            <img
              onClick={() => setViewProfile(-1)} 
              style={{marginLeft: '-60px'}} 
              src={down} 
              width="60px"
            />
            <div className="imageBarIndicator" style={{ width: '100%', marginTop: '-3px'}}>
              {
                data[viewProfile].image.map((item, index) => (
                    <div key={index} style={{width: `${100/data[viewProfile].image.length}%`, backgroundColor: `${index === imageIndex ? 'white': 'gray'}`}} ></div>
                ))
              }
            </div> 
             
            <h1>{data[viewProfile].name}, {data[viewProfile].age}
             {/* {data[viewProfile].verified && <img src={verified} width="30px" style={{marginTop: '7px', position: 'absolute'}} /> } */}
            </h1>
            <h3 style={{textAlign: 'left', marginLeft: '50px'}}>
              <img style={{marginLeft:'-40px', position:'absolute'}} src={college} width="35px"/>: {data[viewProfile].college}
            </h3>
            <h3 style={{textAlign: 'left', marginLeft: '50px'}}>
              <img style={{marginLeft:'-40px', position:'absolute'}} src={city} width="35px"/>: {data[viewProfile].city}
            </h3>
            <h3 style={{textAlign: 'left', marginLeft: '50px'}}>
              <img style={{marginLeft:'-40px', position:'absolute'}} src={location} width="35px"/>: {data[viewProfile].radius === 0 ? 1 : data[viewProfile].radius} Km
            </h3>
            {data[viewProfile].bio &&
              <div>
                <h3 style={{textAlign: 'left', margin: '5px'}}>About Me</h3>
                <p style={{textAlign: 'Left', padding:'10px', backgroundColor: 'whitesmoke'}}>{data[viewProfile].bio}</p>
              </div>
            }
            <div>
              <h3 style={{textAlign: 'left', margin: '5px'}}>Interests</h3>
              <div className='interestOptionDiv'>
              {data[viewProfile].interest.map((item, index)=> (
                <div className="interestOptionBox">
                  <img src={item} width="30px" height="30px"/>
                  <p>{item}</p>
                </div>
              ))}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
              <div style={{border: '1px solid red', minWidth:'40%', minHeight: '40px', borderRadius: '10px', backgroundColor: 'red', color: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
                <h2 style={{lineHeight: '5px'}}>NOPE</h2>
              </div>
              <div style={{border: '1px solid green', minWidth:'40%', minHeight: '40px', borderRadius: '10px', backgroundColor: 'green', color: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
                <h2 style={{lineHeight: '5px'}}>LIKE</h2>
              </div>
            </div>

          </div> :
          
        data && data.map((person, index) =>
          <ProfileCard person={person} key={index} changeViewProfileIndex={() => changeViewProfileIndex(index)}/>
        )
      }
        </div>
        <NavigationBar />
      </>
    )
}

export default Home;