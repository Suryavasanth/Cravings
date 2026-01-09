import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AppProvider from "./Context";
import Home from "./Home";
import Order from "./Order";
import Dashboard from "./Dashboard";
import Card from "./Card";
import Profile from "./Profile";
import Checkout from "./Checkout";
import Confirm from "./Confirm";
import Logout from './Logout'
import {useAppContext} from './Context'
const Router1=()=>{
     const {logout}=useAppContext()
    return(
        // <AppProvider>
             
        <BrowserRouter>
         {logout&& <Logout/>}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/card" element={<Card/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/confirm" element={<Confirm/>}/>
            </Routes>
        </BrowserRouter>
        // </AppProvider>
    )
}

export default Router1;