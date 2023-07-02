import { useState } from "react";
import axios from 'axios';
// import "./tinderCard.css"
import '../App.css';
import NavigationBar from "../component/NavigationBar";
import ProfileCard from "../component/ProfileCard";

const Home = () => {

    const [data, setData] = useState(null);

    useState(async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/home',
            withCredentials: true,
            
          };
          
        await axios.request(config)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log("errpr", error);
        });
    }, [])



    return (
        <>
<div className="tinderCard_container">
{data && data.userList.map((person, index) =>
  <ProfileCard person={person} key={index}/>
)}
</div>
<NavigationBar />
</>
    )
}

export default Home;