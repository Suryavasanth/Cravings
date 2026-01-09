import React, { useRef } from "react";
import "./Styles/Checkout.css"
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "./Context";
import axios from "axios";

const Checkout=()=>{
    const navigate=useNavigate()
    const token=JSON.parse(localStorage.getItem("token"))
    const userid=JSON.parse(localStorage.getItem("userid"))

    const {cartItems,setCartItems,setCount}=useAppContext()
    const {state}=useLocation()
    const delivery=useRef()
    const cod=useRef()
    const card=useRef()
    const showDeliveryFee=state.deliveryFee==0?"free":45

    const handleOrder=async()=>{
        try{
      const Delivery=delivery.current.value
      let payment="";
      if(cod.current.checked) payment=cod.current.value;
      else if(card.current.checked) payment=card.current.value;
       
      const dishes=cartItems.map((item)=>{
        return {productid:item.id,quantity:item.qty,price:item.price}
      })
      const summary={
        "subtotal":state.subtotal,
        "delivery_fee":state.deliveryFee,
        "tax":state.tax,
        "total":state.total
      }
      console.log(dishes,summary,payment,Delivery,"=====datass")

      const res=await axios.post("https://thecravings.onrender.com/api/order/add",{
        "user_id":userid,
        "dishes":dishes,
        "summary":summary,
        "payment_method":payment,
        "address":Delivery
      },{
        headers:{
            Authorization:`Bearer ${token}`,
        }
      })
      const orderid=res.data.order_id
      alert(res.data.message)
      setCartItems([])
      setCount(0)
      navigate("/confirm",{state:{orderid:orderid}})
    }
    catch(err){
        alert(err.response?.data.message)
    }
}
    return(
        <>
        <Header/>
        <div className="checkout-page">
            <div className="checkout-header">
                ← <span>Back to Cart</span>
            </div>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
            {/* LEFT */}
            <div className="checkout-left">

            {/* Address */}
            <div className="checkout-card">
                <h3 className="card-title">
                <span className="icon">📍</span> Delivery Address
                </h3>
                <label className="label">Full Address</label>
                <input type="text" className="input" placeholder="Enter your delivery address" ref={delivery}/>
            </div>

            {/* Payment */}
            <div className="checkout-card">
                <h3 className="card-title">
                <span className="icon">💳</span> Payment Method
                </h3>

                <label className="payment-option">
                <input type="radio" name="payment" value="CARD" ref={card}/>
                <div>
                    <h4>Credit/Debit Card</h4>
                    <p>Pay securely with your card</p>
                </div>
                </label>

                <label className="payment-option">
                <input type="radio" name="payment" value="CASH_ON_DELIVERY" ref={cod}/>
                <div>
                    <h4>Cash on Delivery</h4>
                    <p>Pay when you receive your order</p>
                </div>
                </label>
            </div>
            </div>

            {/* RIGHT */}
            <div className="checkout-right">
            <h3 className="card-title">Order Summary</h3>

            <div className="order-items">
                {cartItems.map((item,i)=>(
                <div className="order-item" key={i}>
                    <img src={item.image_url} alt={item.name} />
                    <div>
                    <h4>{item.name}</h4>
                    <span>{item.price} x {item.qty}</span>
                    </div>
                    <strong>₹ {item.price*item.qty}</strong>
                </div>
                ))}
            </div>

            <div className="order-totals">
                <div><span>Subtotal</span><span>₹ {state.subtotal}</span></div>
                <div><span>Delivery Fee</span><span className="free">₹ {showDeliveryFee}</span></div>
                <div><span>Tax</span><span>₹ {state.tax}</span></div>
                <div className="total">
                <span>Total</span>
                <span>₹ {state.total}</span>
                </div>
            </div>

            <button className="place-order" onClick={handleOrder}>Place Order →</button>
            </div>
        </div>
    </div>
    <Footer/>
    </>

    )
}

export default Checkout;