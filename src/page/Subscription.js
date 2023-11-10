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

    const verifyPayment =async (res, amount, description) => {
        console.log("verify payment");
        const response = {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature
        }
        const response2 = await fetch(  process.env.REACT_APP_API_URL + '/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response, amount }),
            credentials: 'include'
        });
        

        const data = await response2.json();

        if(data.signatureIsValid){
            const response3 = await fetch(  process.env.REACT_APP_API_URL + '/savepayment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    response,
                    amount,
                    packName: description,
                    month : selectPlan 
                }),
                credentials: 'include'
            });

            const data3 = await response3.json();

            console.log("data3", data3);
        }else{
            console.log("Payment is not valid!", data.signatureIsValid);
        }
    }

    const paymentGateway = async () => {
        var planAmount = 0;
        var description;

        if(packName === "gold"){
            description = "Gold Plan";
            if(selectPlan === "one"){
                planAmount = 99;
                description += " | One Month";
            }else if(selectPlan === "three"){
                planAmount = 249;
                description += " | Three Months";
            }if(selectPlan === "six"){
                planAmount = 399;
                description += " | Six Months";
            }
        }else if(packName === "diamond"){
            description = "Diamond Plan";
            if(selectPlan === "one"){
                planAmount = 199;
                description += " | One Month";
            }else if(selectPlan === "three"){
                planAmount = 499;
                description += " | Three Months";
            }if(selectPlan === "six"){
                planAmount = 799;
                description += " | Six Months";
            }
        }

        const response = await fetch(  process.env.REACT_APP_API_URL + '/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 100 * planAmount }),
            credentials: 'include'
        });
    
        const data = await response.json();
        const orderId = data.order.id;
        console.log("order", orderId);
        const name = data.user.name;
        const email = data.user.email;

        // Initialize Razorpay with the order ID
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: 100 * planAmount,
          currency: 'INR',
          name: 'Your Company Name',
          description: description,
          order_id: orderId,
          handler: function (response) {
            // Handle the success callback here
            console.log('Payment success', response);
            verifyPayment(response, planAmount, description);
            // navigate('/message')
            // You can redirect the user or perform other actions here
          },
          prefill: {
            name: name,
            email: email,
            // contact: '1234567890',
          },
        };
    
        
// razorpay_order_id
// : 
// "order_MjFqx5amZjbxfa"
// razorpay_payment_id
// : 
// "pay_MjFr45kPkSmxrF"
// razorpay_signature
// : 
// "f95ab7613f32a87fa56d4a27504d9d0cf08b222894da07731dfd5d640311d652"
        const razorpay = new window.Razorpay(options);
        razorpay.open();
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
                <div onClick={() => paymentGateway()} style={{ display: 'inline-block' }}>
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
                <div onClick={() => paymentGateway()} style={{ display: 'inline-block' }}>
                    <ButtonComponent title="BUY NOW" loader={loader}/>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
