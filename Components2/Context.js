import { createContext, useContext,useState } from "react";
const AppContext=createContext()

const AppProvider=({children})=>{
    const[count,setCount]=useState(0)
    const[cartItems,setCartItems]=useState([])
    const[logout,setLogout]=useState(false)

    return(
        <AppContext.Provider value={{cartItems,setCartItems,count,setCount,setLogout,logout}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider;

export const useAppContext=()=>
    useContext(AppContext);
