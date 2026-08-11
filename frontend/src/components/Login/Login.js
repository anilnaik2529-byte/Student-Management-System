import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
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
    e.preventDefault();

    try {
      const response = await api.post("/users/login", user);

      if (response.data === "Invalid Gmail or Password") {
        toast.error("Invalid Gmail or Password");
        return;
      }

      localStorage.setItem("token", response.data);

      setUser({
        gmail: "",
        password: "",
      });

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Server error");
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
          autoComplete="off"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <button onClick={loginUser}>Login</button>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;