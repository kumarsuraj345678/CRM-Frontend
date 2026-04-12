import React, { useEffect, useState } from "react";
import MobileHeader from "../components/MobileHeader";
import "../styles/MobileProfile.css";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../../redux/slices/authSlice";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const MobileProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { firstName, lastName, password, confirmPassword } = form;

      let payload = {};
      let updateCount = 0;

      if (firstName !== user.firstName) {
        payload.firstName = firstName;
        updateCount++;
      }

      if (lastName !== user.lastName) {
        payload.lastName = lastName;
        updateCount++;
      }

      if (password || confirmPassword) {
        if (!password || !confirmPassword) {
          alert("Both password fields required");
          return;
        }

        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        payload.password = password;
        payload.confirmPassword = confirmPassword;
        updateCount++;
      }

      if (updateCount !== 1) {
        alert("Update only one field at a time");
        return;
      }

      setLoading(true);

      const res = await API.put("/auth/update-profile", payload, {
        headers: { userid: user._id },
      });

      dispatch(setUser(res.data.user));

      alert("Updated successfully");

      setForm({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/m/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <MobileHeader type="page" title="Profile" />

      <div className="profile-page">
        {/* Form */}
        <div className="profile-form">
          <div className="input-group">
            <label>First name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Last name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input value={user.email} disabled />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="profile-actions">
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileProfile;
