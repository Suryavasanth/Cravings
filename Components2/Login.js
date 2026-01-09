import React, { useEffect, useRef, useState } from "react";
import "./Styles/Login.css"
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const email=useRef()
    const password=useRef()

    useEffect(()=>{
      const token=JSON.parse(localStorage.getItem("token"))
      if(token){
        navigate("/home")
      }
    })

    const handleSignIn=async()=>{
        setLoading(true)
        try{
            const Email=email.current.value
            const Password=password.current.value

        const res=await axios.post("https://thecravings.onrender.com/api/auth/login",
            {
                "email":Email,
                "password":Password
            })
            alert(res.data.message)
            localStorage.setItem("token",JSON.stringify(res.data?.token))
            localStorage.setItem("userid",JSON.stringify(res.data.userid))

            navigate("/home")
    }catch(err){
        alert(err.response?.data.message)
    }
    finally{
      setLoading(false)
    }
}

  return (
    <div className="login-page">
      <Header />
      {loading && (
        <div className="premium-loader-backdrop">
          <div className="premium-loader-card">
            <div className="premium-spinner"></div>
            <span>Signing you in...</span>
          </div>
        </div>
      )}
      <div className="login-container">
        <div className="login-card">
          <div className="card-logo">T</div>

          <h2>Welcome back</h2>
          <p className="subtitle">
            Sign in to your account to continue
          </p>

          <div className="field">
            <label>Email</label>
            <div className="input-box">
              <span className="icon">✉</span>
              <input type="text" placeholder="you@example.com" ref={email}/>
            </div>
          </div>

          <div className="field">
            <div className="password-label">
              <label>Password</label>
              <span className="forgot">Forgot password?</span>
            </div>

            <div className="input-box">
              <span className="icon">🔒</span>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" ref={password}/>
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <img src="https://cdn-icons-png.flaticon.com/128/10898/10898993.png" height={"20px"} width={"20px"}/> : <img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" height={"20px"} width={"20px"}/>} </span>
            </div>
          </div>

          <button className="signin-btn" onClick={handleSignIn} disabled={loading}>
            Sign in <span>→</span>
          </button>

          <p className="footer-text">
            Don’t have an account? <span onClick={()=>navigate("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;