import {useState} from "react";
import{Link} from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loginUser = async (e) => {
    try {
      const response = await api.post("/users/login", user);
      if (response.data) {
        localStorage.setItem("token", response.data);
        toast.success("Login successful");
        navigate("/dashboard");
       
      } else {
        toast.error("Invalid gmail or password");
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Student Management Login</h2>

        <label>Gmail</label>
        <input
          type="email"
          name="gmail"
          placeholder="Enter Gmail"
          value={user.gmail}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />

        <button onClick={loginUser}>Login</button>
        <p className="register-text">
          Don't have an account?{" "} <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;