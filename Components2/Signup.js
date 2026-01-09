import React, { useRef, useState } from "react";
import "./Styles/Signup.css"
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./Context";

const Signup = () => {
    const navigate=useNavigate()
    const[showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[loading,setLoading]=useState(false)
    const fname=useRef()
    const lname=useRef()
    const email=useRef()
    const password=useRef()
    const confirmpassword=useRef()

    const handleSignup=async()=>{
      try{
        setLoading(true)
        const FirstName=fname.current.value
        const LastName=lname.current.value
        const Email=email.current.value
        const Password=password.current.value
        const Confirmpassword=confirmpassword.current.value

        if(!FirstName||!LastName||!Email||!Password||!Confirmpassword){
            alert("please fill all fields")
            return;
        }
        else if(Password!==Confirmpassword){
            alert("password doesn't Match")
            return;
        }
        const res=await axios.post("https://thecravings.onrender.com/api/auth/signup",{
            "email":Email,
            "password":Password,
            "firstname":FirstName,
            "lastname":LastName
        })
        alert(res.data.message)
        navigate("/")
    }
        catch(err){
           alert(err.response?.data.message,"Try new") 
        }
        finally{
          setLoading(false)
        }
    }

  return (
    <div className="signup-page">
        <Header />
        {loading && (
        <div className="premium-loader-backdrop">
          <div className="premium-loader-card">
            <div className="premium-spinner"></div>
            <span>Signing you in...</span>
          </div>
        </div>
      )}
      <div className="signup-container">
        <div className="signup-card">
          <div className="card-logo">T</div>
          <h2>Create an account</h2>
          <p className="subtitle">
            Start ordering delicious food today
          </p>

          {/* Full Name */}
          <div className="field">
            <label>First Name</label>
            <div className="input-box">
              <span className="icon">👤</span>
              <input type="text" placeholder="John Doe" ref={fname}/>
            </div>
          </div>

          <div className="field">
            <label>Last Name</label>
            <div className="input-box">
              <span className="icon">👤</span>
              <input type="text" placeholder="John Doe" ref={lname}/>
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label>Email</label>
            <div className="input-box">
              <span className="icon">✉</span>
              <input type="email" placeholder="you@example.com" ref={email}/>
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <label>Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" ref={password}/>
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <img src="https://cdn-icons-png.flaticon.com/128/10898/10898993.png" height={"20px"} width={"20px"}/> : <img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" height={"20px"} width={"20px"}/>} </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="field">
            <label>Confirm Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
              <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" ref={confirmpassword}/>
              <span className="eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <img src="https://cdn-icons-png.flaticon.com/128/10898/10898993.png" height={"20px"} width={"20px"}/> : <img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" height={"20px"} width={"20px"}/>} </span>
            </div>
          </div>

          <button type="button" className="signup-main-btn" onClick={handleSignup}>
            Create account <span>→</span>
          </button>

          <p className="footer-text">
            Already have an account? <span onClick={()=>navigate("/")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
