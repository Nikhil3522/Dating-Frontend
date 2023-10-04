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
import { useNavigate } from 'react-router-dom';
import localForage from 'localforage';

const UserDetails = () => {
    const navigate = useNavigate();

    const [state, setState] = useState(1);
    const [alert, setAlert] = useState("");
    const [gender, setGender] = useState(null);
    const [interest, setInterest] = useState([]);
    const [college, setCollege] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState('');
    const [selectedImage, setSelectedImage] = useState([]);
    const [age, setAge] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [name, setName]= useState("");
    const [password, setPassword]= useState("");
    const [loader, setLoader] = useState(false);
    const [tempCollege, setTempCollege] = useState(null);

    useEffect(() => {
        setTimeout(() =>{
            setAlert("");
        }, 7000)
    }, [alert])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const updatedSelectedImage = [...selectedImage, file];
        setSelectedImage(updatedSelectedImage);
    }

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        const userPassword = localStorage.getItem('userPassword');

        setUserEmail(userEmail);
        setName(userName);
        setPassword(userPassword);
        // localStorage.removeItem('userEmail');
    }, [])

    const login = async () => {
        let data = JSON.stringify({
            "email": userEmail,
            "password": password
        });

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/login',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        axios.request(config)
        .then(async (response) => {
            console.log("response", response.data.message);
            if(response.data.message === "User LoggedIN!"){
                await localForage.setItem('userLogin', {id: Date.now(), value: true});
                navigate('/home');
            }else if(response.data.message === "Wrong Email or Passwod!" ){
                setAlert("Wrong Email or Password");
            }else{
                setAlert("Something went wrong! Please try again after sometime.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

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
            if(state === 1){
                if(!gender){
                    setAlert("Please choose your gender.")
                    return;
                }else if(!age){
                    setAlert("Please enter your age.");
                    return;
                }else if(!college){
                    setAlert("Please choose your college/university.");
                    return;
                }else if( college === "Others" && tempCollege === null){
                    setAlert("Please Enter your college/University Name.");
                    return;
                }
            }else if(state === 2){
                if(interest.length < 2){
                    setAlert("Please choose at least 2 Interests.");
                    return;
                }
            }

            setState(state + 1);
        }else if(state == 3){
            const imageLength = selectedImage.length;
            if(imageLength < 1){
                setAlert("Please upload at least 1 image.");
                return;
            }

            setLoader(true);
            for(let i=0; i<imageLength; i++){

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
            "bio": "Hello",
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
            "recommendationPreferences": {
                "ageRange": {
                    "min": 18,
                    "max": 24
                },
                "radius": 50
            },
            "permission": 1
        }).then(response => {
            if(password !== ""){
                login();
            }else{
                navigate('/login');
            }
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
                            <h1>I am </h1>

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
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>

                        {
                            college === "Others" ? 
                            <div className="inputDiv">
                                <p className="inputTitle" style={{"width": "50px"}}>College</p>
                                <input 
                                    type="text"
                                    className="inputField"
                                    value={tempCollege}
                                    onChange={(e) => {
                                        setTempCollege(e.target.value)
                                        console.log("college", tempCollege)
                                    }}
                                />
                            </div>
                            :
                            <div className="inputDiv">
                                <p className="inputTitle" style={{"width": "50px"}}>College</p>
                                <select 
                                    type="select"
                                    className="inputField"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                >
                                    <option>Select</option>
                                    <option value="Galgotias University">Galgotias University</option>
                                    <option value="Galgotias College">Galgotias College</option>
                                    <option value="GL Bajaj">GL Bajaj</option>
                                    <option value="IIMT">IIMT</option>
                                    <option value="GNIOT">GNIOT</option>
                                    <option value="Shardha University">Shardha University</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        }
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