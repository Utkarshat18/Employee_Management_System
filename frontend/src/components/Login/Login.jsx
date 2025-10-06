import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copylogininfo = { ...logininfo };
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    console.log(logininfo);
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const url = "http://localhost:8000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logininfo),
      });
      const result = await response.json();
      console.log(result);
      localStorage.setItem("token", result.token);
      const { success, message } = result;
      if (success) {
        navigate("/admin");
      } else {
        alert(message);
      }
    } catch (err) {
      alert("Facing some issue");
      return;
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handlelogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handlechange}
              value={logininfo.email}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={logininfo.password}
              onChange={handlechange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
