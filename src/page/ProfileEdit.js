import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ButtonComponent from "../component/ButtonComponent";
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
// import { ColourOption, colourOptions } from '../data';
import Select, { StylesConfig } from 'react-select';

const ProfileEdit = () => {
    const [data , setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState([]);
    const [flatDivDisplay, setFloatDivDisplay] = useState(false);

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

    const changeRG = (value) => {
        var tempData = data;
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
    return (
        <>
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
                    value={data ? data.city : ''}
                    // onChange={(e) => setAge(e.target.value)}
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
            <div>
                <h3>Interests</h3>
            </div>
            <div>
            </div>
            <div className="inputDiv" style={{border: 'transparent',maxHeight: '50px',borderRadius: '10px'}}>
            <p className="inputTitle" style={{"width": "75px",}}>Languages</p>
                <Select
                    closeMenuOnSelect={false}
                    // defaultValue={[LanguageOptions[0], LanguageOptions[1]]}
                    isMulti
                    options={LanguageOptions}
                    
                />
            </div>

            <div className="inputDiv" onClick={() => setFloatDivDisplay(true)}>
                <p className="inputTitle" style={{"width": "130px"}}>Relationship Goal</p>
                <input 
                    type="text"
                    // min={18}
                    className="inputField"
                    value={data ? data.relationship_goals : ''}
                    // onChange={(e) => setAge(e.target.value)}
                />
            </div>

            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <ButtonComponent title="Save"/>
            </div>

            
            
            
        </div>

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