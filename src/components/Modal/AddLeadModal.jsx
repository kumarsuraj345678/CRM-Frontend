import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLead, fetchLeads } from "../../redux/slices/leadSlice";
import { CgClose } from "react-icons/cg";

import "../../styles/AddLeadModal.css";

const AddLeadModal = ({ close }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    date: "",
    location: "",
    language: "",
  });

  const isValid = form.name && form.email;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await dispatch(createLead(form));
    dispatch(fetchLeads());
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Lead</h2>
          <button className="close-btn" onClick={close}>
            <CgClose />
          </button>
        </div>

        <div className="modal-form">
          <div className="lead-form-group">
            <label>Name</label>
            <input name="name" onChange={handleChange} />
          </div>

          <div className="lead-form-group">
            <label>Email</label>
            <input name="email" onChange={handleChange} />
          </div>

          <div className="lead-form-group">
            <label>Source</label>
            <input name="source" onChange={handleChange} />
          </div>

          <div className="lead-form-group">
            <label>Date</label>
            <input type="date" name="date" onChange={handleChange} />
          </div>

          <div className="lead-form-group">
            <label>Location</label>
            <input name="location" onChange={handleChange} />
          </div>

          <div className="lead-form-group">
            <label>Preferred Language</label>
            <input name="language" onChange={handleChange} />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className={`lead-save-btn ${isValid ? "active" : ""}`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;
