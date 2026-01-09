import React, { useEffect, useState } from "react";
import "./Styles/Order.css"
import Header from "./Header";
import Footer from "./Footer";
import { useAppContext } from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order=()=>{
    const token=JSON.parse(localStorage.getItem("token"))
    const[order,setOrder]=useState(null)
    const[orders,setOrders]=useState([])
    const[loading,setLoding]=useState(false)
    const navigate=useNavigate()
    const handleLogin=()=>{
        navigate("/")
    }
    const handleShopping=()=>{
        navigate("/home ")
    }
    useEffect(()=>{
        if(token){
        GetOrderDetails()
        }
    },[token])
    const GetOrderDetails=async()=>{
        try{
        setLoding(true)
        const res=await axios.get("https://thecravings.onrender.com/api/order/my-orders",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setOrder(res.data)
            setOrders(res.data?.orders)
        }
        catch(err){
            alert(err.response?.data||err)
        }
        finally{
            setLoding(false)
        }
    }
return (
    <>
    <Header/>
    {loading && (
          <div className="loader-backdrop">
            <div className="loader-card">
              <div className="ring-loader"></div>
              <p>Loading your orders...</p>
            </div>
          </div>
        )}
    {token && orders.length===0 &&( 
    <div className="orders-page">
        {/* Header */}
        <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and view your order history</p>
        </div>

        {/* Empty State */}
        <div className="orders-empty1">
        <div className="empty-icon-wrapper">
            <span className="empty-icon">📦</span>
        </div>

        <h2>No orders yet</h2>
        <p className="empty-sub">
            Start ordering delicious food to see your orders here!
        </p>

        <button className="browse-btn" onClick={handleShopping}>Browse Menu</button>
        </div>
    </div>
    )}

    { ! token &&(
    <section className="orders-empty">
        <div className="orders-box">
        <div className="orders-icon">
            📋
        </div>

        <h2>Login to view orders</h2>
        <p>Sign in to see your order history</p>

        <button className="orders-login-btn" onClick={handleLogin}>Login</button>
        </div>
    </section>)}

    {token && orders.length>0 &&(
        <div className="orders-wrapper">
            <h2 className="orders-title">Hi! {order.userName} </h2>
            <p className="orders-sub">Track and view your order history</p>

            {order.orders.map((item, i) => (
                <div className="order-card" key={i}>
                {/* Left */}
                <div className="order-left">
                    <div className="order-icon">🕒</div>

                    <div className="order-info">
                    <div className="order-id-row">
                        <span className="order-id">{item.orderId}</span>
                        <span className="item-count">{item.dishesCount} items</span>
                    </div>

                    <div className="order-time">{item.date} {item.time}</div>
                    <span className="order-status">{item.orderStatus}</span>
                    </div>
                </div>

                {/* Right */}
                <div className="order-right">
                    <div className="order-amount">₹ {item.totalPrice}</div>

                    <div className="order-images">
                    {item.dishes.slice(0, 3).map((item, i) => (
                        <img key={i} src={item.productImage} alt={item.productName} />
                    ))}

                    {item.dishes.length > 3 && (
                        <div className="more-items">+{item.dishes.length - 3}</div>
                    )}
                    </div>
                </div>
                </div>
            ))}
            </div>
           )}
    <Footer/>
  </>
);
}

export default Order;
