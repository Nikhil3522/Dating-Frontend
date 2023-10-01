import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonComponent from '../component/ButtonComponent';

const Subscription = () => {
    const navigate = useNavigate();
    const { packName } = useParams();

    const [selectPlan, setSelectedPlan] = useState("one");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (packName !== "gold" && packName !== "diamond") {
            navigate('/home');
        }
    }, [packName, navigate]);

    const goldPaymentGateway = async () => {
        
    }
    

    return (
        packName === "gold" ?
        <div>
            <h2 className='packName'>Gold Pack</h2>
            <div className='benefits-container'>
                <p>Benefits</p>
                <ul className='list'>
                    <li>Unlimited Likes</li>
                    <li>See who Likes You</li>
                </ul>
            </div>

            <h3 >Choose Subscription</h3>
            <div style={{paddingBottom: '200px'}}>
                <div className="subscriptionContainer">
                    <div 
                        className='subscriptionMonthDiv' 
                        style={selectPlan === "one" ? {border: "3px solid red"} : null}
                        onClick={() => setSelectedPlan("one")}
                    >
                        <h3>1 Month</h3>
                        <p><span className='price'>&#8377;99</span></p>
                        <p>&#8377;99/ Month</p>
                    </div>
                    
                    <div 
                        className='subscriptionMonthDiv' 
                        style={selectPlan === "three" ? {border: "3px solid red"} : null}
                        onClick={() => setSelectedPlan("three")}
                    >
                        <h3>3 Month</h3>
                        <p><span className='price'>&#8377;249</span></p>
                        <p><span className='preDiscountPrice'>&#8377;297</span> Save 16%</p>
                        <p>&#8377;83/ Month</p>
                    </div>

                    <div 
                        className='subscriptionMonthDiv' 
                        style={selectPlan === "six" ? {border: "3px solid red"} : null}
                        onClick={() => setSelectedPlan("six")}
                    >
                        <h3>6 Month</h3>
                        <p><span className='price'>&#8377;399</span></p>
                        <p><span className='preDiscountPrice'>&#8377;594</span> Save 32%</p>
                        <p>&#8377;66.5/ Month</p>
                    </div>
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div onClick={() => goldPaymentGateway()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="BUY NOW" loader={loader}/>
                </div>
            </div>
        </div> : 
        <div>
            <h2 className='packName'>Diamond Pack</h2>
            <div className='benefits-container'>
                <p>Benefits</p>
                <ul className='list'>
                    <li>Unlimited Likes</li>
                    <li>See who Likes You</li>
                    <li>Priority Likes</li>
                </ul>
            </div>
            <h3>Choose Subscription</h3>
            <div style={{paddingBottom: '200px'}}>
                <div className="subscriptionContainer">
                    <div 
                        className='subscriptionMonthDiv' 
                        style={selectPlan === "one" ? {border: "3px solid red"} : null}
                        onClick={() => setSelectedPlan("one")}
                    >
                        <h3>1 Month</h3>
                        <p><span className='price'>&#8377;199</span></p>
                        <p>&#8377;199/ Month</p>
                    </div>
                    
                    <div 
                        className='subscriptionMonthDiv' 
                        style={selectPlan === "three" ? {border: "3px solid red"} : null}
                        onClick={() => setSelectedPlan("three")}
                    >
                        <h3>3 Month</h3>
                        <p><span className='price'>&#8377;499</span></p>
                        <p><span className='preDiscountPrice'>&#8377;597</span> Save 16%</p>
                        <p>&#8377;166.3/ Month</p>
                    </div>

                    <div 
                        className='subscriptionMonthDiv' 
                        style={selectPlan === "six" ? {border: "3px solid red"} : null}
                        onClick={() => setSelectedPlan("six")}
                    >
                        <h3>6 Month</h3>
                        <p><span className='price'>&#8377;799</span></p>
                        <p><span className='preDiscountPrice'>&#8377;1,194</span> Save 33%</p>
                        <p>&#8377;133.1/ Month</p>
                    </div>
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                <div onClick={() => console.log("fdsa")} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="BUY NOW" loader={loader}/>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
