import React, { useEffect, useState } from "react";
import "./Styles/Confirm.css"
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "./Context";
import axios from "axios";

const Confirm=()=>{
    const navigate=useNavigate()
    const [order,setOrder]=useState(null)
    const[loading,setLoading]=useState(false)
    const token=JSON.parse(localStorage.getItem("token"))
    const {state}=useLocation()

    useEffect(()=>{
        GetOrderDetails()
    },[])

    const GetOrderDetails=async()=>{
        try{
        setLoading(true)
        const orderid=state.orderid
        const res=await axios.get(`https://thecravings.onrender.com/api/order/${orderid}`,
            {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        setOrder(res.data)
        }
        catch(err){
            alert(err.response?.data||err)
        }
        finally{
            setLoading(false)
        }
    }
    return(
        <>
        <Header/>
        {loading && (
      <div className="loader-backdrop">
        <div className="loader-card">
          <div className="ring-loader"></div>
          <p>Confirm Your Order...</p>
        </div>
      </div>
    )}
        {!order?(
            <h1>Loading  order items .....</h1>
        ):(
            
        <div className="order-confirm-page">
            {/* SUCCESS ICON */}
            <div className="success-icon">
                <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" />
                    <path fill="none" d="M14 27l7 7 17-17" />
                </svg>
            </div>


            <h2 className="success-title">Order Confirmed!</h2>
            <p className="success-subtitle">
                Your order has been placed successfully
            </p>

            {/* CARD */}
            <div className="order-confirm-card">

                <div className="order-id">
                <span>Order ID</span>
                <strong> {order.order_id}</strong>
                </div>

                <div className="order-info">
                <div className="info-box">
                    <span>⏱ Status</span>
                    <strong>{order.order_status}</strong>
                </div>

                <div className="info-box">
                    <span>📍 Delivery To</span>
                    <strong>
                    {order.delivery_address}
                    </strong>
                </div>
                </div>

                <h4 className="items-title">Order Items</h4>

                <div className="order-items">
                {order.order_items.map((item,i)=>(
                    <div className="order-item" key={i}>
                    <img src={item.image} alt={item.product_name} />
                    <div className="item-info">
                        <h5>{item.product_name}</h5>
                        <span>Qty: {item.quantity}</span>
                    </div>
                    <strong>₹ {item.price}</strong>
                    </div>
                ))}
                </div>

                <div className="total-paid">
                <span>Total Paid</span>
                <strong>₹ {order.total}</strong>
                </div>

                <div className="order-actions">
                <button className="btn-outline" onClick={()=>navigate("/order")}>View Orders →</button>
                <button className="btn-primary" onClick={()=>navigate("/home")}>Continue Shopping</button>
                </div>

            </div>
        </div>)}
        <Footer/>
    </>
    )
}

export default Confirm;