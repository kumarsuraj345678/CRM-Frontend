import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createEmployee,
  fetchEmployees,
} from "../../redux/slices/employeeSlice";
import { FiInfo } from "react-icons/fi";
import "../../styles/AddEmployeeModal.css";
import { fetchEmployeeStats } from "../../redux/slices/dashboardSlice";

const AddEmployeeModal = ({ close }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    language: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createEmployee(form)).unwrap();
      dispatch(fetchEmployees(1));
      dispatch(fetchEmployeeStats());
      close();
    } catch (error) {
      console.log("Create failed:", error);
    }
  };

  const isDisabled =
    !form.firstName || !form.email || !form.location || !form.language;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Employee</h2>
          <button className="close-btn" onClick={close}>
            ✕
          </button>
        </div>

        <div className="modal-body">
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
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Preferred Language</label>
            <div className="input-row">
              <input
                name="language"
                value={form.language}
                onChange={handleChange}
              />
              <FiInfo className="info-icon" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="employee-save-btn"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
