import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonComponent from "../component/ButtonComponent";
import Banner from '../assets/images/banner1.png';
import Aos from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from 'react-type-animation';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('welcomePage', true);
    Aos.init({ duration: 600 })
  }, []);

  const quotes = [
    'A college romance waiting to happen.',
    5000,
    'Finding love in the college journey.',
    3000,
    'Love in the quad, romance in the classroom.',
    3000,
    'Every student deserves a love story.',
    3000,
    'College: Where new chapters begin, and love stories unfold.',
    3000
  ]

  return (
    <div style={{paddingBottom: '200px'}}>
      <div style={{ position: 'relative', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(283deg, rgba(255,91,61,1) 0%, rgba(253,45,114,1) 83%)', color: 'white' }}>
        {/* <img src={Banner} width="300px" data-aos="zoom-in-up"/> */}

        <div style={{ minHeight: '30vh', paddingLeft: '20px', paddingRight: '20px' }}>
          <TypeAnimation
            sequence={quotes}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
            cursor={false}
          />
        </div>

        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          overflow: 'hidden',
          lineHeight: '0',
        }} className="custom-shape-divider-bottom-1698422533">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path style={{ fill: 'white' }} d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          </svg>
        </div>

      </div>
      <div data-aos="fade-left" onClick={() => {
        localStorage.setItem('welcomePage', false);
        navigate('/login')
      }}>
        <ButtonComponent
          title="LOGIN"
        />
      </div>

      <div data-aos="fade-right" onClick={() => {
        localStorage.setItem('welcomePage', false);
        navigate('/signup')
      }}>
        <ButtonComponent
          title="SIGN UP"
        />
      </div>
    </div>
  )
}

export default Welcome;