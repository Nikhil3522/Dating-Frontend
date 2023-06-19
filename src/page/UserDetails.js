import {useState, useEffect} from 'react';
import ButtonComponent from '../component/ButtonComponent'
import Aos from "aos";
import "aos/dist/aos.css";
import backLogo from '../assets/images/back.png';
import shopping from '../assets/images/shopping.png';
import art from '../assets/images/art.png';
import football from '../assets/images/football.png';
import music from '../assets/images/music.png';
import run from '../assets/images/run.png';

const UserDetails = () => {
    const [state, setState] = useState(1);
    const [alert, setAlert] = useState("");
    const [gender, setGender] = useState(null);
    const [interest, setInterest] = useState([]);
    const [college, setCollege] = useState(null);

    useEffect(() => {
        console.log("gender", college);
    }, [college])

    useEffect(() => {
        Aos.init({duration: 600})
    }, []);

    const onSubmit = () => {
        console.log("fsa");
    }

    const toggleInterest = (title) => {
        
            if (interest.includes(title)) {
                setInterest(interest.filter(item => item !== title));
            } else if(interest.length <5 ){
                setInterest([...interest, title]);
            }
        
    };

    const interests = [
        {title: "Shopping", img: shopping},
        {title: "Run", img: run},
        {title: "Video Games", img: run},
        {title: "Yoga", img: run},
        {title: "Music", img: music},
        {title: "Art", img: art},
        {title: "Cricket", img: run},
        {title: "Football", img: football},
        {title: "Drink", img: run},
        {title: "Vlogging", img: run},
        {title: "Guitar", img: run},
        {title: "Photography", img: run},
        {title: "Meditation", img: run},
        {title: "Tennis", img: run},
        {title: "Volleyball", img: run},
        {title: "Gym", img: run},
        {title: "Golf", img: run},
        {title: "Basketball", img: run},
        {title: "Roadtrip", img: run},
        {title: "Running", img: run},
    ]

    return(
        <div>
            <div style={{width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginTop: '-15px'}}>
                <div onClick={() => setState(state - 1)}>
                    <img src={backLogo} width="40px"/>
                </div>
                <div style={{display: 'none'}}>
                    <h3 style={{marginTop: '5px', color: 'rgb(255,91,61)'}}>Skip</h3>
                </div>
            </div>
            User details
            {
                state === 1 ?
                    <div>
                        <div>
                            <h1>I am a </h1>

                                <div className={ gender !== 'M' ? `optionBox` : `selectOption`} onClick={() => setGender("M")}>
                                    <p>Man</p>
                                </div>

                                <div className={ gender !== 'F' ? `optionBox` : `selectOption`} onClick={() => setGender("F")}>
                                    <p>Women</p>
                                </div>
            
                        </div>

                        <div className="inputDiv">
                            <p className="inputTitle" style={{"width": "110px"}}>Date of Birth</p>
                            <input 
                                type="date"
                                className="inputField"
                                // onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="inputDiv">
                            <p className="inputTitle" style={{"width": "110px"}}>College</p>
                            <select 
                                type="select"
                                className="inputField"
                                onChange={(e) => setCollege(e.target.value)}
                            >
                                <option value="Galgotias University">Galgotias University</option>
                                <option value="Galgotias College">Galgotias College</option>
                                <option value="GL Bajaj">GL Bajaj</option>
                                <option value="IIMT">IIMT</option>
                                <option value="GNIOT">GNIOT</option>
                                <option value="Shardha University">Shardha University</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                : state === 2 ?
                <div>
                    <h1>Your Interests <span style={{fontSize: '20px'}}>{interest.length}/5</span></h1>
                    <div className='interestOptionDiv'>
                        {
                            interests.map((item, index) => (
                                <div key={index} className={interest.includes(item.title) ? 'selectIntOptionBox' :'interestOptionBox' } onClick={() => toggleInterest(item.title)}>
                                    <img src={item.img} width="30px" height="30px"/>
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div> :
                state === 3 ? 
                <div>
                    <div className="inputDiv">
                        <p className="inputTitle" style={{"width": "40px"}}>City</p>
                        <input 
                            type="text"
                            className="inputField"
                            // onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div> :
                null
            }

            <p className="errorBox">{alert}</p>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div data-aos="zoom-in-up" onClick={() => setState(state + 1)} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Next" />
                </div>
            </div>
        </div>
    )
}

export default UserDetails;