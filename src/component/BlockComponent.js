import close from '../assets/icons/close.png';
import { useState } from 'react';

const BlockComponent = (props) => {
    const [step, setStep] =useState(1);

    return (
        <div style={{display: 'flex', paddingBottom: '45px', flexDirection: 'column', position: 'absolute',borderRadius: '15px', backgroundColor: 'red', color: 'white', top: '30vh',left: '15vw', width: '70%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
            <div style={{ display: 'flex', marginRight: '10px', justifyContent: 'flex-end' }}>
                <img
                    onClick={props.hideBlockComp}
                    src={close} 
                    height="45px" 
                    width="45px" 
                />
            </div>
            {
                step === 1 ?
                <>
                    <div
                        onClick={() => setStep(2)} 
                        style={{backgroundColor: 'whitesmoke', color: 'black', margin: '10px', width: '60%', marginLeft: '20%', height: '40px', lineHeight: '40px', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', fontSize: '18px'}}
                    >
                        BLOCK
                    </div>
                    <div
                        onClick={() => setStep(3)} 
                        style={{backgroundColor: 'whitesmoke', color: 'black', margin: '10px', width: '60%', marginLeft: '20%', height: '40px', lineHeight: '40px', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', fontSize: '18px'}}
                    >
                        UNMATCH
                    </div>
                    <div
                        onClick={() => setStep(4)} 
                        style={{backgroundColor: 'whitesmoke', color: 'black', margin: '10px', width: '60%', marginLeft: '20%', height: '40px', lineHeight: '40px', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', fontSize: '18px'}}
                    >
                        REPORT
                    </div>
                </> :
                step === 2 ? 
                <>
                    <h3>Proceeding with this action cannot be undo. Are you absolutely sure you want to continue?</h3>
                    <div style={{display: 'flex', width: '80%', justifyContent: 'space-evenly', margin:'auto'}}>
                        <div style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}>
                            YES
                        </div>
                        <div 
                            onClick={props.hideBlockComp}
                            style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                        >
                            NO
                        </div>
                    </div>
                </> :
                step ===3 ?
                <>
                    <h3>Do you wish to proceed and unmatch this user?</h3>
                    <div style={{display: 'flex', width: '80%', justifyContent: 'space-evenly', margin:'auto'}}>
                        <div style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}>
                            YES
                        </div>
                        <div 
                            onClick={props.hideBlockComp}
                            style={{backgroundColor: 'white', color: 'red', fontWeight: 'bold', fontSize: '20px', width: '40%', borderRadius: '15px', height: '30px', lineHeight: '30px'}}
                        >
                            NO
                        </div>
                    </div>
                </> : null
            }
        </div>
    )
}

export default BlockComponent;