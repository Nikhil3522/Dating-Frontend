import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Welcome, Login, Signup, UserDetails, Home, Like, Message, Profile} from '../page';
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
                <Route path="/like" element={<ProtectedRoute><Like /></ProtectedRoute>}/>
                <Route path="/message" element={<ProtectedRoute><Message /></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;