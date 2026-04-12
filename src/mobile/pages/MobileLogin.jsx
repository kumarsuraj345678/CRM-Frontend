import React, { useEffect, useState } from "react";
import "../styles/MobileLogin.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const MobileLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (storedUser && storedUser.role === "employee") {
      navigate("/m");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      if (res.data.user.role !== "employee") {
        alert("Only employees can login");
        setLoading(false);
        return;
      }
      if (res.data.user.role !== "employee") {
        alert("Only employees can login");
        return;
      }
      localStorage.setItem("employeeToken", res.data.token);
      localStorage.setItem("employee", JSON.stringify(res.data.user));

      dispatch(setUser(res.data.user));

      navigate("/m");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-login">
      <div className="login-box">
        <h2>
          Canova<span>CRM</span>
        </h2>

        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MobileLogin;
