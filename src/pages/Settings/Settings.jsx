import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import API from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Settings.css";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer || {});
  const user = auth.user;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "**********",
    confirmPassword: "**********",
  });

  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      }));
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }
  if (user.role !== "admin") {
    return (
      <Layout>
        <div style={{ padding: "20px" }}>Access Denied (Admin only)</div>
      </Layout>
    );
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setChanged(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { firstName, lastName, password, confirmPassword } = form;

      let payload = {};
      let updateCount = 0;

      if (firstName && firstName !== user.firstName) {
        payload.firstName = firstName;
        updateCount++;
      }

      if (lastName && lastName !== user.lastName) {
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
        alert("You can update only one field at a time");
        return;
      }

      const userId = user._id;

      const res = await API.put("/auth/update-profile", payload, {
        headers: {
          userid: userId,
        },
      });
      dispatch(setUser(res.data.user));

      alert("Updated successfully");
      dispatch(setUser(res.data.user));
      setForm({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        password: "",
        confirmPassword: "",
      });
      setChanged(false);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="breadcrumb">
        <span onClick={() => navigate("/dashboard")} className="home-link">
          Home
        </span>
        <div className="divider">&gt;</div>
        <span>Settings</span>
      </div>
      <div className="settings-container">
        <div className="settings-card">
          <h2>Edit Profile</h2>

          <div className="form">
            <div className="form-group">
              <label>First name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="actions">
              <button
                className="settings-save-btn"
                onClick={handleSubmit}
                disabled={!changed || loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
