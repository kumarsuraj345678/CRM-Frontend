import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user?.role === "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);
      const data = res.data;

      if (data.user.role !== "admin") {
        alert("Only admin allowed here");
        setLoading(false);
        return;
      }

      localStorage.clear();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(setUser(data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="logo">
          Canova<span>CRM</span>
        </h2>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
