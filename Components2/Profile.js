import React, { useEffect, useState } from "react";
import "./Styles/Profile.css"
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./Context";

const Profile=()=>{
    const navigate=useNavigate()

    useEffect(()=>{
        GetProfile()
    },[])
    const[edit,setEdit]=useState(false)
    const[loading,setLoading]=useState(false)
    const[formData,setFormData]=useState({
        Name:"",
        Email:"",
        Profile:"",
        Gender:"",
        DOB:"",
        Phone:"",
        Address:""
    })
    const handleEdit=()=>{
        setEdit(true)
    }
    const handleFormData=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }
   
    const GetProfile=async()=>{
        try{
        setLoading(true)
        const userid=JSON.parse(localStorage.getItem("userid"))
        const token=JSON.parse(localStorage.getItem("token"))
        const res=await axios.get(`https://thecravings.onrender.com/api/profile/${userid}`,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        const Profile=res.data.data
        setFormData({
            Name:Profile.firstname,
            Email:Profile.email,
            Gender:Profile.gender,
            DOB:Profile.dob,
            Phone:Profile.mobile_number,
            Address:Profile.address,
            Profile:Profile.profilename
        })
        }
        catch(err){
            alert(err.response?.data||err)
        }
        finally{
            setLoading(false)
        }
    }
     const handleSubmit=async(e)=>{
        try{
        e.preventDefault()
        setEdit(false)
        const userid=JSON.parse(localStorage.getItem("userid"))
        const token=JSON.parse(localStorage.getItem("token"))
        const res=await axios.put(`https://thecravings.onrender.com/api/profileEdit/${userid}`,{
            "firstname": formData.Name,
            "lastname": formData.Name,
            "gender": formData.Gender,
            "dob": formData.DOB,
            "mobile_number":formData.Phone,
            "address": formData.Address
            },
            {
        headers:{
            Authorization:`Bearer ${token}`,
        }
        })
    }
    catch(err){
        alert(err.response?.data.message)
    }
}

    return (
        <>
        <Header/>
        {loading && (
        <div className="premium-loader-backdrop">
            <div className="premium-loader-card">
            <div className="premium-spinner"></div>
            <span>Loading profile...</span>
            </div>
        </div>
        )}
        <div className="profile-page">
            {/* Back */}
            <div className="back-btn" onClick={()=>navigate("/home")}>← Back</div>

            {/* Title */}
            <h1 className="profile-title">My Profile</h1>

            {/* Card */}
            <div className="profile-card">
            <div className="card-header">
                <h3>Personal Information</h3>
                <button className="edit-btn" onClick={()=>handleEdit()}>Edit Profile</button>
            </div>
            {/* User Info */}
            {formData &&(
            <div className="user-info">
                <div className="avatar">{formData.Profile}</div>
                <div>
                <h4>{formData?.Name}</h4>
                <p>{formData?.Email}</p>
                </div>
            </div>
            )}
            
            {formData &&(
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="Name" value={formData?.Name} disabled={!edit}  onChange={handleFormData}/>
                </div>

                <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData?.Email} disabled />
                </div>
                <div className="form-group">

                <label>Gender</label>
                <select name="Gender" value={formData?.Gender} disabled={!edit} onChange={handleFormData}>
                    <option value="Not provided">Not provided</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select></div>

                <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="DOB" value={formData?.DOB || ""} disabled={!edit} onChange={handleFormData}/>
                </div>

                <div className="form-group">
                <label>Phone Number</label>
                <input type="text" value={formData?.Phone} placeholder="Not provided" disabled={!edit} name="Phone" onChange={handleFormData}/>
                </div>

                <div className="form-group">
                <label>Delivery Address</label>
                <input type="text" value={formData?.Address} placeholder="Not provided" disabled={!edit} name="Address" onChange={handleFormData}/>
                </div>
                {/* Action Buttons */}
                {edit && (
                <div className="form-actions">
                <button type="submit" className="save-btn"> 💾 Save Changes</button>
                <button type="button" className="cancel-btn"onClick={() => setEdit(false)}>✖ Cancel</button>
                </div>
                )}
                </form>
            )}
            </div>
        </div>
        <Footer/>
     </>   
);
}
//
export default Profile;