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
import axios from 'axios';

const UserDetails = () => {
    const [state, setState] = useState(1);
    const [alert, setAlert] = useState("");
    const [gender, setGender] = useState(null);
    const [interest, setInterest] = useState([]);
    const [college, setCollege] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState('');
    const [selectedImage, setSelectedImage] = useState([null, null, null, null, null, null]);
    const [age, setAge] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [name, setName]= useState("");
    const [password, setPassword]= useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setTimeout(() =>{
            setAlert("");
        }, 7000)
    }, [alert])

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        const updatedSelectedImage = [...selectedImage];
        // updatedSelectedImage[index] = URL.createObjectURL(file);
        updatedSelectedImage[index] = file;
        setSelectedImage(updatedSelectedImage);
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        const userPassword = localStorage.getItem('userPassword');

        setUserEmail(userEmail);
        setName(userName);
        setPassword(userPassword);
        // localStorage.removeItem('userEmail');
    }, [])

    useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.error('Error getting user location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }, []);
    
      useEffect(() => {
        // Reverse geocoding to get city name
        if (latitude && longitude) {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
          fetch(url)
            .then(response => response.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || '';
              setCity(city);
            })
            .catch(error => {
              console.error('Error retrieving city name:', error);
            });
        }
      }, [latitude, longitude]);

    useEffect(() => {
        Aos.init({duration: 600})
    }, []);

    const onSubmit = async () => {

        if(state <= 2){
            setState(state + 1);
        }else if(state == 3){
            setLoader(true);
            for(let i=0; i<6; i++){

                if( selectedImage[i]){
                    const formData = new FormData();
                    formData.append('image', selectedImage[i]);

                    await fetch(process.env.REACT_APP_API_URL + '/imageUpload',{
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                        .then(data => {
                        // Handle the response data
                        const imageName = data.image;
                        // Update the element with the image name in selectedImage array
                        selectedImage[i] = imageName;
                        })
                    .catch(error => {
                        console.error(error);
                    });
                }
            }
              
            setTimeout(()=>{
                saveData();
            }, 1000);
            
        }
    }

    const saveData = () => {
        axios.post(process.env.REACT_APP_API_URL + '/signup2',{
            "password": password,
            "email": userEmail,
            "name": name,
            "age": age,
            "image": selectedImage,
            "avatar": `${selectedImage[0]}`,
            "college": college,
            "relationship_goals": "long term",
            "languages": ["Hindi", "Engltish"],
            "gender": gender,
            "interest": interest,
            "city": city,
            "location" :{
                "long": longitude,
                "lat": latitude
            },
            "permission": 1
        }).then(response => {
            // console.log(response.data);
        }).catch(error => {
            console.error(error);
        });
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
            {
                state === 1 ?
                    <div>
                        <div>
                            <h1>I am a {userEmail}</h1>

                                <div className={ gender !== 'M' ? `optionBox` : `selectOption`} onClick={() => setGender("M")}>
                                    <p>Man</p>
                                </div>

                                <div className={ gender !== 'F' ? `optionBox` : `selectOption`} onClick={() => setGender("F")}>
                                    <p>Women</p>
                                </div>
            
                        </div>

                        <div className="inputDiv">
                            <p className="inputTitle" style={{"width": "30px"}}>Age</p>
                            <input 
                                type="number"
                                min={18}
                                className="inputField"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>

                        <div className="inputDiv">
                            <p className="inputTitle" style={{"width": "50px"}}>College</p>
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
                    <div>
                    <div className='imageContainer'>
                        <div className='imageBox'>
                            {selectedImage[0] ? (
                                <img src={URL.createObjectURL(selectedImage[0])} alt="Selected" width="130px"/>
                            ) : (
                                
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 0)}
                                    />
                                    </label>
                                
                            )}
                        </div>

                        <div className='imageBox'>
                            {selectedImage[1] ? (
                                <img src={URL.createObjectURL(selectedImage[1])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 1)}
                                    />
                                    </label>
                            )}
                        </div>

                        <div className='imageBox'>
                            {selectedImage[2] ? (
                                <img src={URL.createObjectURL(selectedImage[2])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 2)}
                                    />
                                    </label>
                            )}
                        </div>

                        <div className='imageBox'>
                            {selectedImage[3] ? (
                                <img src={URL.createObjectURL(selectedImage[3])} alt="Selected" width="130px"/>
                            ) : (
                                
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 3)}
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
                                        onChange={(e) => handleImageChange(e, 4)}
                                    />
                                    </label>
                            )}
                        </div>

                        <div className='imageBox'>
                            {selectedImage[5] ? (
                                <img src={URL.createObjectURL(selectedImage[5])} alt="Selected" width="130px"/>
                            ) : (
                                    <label htmlFor="imageUpload">
                                    <span className='plusIcon'>+</span>
                                    <input
                                        style={{display: 'none'}}
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 5)}
                                    />
                                    </label>
                            )}
                        </div>
            
                            </div>
                        
                    </div>
                </div> :
                null
            }

            <p className="errorBox">{alert}</p>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div onClick={() => onSubmit()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="Next" loader={loader}/>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;