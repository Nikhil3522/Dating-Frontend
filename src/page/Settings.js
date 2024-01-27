import NavigationBar from "../component/NavigationBar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { useState } from "react";

const Settings = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const logout = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/logout',
            withCredentials: true,

        };

        axios.request(config)
            .then(async (response) => {
                await localforage.setItem('userLogin', { id: Date.now(), value: false });
                window.location.reload(false);
                // navigate('/login');
            })
            .catch((error) => {
                console.log("error in logout", error);
            });
    }

    return (
        <div>
            <h1>Settings</h1>
            {
                step === 1 ? <>
                    <div className="verifiedDiv" style={{ marginTop: '15px' }} onClick={logout}>
                        <h3>Logout</h3>
                    </div>

                    <div className="verifiedDiv" style={{ marginTop: '15px' }} onClick={() => setStep(2)}>
                        <h3>Privacy Policy</h3>
                    </div>

                    <div className="verifiedDiv" style={{ marginTop: '15px', }} onClick={() => setStep(3)}>
                        <h3>Delete Account</h3>
                    </div>
                </>
                    : step === 2 ?
                        <div style={{textAlign: 'justify', margin: '20px'}}>
                            <h4>PRIVACY POLICY</h4>
                            <h5>Last updated January 04, 2024</h5>
                            <p>
                                {/* This privacy notice for __________ ('we', 'us', or 'our'),  */}
                                We describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:<br></br><br></br>
                                Visit our website, or any website of ours that links to this privacy notice<br></br><br></br>
                                Engage with us in other related ways, including any sales, marketing, or events<br></br><br></br>
                                Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services.
                            </p>

                            <h4>SUMMARY OF KEY POINTS</h4>
                            <p><b>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</b></p>

                            <p><b>What personal information do we process?</b>When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.</p>

                            <p><b>Do we process any sensitive personal information?</b> We do not process sensitive personal information.</p>

                            <p><b>Do we receive any information from third parties?</b> We do not receive any information from third parties.</p>

                            <p><b>How do we process your information?</b> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.</p>
 
                            <p><b>In what situations and with which parties do we share personal information?</b> We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.</p>

                            <p><b>What are your rights?</b> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.</p>

                            <p><b>How do you exercise your rights?</b> The easiest way to exercise your rights is by visiting http://www.dateuni.in/profile/edit, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>

                            <p>Want to learn more about what we do with any information we collect? Review the privacy notice in full.</p>
                            
                            <hr></hr>
                            <h4>TABLE OF CONTENTS</h4>
                                <div style={{marginLeft: '20px'}}>
                                    <p>1. WHAT INFORMATION DO WE COLLECT?</p>
                                    <p>2. HOW DO WE PROCESS YOUR INFORMATION?</p>
                                    <p>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</p>
                                    <p>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</p>
                                    <p>5. HOW LONG DO WE KEEP YOUR INFORMATION?</p>
                                    <p>6. DO WE COLLECT INFORMATION FROM MINORS?</p>
                                    <p>7. WHAT ARE YOUR PRIVACY RIGHTS?</p>
                                    <p>8. CONTROLS FOR DO-NOT-TRACK FEATURES</p>
                                    <p>9. DO WE MAKE UPDATES TO THIS NOTICE?</p>
                                    <p>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</p>
                                    <p>11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</p>
                                </div>
                            <hr></hr>

                            <h4>1. WHAT INFORMATION DO WE COLLECT?</h4>
                            <h4>Personal information you disclose to us</h4>
                            <p><b>In Short:</b> We collect personal information that you provide to us.</p>
                            <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                            <p><b>Personal Information Provided by You.</b> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                            <div>
                                <ul>
                                    <li>names</li>
                                    <li>email addresses</li>
                                    <li>passwords</li>
                                </ul>
                            </div>

                            <p><b>Sensitive Information.</b> We do not process sensitive information.</p>

                            <p>
                            <b>Payment Data.</b> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by Razorpay. You may find their privacy notice link(s) here: https://razorpay.com/privacy-policy/.
                            </p>

                            <p>
                                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                            </p>
                            <h4>Information automatically collected</h4>
                            <p>
                                <b>In Short:</b> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                            </p>

                            <p>
                                We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                            </p>

                            <p>
                                Like many businesses, we also collect information through cookies and similar technologies.
                            </p>


                            <p>The information we collect includes:</p>
                            <ul>
                            <li>
                                Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps'), and hardware settings).
                            </li>
                            <br></br>
                            <li>
                                Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
                            </li>
                            <br></br>
                            <li>
                                Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
                            </li>

                            </ul>

                            <h4>2. HOW DO WE PROCESS YOUR INFORMATION?</h4>

                            <p>
                                <b>In Short:</b> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                            </p>

                            <p><b>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</b></p>

                            <ul>
                                <li>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                                <li>To fulfil and manage your orders. We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.</li>
                                <li>To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
                                <li>To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
                            </ul>

                            <h4>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h4>
                            <p>In Short: We may share information in specific situations described in this section and/or with the following third parties.</p>
                            <p>We may need to share your personal information in the following situations:</p>

                            <ul>
                                <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                                <li>When we use Google Maps Platform APIs. We may share your information with certain Google Maps Platform APIs (e.g. Google Maps API, Places API). We obtain and store on your device ('cache') your location for six (6) months. You may revoke your consent anytime by contacting us at the contact details provided at the end of this document.</li>
                                <li>Other Users. When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.</li>
                            </ul>

                            <h4>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h4>

                            <p>In Short: We may use cookies and other tracking technologies to collect and store your information.</p>

                            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>

                            <h4>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h4>

                            <p>In Short: We keep your information for as long as necessary to fulfil the purposes outlined in this privacy notice unless otherwise required by law.</p>

                            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than   the period of time in which users have an account with us.</p>

                            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>


                            <h4>6. DO WE COLLECT INFORMATION FROM MINORS?</h4>
                            <p>
                            In Short: We do not knowingly collect data from or market to children under 18 years of age.
                            </p>

                            <p>
                                We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at support@dateuni.in.
                            </p>

                            <h4>7. WHAT ARE YOUR PRIVACY RIGHTS?</h4>
                            <p>In Short:  You may review, change, or terminate your account at any time.</p>

                            <p>Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>

                            <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>


                            <h4>Account Information</h4>
                            <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>

                            <ul>
                                <li>Log in to your account settings and update your user account.</li>
                            </ul>

                            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>

                            <p>Cookies and similar technologies: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.</p>

                            <h4>8. CONTROLS FOR DO-NOT-TRACK FEATURES</h4>

                            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>

                            <h4>9. DO WE MAKE UPDATES TO THIS NOTICE?</h4>

                            <p>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>

                            <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated 'Revised' date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>

                            <h4>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h4>

                            <p>If you have questions or comments about this notice, you may email us at privacy@example.com.</p>

                            <h4>11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h4>

                            <p>You have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please visit: http://www.dateuni.in/profile/edit.</p>

                            <p>This privacy policy was created using Termly's Privacy Policy Generator.</p>


                        </div>
                        : step === 3 ?
                            <>
                                <h3>Please mail us at support@dateuni.in to delete your account.</h3>
                            </>
                            : null
            }


            <NavigationBar />
        </div>
    )
}

export default Settings;