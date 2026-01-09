import "./Styles/Logout.css";
import { useAppContext } from "./Context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate=useNavigate()
  const {setLogout}=useAppContext()
 
  const handleYes = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLogout(false)
    navigate("/");
  };
  
  const handleNo = () => {
    setLogout(false);
  };

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <h3>Logout</h3>
        <p>Are you sure you want to logout?</p>

        <div className="logout-actions">
          <button className="btn-cancel" onClick={() => handleNo()}>
            Cancel
          </button>
          <button className="btn-logout" onClick={() => handleYes()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
