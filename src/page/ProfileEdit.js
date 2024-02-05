import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ButtonComponent from "../component/ButtonComponent";
import makeAnimated from 'react-select/animated';
import chroma, { average } from 'chroma-js';
// import { ColourOption, colourOptions } from '../data';
import Select, { StylesConfig } from 'react-select';
import shopping from '../assets/images/shopping.png';
import art from '../assets/images/art.png';
import football from '../assets/images/football.png';
import music from '../assets/images/music.png';
import run from '../assets/images/run.png';
import back from '../assets/images/back.png';
import videoGame from '../assets/images/videoGame.png';
import yoga from '../assets/images/yoga.png';
import volleyball from '../assets/images/volleyball.png';
import vlogging from '../assets/images/vlogging.png';
import tennis from '../assets/images/tennis.png';
import roadTrip from '../assets/images/roadTrip.png';
import cricket from '../assets/images/cricket.png';
import drink from '../assets/images/drink.png';
import guitar from '../assets/images/guitar.png';
import photography from '../assets/images/photography.png';
import meditation from '../assets/images/meditation.png';
import gym from '../assets/images/gym.png';
import golf from '../assets/images/golf.png';
import basketball from '../assets/images/basketball.png';
import cross from '../assets/icons/cross.png';
import { config } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import storage from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

const ProfileEdit = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState([]);
    const [flatDivDisplay, setFloatDivDisplay] = useState(false);
    const [state, setState] = useState(1);
    const [about, setAbout] = useState('');
    const [defaultValueLanguage, setDefaultValueLanguage] = useState([]);
    const [loader, setLoader] = useState(false);
    const [imageLength, setImageLength] = useState(0);

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
        { title: "Shopping", img: shopping },
        { title: "Run", img: run },
        // { title: "Video Games", img: videoGame },
        { title: "Yoga", img: yoga },
        { title: "Music", img: music },
        { title: "Art", img: art },
        { title: "Cricket", img: cricket },
        { title: "Football", img: football },
        { title: "Drink", img: drink },
        { title: "Vlogging", img: vlogging },
        { title: "Guitar", img: guitar },
        { title: "Photography", img: photography },
        { title: "Meditation", img: meditation },
        { title: "Tennis", img: tennis },
        { title: "Volleyball", img: volleyball },
        { title: "Gym", img: gym },
        { title: "Golf", img: golf },
        { title: "Basketball", img: basketball },
        // { title: "Roadtrip", img: roadTrip },
        // { title: "Running", img: run },
    ]

    const optimizedImage = (mydata) => {
        if(mydata.image.length > 0){
            const updatedProfiles = mydata.image.map((profile) => {
                let originalUrl = profile;
                let modifiedUrl = originalUrl.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/dateuni/tr:w-300");
                return modifiedUrl;
            });
            setData({...mydata, image: updatedProfiles});
        }
    }

    useState(async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/myDetails',
            withCredentials: true,

        };

        await axios.request(config)
            .then((response) => {
                optimizedImage(response.data.data)
                setImageLength(response.data.data.image.length);
                var temp = [];

                response.data.data.languages.map((item) => {
                    temp.push({ value: item, label: item })
                });

                setDefaultValueLanguage(temp);
            })
            .catch((error) => {
                console.log("errpr", error);
                if(error.response.status === 401){
                    localforage.setItem('userLogin', {id: Date.now(), value: false});
                    navigate('/login');
                }
            });
    }, []);

    const handleImageChange = (event) => {

        const input = event.target;
        const fileName = input.value;
        const fileNameExt = fileName.substr(fileName.lastIndexOf('.')+1);

        if(fileNameExt === "HEIC" || fileNameExt === "heic" || fileNameExt === "HEIF" || fileNameExt === "heif"){
            const blob = input.files[0];

            heic2any({
                blob: blob,
                toType: 'image/jpg',
            })
            .then((resultBlob) => {
                var updatedSelectedImage = [...selectedImage, resultBlob];
                setSelectedImage(updatedSelectedImage);
                handleUpload(resultBlob);
            })
        }else{
            const file = input.files[0];
            var updatedSelectedImage2 = [...selectedImage, file];
            setSelectedImage(updatedSelectedImage2);
            handleUpload(file);
        }
    }

    // Edit Relationship goal value
    const changeRG = (value) => {
        var tempData = { ...data };
        tempData.relationship_goals = value;
        setData(tempData);
        setFloatDivDisplay(false);
    }

    const toggleInterest = (title) => {
        var tempData = { ...data };

        if (data.interest.includes(title)) {
            tempData.interest = tempData.interest.filter(item => item !== title);
            setData(tempData);
        } else if (data.interest.length < 5) {
            tempData.interest.push(title);
            setData(tempData);
        }

    };

    const editCity = (cityName) => {
        var tempData = { ...data };
        tempData.city = cityName;
        setData(tempData);
    }

    const editLanguages = (language) => {

        var tempLan;
        tempLan = language.map((item) => item.value);

        var tempData = { ...data };
        tempData.languages = tempLan;
        setData(tempData);

    }

    const editAbout = (about) => {
        var tempData = { ...data };
        // tempData
        tempData.bio = about;
        setData(tempData);
    }

    const handleUpload = async (fileinput) => {

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }

        imageCompression(fileinput, options)
        .then(function (compressedFile) {
            fileinput = compressedFile;
            
            return new Promise((resolve, reject) => {
                if (!fileinput) {
                    reject(new Error("Please upload an image first!"));
                    return;
                }
                
                const storageRef = ref(storage, `/dateuni-image/${fileinput.name}`);
                const uploadTask = uploadBytesResumable(storageRef, fileinput);
                
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        
                        console.log("percent", percent);
                    },
                    (err) => {
                        console.error(err);
                        reject(err);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((url) => {
                                setData({...data, image:[...data.image, url]})
                                var tempData = {...data, image:[...data.image, url]}

                                let config = {
                                    method: "POST",
                                    maxBodyLength: Infinity,
                                    url: process.env.REACT_APP_API_URL + '/editProfile2',
                                    withCredentials: true,
                                    data: tempData,
                                }
                                axios.request(config).then(response => {
                                    // navigate('/profile')
                                    // console.log("res", response.data);
                                }).catch(error => {
                                    setLoader(false);
                                    console.error("error", error);
                                });
                                resolve(url);
                            })
                            .catch((error) => {
                                console.error(error);
                                reject(error);
                            });
                    }
                );
            });
        })
        .catch(function (error) {
            console.log(error.message);
        });
    };

    const onSubmit = async () => {

        // const imageLength = selectedImage.length;
        // if (imageLength < 1) {
        //     // setAlert("Please upload at least 1 image.");
        //     console.log("PLease upload at least 1 image.")
        //     return;
        // }

        setLoader(true);
        // for (let i = 0; i < imageLength; i++) {

        //     if (selectedImage[i]) {
        //         const formData = new FormData();
        //         formData.append('image', selectedImage[i]);

        //         await fetch(process.env.REACT_APP_API_URL + '/imageUpload', {
        //             method: 'POST',
        //             body: formData
        //         })
        //             .then(response => response.json())
        //             .then(data => {
        //                 // Handle the response data
        //                 const imageName = data.image;
        //                 // Update the element with the image name in selectedImage array
        //                 selectedImage[i] = imageName;
        //             })
        //             .catch(error => {
        //                 console.error(error);
        //             });
        //     }
        // }

            saveData();
    }


 

    const saveData = () => {
        var tempData = {...data};

        let config = {
            method: "POST",
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/editProfile2',
            withCredentials: true,
            data: tempData,
        }
        axios.request(config).then(response => {
            navigate('/profile')
            // console.log("res", response.data);
        }).catch(error => {
            setLoader(false);
            console.error("error", error);
        });
    }

    const deleteImage = async (selectedImageIndex) => {
        // // Create a reference to the file to delete
        // const desertRef = ref(storage, 'dateuni-image/1292603.jpg');

        // // Delete the file
        // deleteObject(desertRef).then(() => {
        // // File deleted successfully
        // }).catch((error) => {
        // // Uh-oh, an error occurred!
        // })

        // console.log("image name", data.image[selectedImageIndex])

        // try {
        //     // Parse the URL to extract the path
        //     const urlParts = new URL(data.image[selectedImageIndex]);
        //     const filePath = decodeURIComponent(urlParts.pathname);
    
        //     // Create a storage reference
        //     const fileRef = ref(storage, filePath);
    
        //     // Delete the file
        //     await deleteObject(fileRef);
    
        //     console.log("File deleted successfully.");
        // } catch (error) {
        //     console.error("Error deleting file:", error);
        // }

        const tempDataImage = data.image.filter((i, index) => index != selectedImage && i);
        setData({...data, image: tempDataImage});
    }

    return (
        <>
            {data &&
                <>{state === 1 ?
                    <div>
                        Profile Edit

                        <div className='imageContainer'>
                            <div className='imageBox'>
                                {
                                    data.image[0] ?
                                    <div style={{ position: 'relative' }}>
                                        {/* <img
                                            style={{ position: 'absolute', width: '35px', height: '35px', right: '-10px', top: '-10px' }}
                                            src={cross}
                                            alt="Cross"
                                            onClick={() => {
                                                deleteImage(0);
                                                const tempImageLength = imageLength - 1;
                                                setImageLength(tempImageLength)
                                            }
                                            }
                                        /> */}
                                        <img src={data.image[0]} alt="Selected" width="130px" />
                                    </div>
                                
                                    :
                                    selectedImage[0 - imageLength] ? (
                                        <img src={URL.createObjectURL(selectedImage[0 - imageLength])} alt="Selected" width="130px" />
                                    ) : (
                                        <label htmlFor="imageUpload">
                                            <span className='plusIcon'>+</span>
                                            <input
                                                style={{ display: 'none' }}
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 0)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                            <div className='imageBox'>
                                {
                                    data.image[1] ?
                                    <div style={{ position: 'relative' }}>
                                        {/* <img
                                            style={{ position: 'absolute', width: '35px', height: '35px', right: '-10px', top: '-10px' }}
                                            src={cross}
                                            alt="Cross"
                                            onClick={() => {
                                                    deleteImage(1);
                                                    const tempImageLength = imageLength - 1;
                                                    setImageLength(tempImageLength)
                                                }}
                                        /> */}
                                        <img src={data.image[1]} alt="Selected" width="130px" />
                                    </div>
                                    :
                                    selectedImage[1 - imageLength] ? (
                                        <img src={URL.createObjectURL(selectedImage[1 - imageLength])} alt="Selected" width="130px" />
                                    ) : (
                                        <label htmlFor="imageUpload">
                                            <span className='plusIcon'>+</span>
                                            <input
                                                style={{ display: 'none' }}
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 1)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                            <div className='imageBox'>
                                {
                                    data.image[2] ?
                                    <div style={{ position: 'relative' }}>
                                        {/* <img
                                            style={{ position: 'absolute', width: '35px', height: '35px', right: '-10px', top: '-10px' }}
                                            src={cross}
                                            alt="Cross"
                                            onClick={() => {
                                                deleteImage(2);
                                                const tempImageLength = imageLength - 1;
                                                setImageLength(tempImageLength)
                                            }
                                            }
                                        /> */}
                                        <img src={data.image[2]} alt="Selected" width="130px" />
                                    </div>
                                    :
                                    selectedImage[2 - imageLength] ? (
                                        <img src={URL.createObjectURL(selectedImage[2 - imageLength])} alt="Selected" width="130px" />
                                    ) : (
                                        <label htmlFor="imageUpload">
                                            <span className='plusIcon'>+</span>
                                            <input
                                                style={{ display: 'none' }}
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 2)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                            <div className='imageBox'>
                                {
                                    data.image[3] ?
                                    <div style={{ position: 'relative' }}>
                                        {/* <img
                                            style={{ position: 'absolute', width: '35px', height: '35px', right: '-10px', top: '-10px' }}
                                            src={cross}
                                            alt="Cross"
                                            onClick={() => {
                                                deleteImage(3);
                                                const tempImageLength = imageLength - 1;
                                                setImageLength(tempImageLength)
                                            }
                                            }
                                        /> */}
                                        <img src={data.image[3]} alt="Selected" width="130px" />
                                    </div>
                                    :
                                    selectedImage[3 - imageLength] ? (
                                        <img src={URL.createObjectURL(selectedImage[3 - imageLength])} alt="Selected" width="130px" />
                                    ) : (
                                        <label htmlFor="imageUpload">
                                            <span className='plusIcon'>+</span>
                                            <input
                                                style={{ display: 'none' }}
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 3)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                            <div className='imageBox'>
                                {
                                    data.image[4] ?
                                    <div style={{ position: 'relative' }}>
                                        {/* <img
                                            style={{ position: 'absolute', width: '35px', height: '35px', right: '-10px', top: '-10px' }}
                                            src={cross}
                                            alt="Cross"
                                            onClick={() => {
                                                deleteImage(4);
                                                const tempImageLength = imageLength - 1;
                                                setImageLength(tempImageLength)
                                            }
                                            }
                                        /> */}
                                        <img src={data.image[4]} alt="Selected" width="130px" />
                                    </div>
                                    :
                                    selectedImage[4 - imageLength] ? (
                                        <img src={URL.createObjectURL(selectedImage[4 - imageLength])} alt="Selected" width="130px" />
                                    ) : (
                                        <label htmlFor="imageUpload">
                                            <span className='plusIcon'>+</span>
                                            <input
                                                style={{ display: 'none' }}
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 4)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                            <div className='imageBox'>
                                {
                                    data.image[5] ?
                                    <div style={{ position: 'relative' }}>
                                        {/* <img
                                            style={{ position: 'absolute', width: '35px', height: '35px', right: '-10px', top: '-10px' }}
                                            src={cross}
                                            alt="Cross"
                                            onClick={() => {
                                                deleteImage(5);
                                                const tempImageLength = imageLength - 1;
                                                setImageLength(tempImageLength)
                                            }
                                            }
                                        /> */}
                                        <img src={data.image[5]} alt="Selected" width="130px" />
                                    </div>
                                    :
                                    selectedImage[5 - imageLength] ? (
                                        <img src={URL.createObjectURL(selectedImage[5 - imageLength])} alt="Selected" width="130px" />
                                    ) : (
                                        <label htmlFor="imageUpload">
                                            <span className='plusIcon'>+</span>
                                            <input
                                                style={{ display: 'none' }}
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 5)}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>About Me</h3>
                            <textarea
                                defaultValue={data.bio}
                                style={{ width: '80%', borderRadius: '10px', padding: '10px', fontSize: '20px' }}
                                rows={8}
                                onChange={(e) => editAbout(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className="inputDiv">
                            <p className="inputTitle" style={{ "width": "30px" }}>City</p>
                            <input
                                type="text"
                                // min={18}
                                className="inputField"
                                value={data.city}
                                onChange={(e) => editCity(e.target.value)}
                            />
                        </div>
                        {/* <div className="inputDiv">
                            <p className="inputTitle" style={{ "width": "50px" }}>College</p>
                            <input
                                type="text"
                                // min={18}
                                className="inputField"
                                value={data ? data.college : ''}
                            // onChange={(e) => setAge(e.target.value)}
                            />
                        </div> */}
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto' }}>
                                <h3>Interests</h3>
                                <p style={{ color: 'blue' }} onClick={() => setState(2)}>Edit</p>
                            </div>
                            <div style={{ margin: 'auto', minHeight: '100px', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', width: '80%' }}>
                                {data.interest.map((item, index) => (
                                    <div key={index} className="interestOptionBox" >
                                        <img width="30px" height="30px" src={require(`../assets/images/${item.toLowerCase()}.png`)}/>
                                        <p>{item}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="inputDiv" onClick={() => setFloatDivDisplay(true)}>
                            <p className="inputTitle" style={{ width: "130px", zIndex: '0' }}>Relationship Goal</p>
                            <input
                                type="text"
                                // min={18}
                                className="inputField"
                                value={data ? data.relationship_goals : ''}
                            // onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="inputDiv" style={{ border: 'transparent', maxHeight: '50px', borderRadius: '10px' }}>
                            <p className="inputTitle" style={{ "width": "75px", }}>Languages</p>
                            <Select
                                closeMenuOnSelect={false}
                                defaultValue={defaultValueLanguage}
                                isMulti
                                options={LanguageOptions}
                                onChange={(e) => editLanguages(e)}
                            />
                        </div>
                        <div onClick={() => onSubmit()} style={{ marginTop: '50px', marginBottom: '50px' }}>
                            <ButtonComponent title="Save"loader={loader} />
                        </div>

                    </div> :
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <img onClick={() => setState(1)} src={back} width="35px" height="35px" style={{ marginTop: '25px' }} />
                            <h1>Your Interests <span style={{ fontSize: '20px' }}>{data.interest.length}/5</span></h1>
                        </div>

                        <div className='interestOptionDiv'>
                            {
                                interests.map((item, index) => (
                                    <div key={index} className={data.interest.includes(item.title) ? 'selectIntOptionBox' : 'interestOptionBox'} onClick={() => { toggleInterest(item.title); setState(state + 1) }}>
                                        <img src={item.img} width="30px" height="30px" />
                                        <p>{item.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{ marginTop: '50px', marginBottom: '50px' }} onClick={() => setState(1)}>
                            <ButtonComponent title="Next" />
                        </div>
                    </div>}
                </>
            }

            <div className="floatDiv" style={{ display: flatDivDisplay ? 'block' : 'none' }}>
                <h3>I am Looking For</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
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