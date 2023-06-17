import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Welcome, Login, Signup} from '../page';

const Navigator = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;