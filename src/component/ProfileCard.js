import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import back from '../assets/icons/back.png';
import next from  '../assets/icons/next.png';
import up from '../assets/icons/up.png';

const ProfileCard = (props) => {
    const person = props.person;

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        console.log("person", imageIndex)
    }, [imageIndex])


    const swiped=(direction,nameToDelete)=>{
        console.log(`i'm in swiped`,nameToDelete, direction);
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
        >
            <TinderCard
                
                className="swipe"
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, person.name)}
                onCardLeftScreen={() => outOfFrame(person.name)}
            >
                <div
                    className="card"
                    style={{
                        backgroundImage:
                        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtS7dmYGlbT6up08GA0gSsRbSGbZ_gaCZ50w&usqp=CAU)"
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
                        <img onTouchStart={() => console.log("Up")} className="upIcon" src={up} width="45px"/>
                    </div>
                </div>
            </TinderCard>
        </div>
    )
}

export default ProfileCard;