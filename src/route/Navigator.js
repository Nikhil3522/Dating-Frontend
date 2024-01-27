import { HashRouter , Route, Routes } from "react-router-dom";
import {
        Welcome, 
        Login, 
        Signup, 
        UserDetails, 
        Home, 
        Like, 
        Message,
        Profile, 
        ProfileEdit, 
        ChatWindow, 
        Verified, 
        ForgetPassword,
        Subscription,
        Settings
    } from '../page';
import ProtectedRoute from "./ProtectedRoute";

const Navigator = () => {
    return (
        <HashRouter>
            <Routes >
                <Route path="/" element={<ProtectedRoute><Welcome url={'/'}/></ProtectedRoute>}/>
                <Route path="/login" element={<ProtectedRoute><Login url={'/login'}/></ProtectedRoute>}/>
                <Route path="/signup" element={<ProtectedRoute><Signup url={'/signup'}/></ProtectedRoute>}/>
                <Route path="/forget-password" element={<ProtectedRoute><ForgetPassword url={'/forget-password'}/></ProtectedRoute>}/>
                <Route path="/userdetails" element={<UserDetails />}/>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                <Route path="/like" element={<ProtectedRoute><Like /></ProtectedRoute>}/>
                <Route path="/message" element={<ProtectedRoute><Message /></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
                <Route path="/profile/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>}/>
                <Route path="/message/:profileId/:index/:avatar" element={<ProtectedRoute><ChatWindow /></ProtectedRoute>}/>
                <Route path="/verified" element={<ProtectedRoute> <Verified /> </ProtectedRoute>}/>
                <Route path="/subscription/:packName" element={<ProtectedRoute> <Subscription /> </ProtectedRoute>}/>
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}/>
            </Routes>
        </HashRouter>
    )
}

export default Navigator;