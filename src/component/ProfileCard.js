import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import back from '../assets/icons/back.png';
import next from  '../assets/icons/next.png';
import up from '../assets/icons/up.png';
import axios from 'axios';
import like from '../assets/icons/like.png';
import cross from '../assets/icons/cross.png';


const ProfileCard = (props) => {
    const [visible, setVisible] = useState(false);
    const likeProfile = (userId) => {
        let config ={
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
        })
    }
    const person = props.person;

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        console.log("person", imageIndex)
    }, [imageIndex])


    const swiped=(direction, person)=>{
        if(direction === 'right'){
            likeProfile(person.userId);
        }
        // console.log(`i'm in swiped`,nameToDelete, direction);
        // setLastDirection(direction);
    }
    
    const outOfFrame=(name)=>{
        console.log(`enough tinder today`);
        
    }

    const onSubmit = (name) => {
        console.log("User", name);
    }

    const changeImage = (direction) => {
        if(direction === "next" && imageIndex < (person.image.length-1)){
            setImageIndex(imageIndex + 1);
        }else if(direction === "back" && imageIndex > 0){
            setImageIndex(imageIndex - 1);
        }
    }


    return (
        <div 
            // onClick={onSubmit} 
            // onTouchStart={() => onSubmit(person.name)}
            style={{display: visible ? 'none': 'block'}}
        >
            <TinderCard
                
                className="swipe"
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, props.person)}
                onCardLeftScreen={() => outOfFrame(person.name)}
            >
                <div
                    className="card"
                    style={{
                        backgroundImage:
                        "url(https://w0.peakpx.com/wallpaper/227/122/HD-wallpaper-california-sunset-street-sunset-thumbnail.jpg)"
                    }}
                >
                    <div className="imageBarIndicator">
                        {
                            person.image.map((item, index) => (
                                <div key={index} style={{width: `${100/person.image.length}%`, backgroundColor: `${index === imageIndex ? 'white': 'gray'}`}} ></div>
                            ))
                            
                        }
                    </div>
                    <div  style={{display: 'flex', justifyContent: 'space-between', marginTop: '250px'}}>
                        <img onTouchStart={() => changeImage('back')} src={back} width="55px"/>
                        <img onTouchStart={() => changeImage('next')} src={next} width="55px"/>
                    </div>
                    <div className="personDiv">
                        <h1 className="personName">
                            {person.name}, {person.age}
                        </h1>
                        <h3 className="distance" style={{ color: "black" }}>
                            {person.radius === 0 ? 1 : person.radius} Km
                        </h3>
                        <img onTouchStart={() => props.changeViewProfileIndex(props.key)} className="upIcon" src={up} width="45px"/>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <div onTouchStart={() => setVisible(true)}>
                        <img src={cross} height="50px"/>
                    </div><div onTouchStart={() => {
                        likeProfile(person.userId);
                        setVisible(true);
                    }}>
                        <img src={like} height="50px"/>
                    </div>
                </div>
         
            </TinderCard>
        </div>
    )
}

export default ProfileCard;