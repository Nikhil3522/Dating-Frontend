import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ButtonComponent from "../component/ButtonComponent";
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
// import { ColourOption, colourOptions } from '../data';
import Select, { StylesConfig } from 'react-select';
import shopping from '../assets/images/shopping.png';
import art from '../assets/images/art.png';
import football from '../assets/images/football.png';
import music from '../assets/images/music.png';
import run from '../assets/images/run.png';
import back from '../assets/images/back.png';

const ProfileEdit = () => {
    const [data , setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState([]);
    const [flatDivDisplay, setFloatDivDisplay] = useState(false);
    const [state, setState] = useState(1);

    const LanguageOptions = [
        { value: 'Hindi', label: 'Hindi' },
        { value: 'English', label: 'English' },
        { value: 'Maithili', label: 'Maithili' },
        { value: 'Punjabi', label: 'Punjabi' },
        { value: 'Tamil', label: 'Tamil' },
        { value: 'Bengali', label: 'Bengali' },
        { value: 'Bhojpuri', label: 'Bhojpuri' },
        { value: 'Marathi', label: 'Marathi' },
        { value: 'Nepali', label: 'Nepali' },
        { value: 'French', label: 'French' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'Italian', label: 'Italian' },
        { value: 'Arabic', label: 'Arabic' },
    ];

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

    const changeRG = (value) => {
        var tempData = {...data};
        tempData.relationship_goals = value;
        setData(tempData);
        setFloatDivDisplay(false);
    }

    useState(async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/myDetails',
            withCredentials: true,
            
          };
          
        await axios.request(config)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log("errpr", error);
        });
    }, []);

    useEffect(() => {
        console.log("Data", data);
    }, [data]);

    const toggleInterest = (title) => {
        var tempData = {...data};
          
        if (data.interest.includes(title)) {
            tempData.interest = tempData.interest.filter(item => item !== title);
            setData(tempData);
        } else if(data.interest.length <5 ){
            tempData.interest.push(title);
            setData(tempData); 
        } 
        
    };

    const editCity = (cityName) => {
        var tempData = { ...data };
        tempData.city = cityName;
        setData(tempData);
    }

    return (
        <>
        {data && 
            <>{state === 1 ?
                <div>
                    Profile Edit

                    <div className='imageContainer'>
                        <div className='imageBox'>
                            {selectedImage[4] ? (
                                <img src={URL.createObjectURL(selectedImage[4])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                    />
                                    </label>
                            )}
                        </div>
                        <div className='imageBox'>
                            {selectedImage[4] ? (
                                <img src={URL.createObjectURL(selectedImage[4])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                    />
                                    </label>
                            )}
                        </div>
                        <div className='imageBox'>
                            {selectedImage[4] ? (
                                <img src={URL.createObjectURL(selectedImage[4])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                    />
                                    </label>
                            )}
                        </div>
                        <div className='imageBox'>
                            {selectedImage[4] ? (
                                <img src={URL.createObjectURL(selectedImage[4])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                    />
                                    </label>
                            )}
                        </div>
                        <div className='imageBox'>
                            {selectedImage[4] ? (
                                <img src={URL.createObjectURL(selectedImage[4])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                    />
                                    </label>
                            )}
                        </div>
                        <div className='imageBox'>
                            {selectedImage[4] ? (
                                <img src={URL.createObjectURL(selectedImage[4])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                    />
                                    </label>
                            )}
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <h3>About Me</h3>
                        <textarea style={{width: '90%', padding: '5px', fontSize: '20px'}} rows={8}>
                        </textarea>
                    </div>
                    <div className="inputDiv">
                        <p className="inputTitle" style={{"width": "30px"}}>City</p>
                        <input 
                            type="text"
                            // min={18}
                            className="inputField"
                            value={data.city}
                            onChange={(e) => editCity(e.target.value)}
                        />
                    </div>
                    <div className="inputDiv">
                        <p className="inputTitle" style={{"width": "50px"}}>College</p>
                        <input 
                            type="text"
                            // min={18}
                            className="inputField"
                            value={data ? data.college : ''}
                            // onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto'}}>
                            <h3>Interests</h3>
                            <p style={{color: 'blue'}} onClick={() => setState(2)}>Edit</p>
                        </div>
                        <div style={{ margin: 'auto', minHeight: '100px', borderRadius: '12px', display:'flex', flexWrap: 'wrap', width: '80%'}}>
                            {data.interest.map((item, index) => (
                                <div key={index} className="interestOptionBox" >
                                    {/* <img width="30px" height="30px"/> */}
                                    <p>{item}</p>
                                </div>
                            ))}
                        
                        </div>
                    </div>
                    

                    <div className="inputDiv" onClick={() => setFloatDivDisplay(true)}>
                        <p className="inputTitle" style={{width: "130px", zIndex: '0'}}>Relationship Goal</p>
                        <input 
                            type="text"
                            // min={18}
                            className="inputField"
                            value={data ? data.relationship_goals : ''}
                            // onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="inputDiv" style={{border: 'transparent',maxHeight: '50px',borderRadius: '10px'}}>
                    <p className="inputTitle" style={{"width": "75px",}}>Languages</p>
                        <Select
                            closeMenuOnSelect={false}
                            // defaultValue={[LanguageOptions[0], LanguageOptions[1]]}
                            isMulti
                            options={LanguageOptions}
                            onChange={(e) => console.log(e)}
                        />
                    </div>

                    <div style={{marginTop: '50px', marginBottom: '50px'}}>
                        <ButtonComponent title="Save"/>
                    </div>

                    
                    
                    
                </div> : 
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <img onClick={() => setState(1)} src={back} width="35px" height="35px" style={{marginTop: '25px'}} />
                        <h1>Your Interests <span style={{fontSize: '20px'}}>{data.interest.length}/5</span></h1>
                    </div>
                    
                    <div className='interestOptionDiv'>
                        {
                            interests.map((item, index) => (
                                <div key={index} className={data.interest.includes(item.title) ? 'selectIntOptionBox' :'interestOptionBox' } onClick={() => {toggleInterest(item.title); setState(state + 1)}}>
                                    <img src={item.img} width="30px" height="30px"/>
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div style={{marginTop: '50px', marginBottom: '50px'}} onClick={() => setState(1)}>
                        <ButtonComponent title="Next"/>
                    </div>
            </div>}
            </>
        }

        <div className="floatDiv" style={{display: flatDivDisplay ? 'block': 'none'}}>
            <h3>I am Looking For</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                <div className="floatDiv-subcontainer" onClick={() => changeRG("Long-term partner")}>
                    <h4>Long-term partner</h4>
                </div>
                <div className="floatDiv-subcontainer" onClick={() => changeRG("Short-term, open to long")}>
                    <h4>Short-term, open to long</h4>
                </div>
                <div className="floatDiv-subcontainer" onClick={() => changeRG("Long-term, open to short")}>
                    <h4>Long-term, open to short</h4>
                </div>
                <div className="floatDiv-subcontainer" onClick={() => changeRG("Short-term fun")}>
                    <h4>Short-term fun</h4>
                </div>
                <div className="floatDiv-subcontainer" onClick={() => changeRG("New friends")}>
                    <h4>New friends</h4>
                </div>
                <div className="floatDiv-subcontainer" onClick={() => changeRG("Still figuring it out")}>
                    <h4>Still figuring it out</h4>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileEdit;