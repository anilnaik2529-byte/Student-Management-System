import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar(){
  const navigate = useNavigate();
const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

return(
<nav className="navbar">
<h2>Student Management System</h2>
<button className="logout-btn" onClick={logout}>
  Logout
</button>
</nav>
);
}
export default Navbar;