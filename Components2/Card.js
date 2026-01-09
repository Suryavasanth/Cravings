import React, { useEffect } from "react";
import "./Styles/Card.css"
import Header from "./Header";
import Footer from "./Footer";
import { useAppContext } from "./Context";
import { useNavigate } from "react-router-dom";

const Card=()=>{
        const navigate=useNavigate();
        const token=JSON.parse(localStorage.getItem("token"))
        const {cartItems,setCartItems,count,setCount}=useAppContext()

        const handleIncrease=(item)=>{
          setCartItems(
            cartItems.map((val)=>(
              item.name===val.name?{...val,qty: val.qty+1}:val)))
              setCount((prev)=>prev+1)
            }
        
        const handleDecrease=(item)=>{
          setCartItems((prev)=>{
            if(item.qty===1){
              return prev.filter((val)=>!(item.name===val.name&&val.qty===1))
            }
            return prev.map((val)=>
              item.name===val.name&&val.qty>1?{...val,qty:val.qty-1}:val
              )
          })
          setCount((prev)=>prev-1)
        }

        let subtotal=0
        cartItems.map((item)=>{
        subtotal=subtotal+item.price*item.qty
        }) 
        const tax=Math.floor(subtotal*0.05)
        const deliveryFee=subtotal<500?45:0
        const showDeliveryFee=deliveryFee==0?"free":45
        const Total=subtotal+tax+deliveryFee


        const handleProceed=(total,subtotal,tax,deliveryFee)=>{
          if(token){
            navigate("/checkout",{state:{total:total,subtotal:subtotal,tax:tax,deliveryFee:deliveryFee}})
          }
          else{
          navigate("/")
        }
      }
      const handleRemove=(name)=>{
        const remove=cartItems.find(item=>item.name===name)
        setCartItems(cartItems.filter((item)=>item.name!==name))
        setCount((prev)=>prev-remove.qty)
        }      
    return (
    <>
    <Header/>
    {cartItems.length>0 ?
    (
        <div className="cart-wrapper">
      {/* LEFT */}
      <div className="cart-left">
        <h2>Your Cart</h2>
        <p className="cart-sub">You have {cartItems.length} items in your cart</p>

        {cartItems.map((item,i) => ( 
          <div className="cart-card" key={i}>
            <img src={item.image_url} alt={item.name} />

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>

              <div className="qty-box">
                <button onClick={()=>handleDecrease(item)}>-</button>
                <span>{item.qty}</span>
                <button onClick={()=>handleIncrease(item)}>+</button>
              </div>
            </div>

            <div className="cart-price">
             ₹ {item.price*item.qty}
              <span className="delete" onClick={()=>handleRemove(item.name)}>🗑</span>
            </div>
          </div>
         ))} 
      </div>

      {/* RIGHT */}
      <div className="cart-right">
        <h3>Order Summary</h3>

          <div className="summary-row" >
            <span>Subtotal ({count} items)</span>
            <span>₹ {subtotal}</span>
          </div>
          <div className="summary-row" >
            <span>Delivery Fee</span>
            <span className="free-text"> {showDeliveryFee}</span>
          </div>
          <div className="summary-row" >
            <span>Tax</span>
            <span>₹ {tax}</span>
          </div>

        <div className="free-box">
          Use Credit Card to get more offers!
        </div>

        <div className="summary-total">
          <span>Total</span>
          <span>₹ {Total}</span>
        </div>

        <button className="checkout-btn" onClick={()=>handleProceed(Total,subtotal,tax,deliveryFee)}>
          {token?"Proceed to Checkout":"Login to Checkout"}
        </button>
      </div>
    </div>
    ):(<section className="cart-page">
        {/* Top title */}
        <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
        </div>

        {/* Center Empty State */}
        <div className="empty-cart">
        <div className="empty-icon">
            🛍️
        </div>
        <div className="empty-content">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items yet.</p>

        <button className="browse-btn" onClick={()=>navigate("/home")}>
            Browse Menu <span>→</span>
        </button>
        </div>
        </div>
    </section>)}
    <Footer/>
    </>
);

}

export default Card;