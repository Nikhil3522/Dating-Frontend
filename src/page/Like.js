import { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import axios from 'axios';
import { useState } from "react";
import '../LikePage.css';
import LikeRequestProfile from "../component/LikeRequestProfile";

const Like = () => {
    const [like, setLike] = useState([]);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/mydetails',
            withCredentials: true,
            
          };
          
        axios.request(config)
          .then((response) => {
            setLike(response.data.data.like)
          })
          .catch((error) => {
            console.log("errpr", error);
        });
    }, []);



    return (
        <div>
            <div className="likeContainer">
                {like.map((item, index) => (
                    <LikeRequestProfile key={index} profileId={item}/>
                ))}
            </div>
            <NavigationBar />
        </div>
    )
}

export default Like;