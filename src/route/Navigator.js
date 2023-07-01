import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Welcome, Login, Signup, UserDetails, Home} from '../page';
import ProtectedRoute from "./ProtectedRoute";

const Navigator = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/userdetails" element={<UserDetails />}/>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;