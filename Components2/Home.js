import React, {useEffect, useState,useRef } from "react";
import "./Styles/Home.css"
import Header from "./Header";
import Footer from "./Footer";
import { types} from "./Data";
import { useAppContext } from "./Context";
import axios from "axios";
import cb from "../assets/cb.png"
import orderSound from "../assets/order-success.mp3"
import teaCoffe from "../assets/tea.mp3"
import milk from "../assets/milk.mp3"

const Home=()=>{
    const {setCartItems,count,setCount}=useAppContext()
    const[loading,setLoading]=useState(false)
    const[popup,setPopup]=useState(false)
    const [add,setAdd]=useState()
    const[Data,setData]=useState([])
    const Type=types;
    const[search,setSearch]=useState("")
    const[filter,setFilter]=useState("all")
    const audioRef = useRef(null);
    const teaAudioRef=useRef(null);
    const milkaudioRef=useRef(null);

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
  const handleAddToCart=(item)=>{
    setCartItems((prev)=>{
      const existing=prev.find((i)=>i.id===item.id)
      if(existing){
        return prev.map((val)=>val.id===item.id?{...val,qty:val.qty+1}:val)
      }
      return [...prev,{...item,qty:1}]
    })
    setCount(count+1)
    setPopup(true)
    setAdd(item.name)
     if (item.name.toLowerCase().includes("chicken")||item.name.toLowerCase().includes("gobi") && audioRef.current) {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }
     else if ((item.name.toLowerCase().includes("tea") || item.name.toLowerCase().includes("coffee")) && teaAudioRef.current) {
    teaAudioRef.current.currentTime = 0;
    teaAudioRef.current.play().catch(() => {});
  }
    else if(item.name.toLowerCase().includes("milk")||item.name.toLowerCase().includes("lassi") && milkaudioRef.current) {
    milkaudioRef.current.currentTime = 0;
    milkaudioRef.current.play().catch(() => {});
  }
    setTimeout(()=>{
      setPopup(false)
    },2000)
  }
  useEffect(()=>{
    handleGetData()
  },[])

  const handleGetData=async()=>{
    setLoading(true)
    try{
    const res = await axios.get("https://thecravings.onrender.com/api/dishes/all",)
    setData(res.data.data)
  }
  catch(err){
    alert(err.response?.data.message)
  }
  finally{
    setLoading(false)
  }
}
 const filterData=Data.filter((item)=>{
    const searching=item.name.toLowerCase().includes(search.toLowerCase())
    const filtering= filter==="all"?true:item.category.toLowerCase()===filter.toLowerCase()
      return searching&&filtering
})

return (
  <>
  <Header/>
  <audio ref={audioRef} src={orderSound} preload="auto" />
  <audio ref={teaAudioRef} src={teaCoffe} preload="auto" />
  <audio ref={milkaudioRef} src={milk} preload="auto" />

    {loading && (
      <div className="loader-backdrop">
        <div className="loader-card">
          <div className="ring-loader"></div>
          <p>Loading delicious food...</p>
        </div>
      </div>
    )}
    {popup &&(
      <div className="cart-toast">
        <h4>Added to cart</h4>
        <p>{add} has been added to your cart.</p>
      </div>
    )}


    {/* HERO SECTION */}
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">✨ Fresh & Delicious</span>

        <h1 className="hero-title">
          Delicious Food, <br />
          <span>Delivered Fast</span>
        </h1>

        <p className="hero-subtitle">
          Order from the best local restaurants with easy, on-demand
          delivery. Fresh ingredients, amazing flavors.
        </p>

        <div className="hero-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for food..."
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hero-right">
        <img
          src={cb}
          alt="Biryani Bowl"
          className="hero-biryani"
        />
      </div>
    </section>


    {/* POPULAR SECTION */}
    <section className="popular-section">
      <h2 className="section-title">
        <span>📈</span> Popular Right Now
      </h2>

      <div className="popular-grid">
        {Data.filter((item)=>item.ispopular===true).map((item, i) => (
          <div className="food-card" key={i}>
            <div className="image-wrap">
              <img src={item.image_url} alt={item.name} />
              <span className="tag popular">Popular</span>
              <span className={`tag type ${item.category}`}>{item.category}</span>
               <span className="plus-trigger">
              <span className="hover-plus" title="Add to cart" onClick={()=>handleAddToCart(item)}>+</span>
              </span>
            </div>

            <div className="card-body">
              <div className="card-header">
                <h3>{item.name}</h3>
                <span className="rating">⭐ {item.rating}</span>
              </div>

              <p className="desc">{item.description}</p>
              <div className="price-row">
                <span className="price">₹ {item.price}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="menu-section">
      <h2 className="menu-title">Explore Our Menu</h2>

      <div className="menu-filters">
        {Type.map((item)=>(
        <button className={`filter ${(filter===item.val)?"active":""}`} onClick={()=>setFilter(item.val)}>{item.name}</button>
        ))}
      </div>
      {filterData.length>0 ?(
      <div className="menu-grid">
        {filterData.map((item, i) => (
          <div className="menu-card" key={i}>
            <div className="menu-img">
              <img src={item.image_url} alt={item.name} />
              {item.ispopular===true && <span className="tag popular">Popular</span>}
              <span className={`tag type ${item.category}`}>{item.category}</span>
              <span className="plus-trigger">
              <span className="hover-plus" title="Add to cart" onClick={()=>handleAddToCart(item)}>+</span>
              </span>
            </div>

            <div className="menu-body">
              <div className="menu-head">
                <h3>{item.name}</h3>
                <span className="rating">⭐ {item.rating}</span>

              </div>

              <p>{item.description}</p>

              <div className="price-row">
                <span className="price">${item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      ):(
        <div className="no-items">
          <span className="no-icon">😔</span>
          <h3>No items available</h3>
          <p>Try changing the search or filter</p>
        </div>
      )}
    </section>
    <>
    <Footer/>
    </>
  </>
);

}

export default Home;
