import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Welcome, Login, Signup, UserDetails} from '../page';

const Navigator = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/userdetails" element={<UserDetails />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;