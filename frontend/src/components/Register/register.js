import{useState} from "react";
import api from "../../services/api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "./register.css";
function Register() {
    const [user, setUser] = useState({
    gmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const registerUser = async (e) => {
      e.preventDefault();
    try {
        const response = await api.post("/users/register", user);
        if (response.data === "Register Successful") {
          setUser({
            
                    gmail: "",
                   password: "",
                 });
        toast.success("User registered successfully!");
        navigate("/");
      } else {
        toast.error(response.data);//gmail already exists
      }
    } catch (error) {
        toast.error("Error registering user.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

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

        <button onClick={registerUser}>Register</button>
        <p className="login-link">
          Already have an account? <span  onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;