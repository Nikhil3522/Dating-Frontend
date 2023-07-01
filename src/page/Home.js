import { useState } from "react";
import axios from 'axios';
import TinderCard from "react-tinder-card";
// import "./tinderCard.css"
import '../App.css';

const Home = () => {

    const [data, setData] = useState({"userList":[{"userId":5,"name":"Sharddha","age":22,"my_basic":["Dog lover","Coder"],"image":["url1","url2"],"college":"Galgotias University","relationship_goals":"long term","languages":["Hindi","Engltish"],"gender":"F","interest":["I1","i2"],"city":"Greater Noida","radius":3},{"userId":8,"name":"Tripti","age":22,"my_basic":["Dog lover","coder"],"image":["url1","url2"],"college":"Galgotias University","relationship_goals":"long term","languages":["Hindi","Engltish"],"gender":"F","interest":["I1","i2","i3"],"city":"Greater Noida","radius":4},{"userId":9,"name":"Ankita","age":21,"my_basic":["Dog lover","coder"],"image":["url1","url2"],"college":"Galgotias University","relationship_goals":"long term","languages":["Hindi","Engltish"],"gender":"F","interest":["I1","i2","i3"],"city":"Greater Noida","radius":4},{"userId":21,"name":"Reshmi","age":21,"my_basic":["Dog lover","Bike lover"],"image":["url1","url2"],"college":"GL Bajaj","relationship_goals":"long term","languages":["Hindi","Engltish"],"gender":"F","interest":["I1","i2","i3"],"city":"Greater Noida","verified":false,"radius":3},{"userId":22,"name":"Sneha","age":21,"my_basic":["Dog lover","Bike lover"],"image":["url1","url2"],"college":"Galgotias University","relationship_goals":"long term","languages":["Hindi","Engltish"],"gender":"F","interest":["I1","i2","i3"],"city":"Greater Noida","verified":false,"radius":3},{"userId":40,"name":"Nikki","age":22,"my_basic":[],"image":["35.png",null,null,null,null,null],"college":"Galgotias College","relationship_goals":"long term","languages":["Hindi","Engltish"],"gender":"F","interest":["Video Games","Football","Guitar"],"city":"Noida","radius":6162}]});
    const [peoples,setPeople]=useState([
        {
          name:`Elon Musk`,
          url:`https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw=`
        },
        {
          name:`Jeff Bezos`,
          url:`https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM=`
        }
      ]);


    useState(() => {
        console.log("data ->", data);
    }, [data]);

    // useState(async () => {

    //     // try {
    //     //     const response = await axios.get('http://localhost:8000/home', { withCredentials: true });
    //     //     console.log("afsd", response.data); // Response from the protected endpoint
    //     //   } catch (error) {
    //     //     console.error(error);
    //     //   }


    //     let config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: 'http://localhost:8000/home',
    //         withCredentials: true,
            
    //       };
          
    //     await axios.request(config)
    //       .then((response) => {
    //         setData(response);
    //         console.log("sfda",JSON.stringify(response.data));
    //       })
    //       .catch((error) => {
    //         console.log("errpr", error);
    //     });
    // }, [])

    const swiped=(direction,nameToDelete)=>{
        console.log(`i'm in swiped`,nameToDelete, direction);
        // setLastDirection(direction);
    }
    
    const outOfFrame=(name)=>{
        console.log(`enough tinder today`);
        
    }

    const onSubmit = () => {
        console.log("User");
    }

    return (
<div className="tinderCard_container">
{data.userList.map((person, index) =>
  <div 
    // onClick={onSubmit} 
    onTouchStart={onSubmit}
    key={index}
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
          "url(https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&q=80)"
      }}
    >
      <div className="personDiv">
        <h1 className="personName">
          {person.name}, {person.age}
        </h1>
        <h3 className="distance" style={{ color: "black" }}>
          {person.radius} Km
        </h3>
      </div>
    </div>
  </TinderCard>
</div>
)}
</div>
    )
}

export default Home;