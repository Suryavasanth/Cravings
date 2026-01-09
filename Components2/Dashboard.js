import React, { useEffect, useState } from "react";
import "./Styles/Dashboard.css"
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "./Context";

const Dashboard=()=>{
    const navigate=useNavigate()
    const{count}=useAppContext();
    const[dashboardData,setDashboardData]=useState([])
    const[loading,setLoading]=useState(false)
    const[recentOrder,setRecentOrder]=useState([])
    const token=JSON.parse(localStorage.getItem("token"))

    useEffect(()=>{
      if(token){
      GetDashboardData()
      }
    },[token])

    const GetDashboardData=async()=>{
      try{
        setLoading(true)
      const res=await axios.get("https://thecravings.onrender.com/api/dashboard",
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        })
        setDashboardData(res.data)
        setRecentOrder(res.data?.Recent_order)
        console.log(res.data)
      }
      catch(err){
        alert(err.response?.data||err)
    }
    finally{
      setLoading(false)
    }
  }
return (
    <>
    <Header/>
    {loading && (
        <div className="premium-loader-backdrop">
            <div className="premium-loader-card">
            <div className="premium-spinner"></div>
            <span>Loading Dashboard...</span>
            </div>
        </div>
        )}
    {token ?( 
  <div className="dashboard">
    {/* Header */}
    <div className="dashboard-header">
      <span className="welcome">✨ Welcome back</span>
      <h1>
        Hello, <span>{dashboardData.username}</span> <span className="wave">👋</span>
      </h1>
      <p>Here's what's happening with your account today.</p>
    </div>

    {/* Stats */}
    <div className="stats">
      <div className="stat-card stat-orange">
        <div>
          <p>Total Orders</p>
          <h2>{dashboardData.total_orders}</h2>
        </div>
        <div className="icon-box">🧾</div>
      </div>

      <div className="stat-card stat-liteOrange">
        <div >
          <p>Active Orders</p>
          <h2>{dashboardData.Active_Orders}</h2>
        </div>
        <div className="icon-box light-orange">⏱</div>
      </div>

      <div className="stat-card stat-green">
        <div>
          <p>Cart Items</p>
          <h2>{count}</h2>
        </div>
        <div className="icon-box light-green">🛒</div>
      </div>
    </div>

    {/* Bottom Section */}
   <div className="dashboard-bottom">
  <div className="recent-orders">
    {/* Header */}
    <div className="recent-header">
      <h3>Recent Orders</h3>
      <span className="view-all" onClick={() => navigate("/order")}>
        View All →
      </span>
    </div>

    {/* Orders List */}
    {recentOrder.length > 0 ? (
        <div className="orders-scroll">
          {recentOrder.map((order, i) => (
            <div className="recent-order-card" key={i} onClick={()=>navigate("/order")}>
              <div className="order-left">
                <div className="order-images">
                  {order.dishes.slice(0, 2).map((item, idx) => (
                    <img key={idx} src={item.productimage} alt={item.productname} />
                  ))}
                </div>

                <div className="order-info">
                  <h4>{order.orderID}</h4>
                  <p>{order.dishesCount} items</p>
                </div>
              </div>

              <div className="order-right">
                <span className="order-price">₹ {order.total_price}</span>
                <span className="order-status">{order.order_status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <p>No orders yet</p>
          <span className="start" onClick={() => navigate("/home")}>
            Start ordering
          </span>
        </div>
      )}
    </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h3>Quick Links</h3>

        <div className="quick-card" onClick={()=>navigate("/profile")}>
          <div className="q-icon orange">👤</div>
          <div>
            <h4>Profile</h4>
            <p>Edit your details</p>
          </div>
          <span>→</span>
        </div>

        <div className="quick-card" onClick={()=>navigate("/card")}>
          <div className="q-icon green">🛒</div>
          <div>
            <h4>Cart</h4>
            <p>{count} items</p>
          </div>
          <span>→</span>
        </div>

        <div className="quick-card" onClick={()=>navigate("/order")}>
          <div className="q-icon orange">📄</div>
          <div>
            <h4>Orders</h4>
            <p>View history</p>
          </div>
          <span>→</span>
        </div>
      </div>
    </div>
  </div>
):(
  <section className="orders-empty">
    <div className="orders-box">
      <div className="orders-icon">
        ▦
      </div>

      <h2>Login to view dashboard</h2>
      <p>Sign in to access your personalized dashboard</p>

      <button className="orders-login-btn" onClick={()=>navigate("/")}>
        Login
      </button>
    </div>
  </section>)}
  <Footer/>
   </>
);
}

export default Dashboard;
