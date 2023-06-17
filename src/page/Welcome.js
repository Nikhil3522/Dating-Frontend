import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonComponent from "../component/ButtonComponent";
import Banner from '../assets/images/banner1.png';
import Aos from "aos";
import "aos/dist/aos.css";

function Welcome(){
  const navigate = useNavigate();
  
  useEffect(() => {
    Aos.init({duration: 600})
  }, []);

    return(
        <div>
          <img src={Banner} width="300px" data-aos="zoom-in-up"/>
          <div data-aos="fade-left" onClick={() => navigate('/login')}>
            <ButtonComponent 
              title="LOGIN"
            />
          </div>

          <div data-aos="fade-right" onClick={() => navigate('/signup')}>
            <ButtonComponent 
              title="SIGN UP"
            />
          </div>
        </div>
    )
}

export default Welcome;