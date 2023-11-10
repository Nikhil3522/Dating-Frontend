import React, { useRef, useState, useEffect } from 'react';
import ButtonComponent from '../component/ButtonComponent';
import Aos from 'aos';

const Verified = () => {

    useEffect(() => {
        Aos.init({ duration: 600 })
    }, []);

    const videoRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [information, setInformation] = useState(true);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsRecording(true);

            // Record video for 5 seconds
            await new Promise((resolve) => setTimeout(resolve, 5000));

            // Stop recording
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
        } catch (error) {
            console.error('Error accessing user media:', error);
        }
    };

    return (
        information ?
            <div className='verification-container' >
                <p>Welcome to [App]<br /> For your safety and better connections, we may need access to your device's camera. We use it for:</p>

                <p><b>Video Verification:</b> Ensuring you're a real person, not fake.</p>
                <p><b>Enhanced Profile:</b> Upload real-time videos for better matches.</p>

                <p> Tips for a Great Recording:</p>

                <p>Find good lighting and be yourself.<br />
                    Videos are limited to 5 seconds.<br /></p>

                Tap below to start the camera setup and create an authentic profile.
                <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                    <div data-aos="zoom-in-up" style={{ display: 'inline-block' }}>
                        <input id="term_condition" value="test" type="checkbox" /> 
                        <label for="term_condition">  Agree to our Terms of Service. Thank you for choosing [App]! Enjoy a safe and enjoyable dating experience.</label>
                        <div onClick={() => setInformation(false)}>
                            <ButtonComponent title="START" />
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>
                <div style={{ maxWidth: '100%', position: 'relative', paddingTop: '150%' }}>
                    <video ref={videoRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                </div>
                <button onClick={handleStartRecording} disabled={isRecording}>
                    {isRecording ? 'Recording...' : 'Start Recording'}
                </button>
            </div>
    );
};

export default Verified;
