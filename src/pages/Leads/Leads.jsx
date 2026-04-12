import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../redux/slices/leadSlice";
import { useNavigate } from "react-router-dom";
import CSVUploadModal from "../../components/Modal/CSVUploadmodal";
import AddLeadModal from "../../components/Modal/AddLeadModal";
import Pagination from "../../components/Pagination";
import "../../styles/Lead.css";
const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leads, loading, error } = useSelector((state) => state.leads);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const { query, page: searchPage } = useSelector((state) => state.search);
  const activeQuery = searchPage === "/leads" ? query : "";
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);
  console.log("Leads", leads);

  const filteredLeads = leads.filter(
    (lead) =>
      !activeQuery ||
      `${lead.name} ${lead.email} ${lead.source} ${lead.location} ${lead.language}`
        .toLowerCase()
        .includes(activeQuery.toLowerCase()),
  );

  const itemsPerPage = 8;
  const paginatedLeads = filteredLeads.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  useEffect(() => {
    if (searchPage === "/leads") {
    }
    setPage(1);
  }, [query, searchPage]);

  return (
    <Layout>
      <div className="lead-container">
        <div className="lead-header">
          <div className="breadcrumb">
            <span onClick={() => navigate("/")} className="home-link">
              Home
            </span>
            <div className="divider">&gt;</div>
            <span>Leads</span>
          </div>

          <div className="header-actions">
            <button
              className="add-lead-btn"
              onClick={() => setShowAddModal(true)}
            >
              Add Manually
            </button>
            {showAddModal && (
              <AddLeadModal close={() => setShowAddModal(false)} />
            )}
            <button
              className="add-lead-btn"
              onClick={() => setShowCSVModal(true)}
            >
              Add CSV
            </button>
            {showCSVModal && (
              <CSVUploadModal close={() => setShowCSVModal(false)} />
            )}
          </div>
        </div>
        {loading && <p>Loading leads...</p>}
        {error && (
          <p style={{ color: "red" }}>
            {typeof error === "string" ? error : error.message}
          </p>
        )}
        {!loading && leads.length === 0 && (
          <div className="empty-state">No leads found</div>
        )}

        <div className="lead-card">
          <div className="lead-table-header">
            <span>No.</span>
            <span>Name</span>
            <span>Email</span>
            <span>Source</span>
            <span>Date</span>
            <span>Location</span>
            <span>Language</span>
            <span>Assigned To</span>
            <span>Status</span>
            <span>Type</span>
            <span>Scheduled Date</span>
          </div>

          <div className="lead-table-body">
            {paginatedLeads.map((lead, index) => (
              <div className="lead-table-row" key={lead._id}>
                <span className="center-text">
                  {(page - 1) * itemsPerPage + index + 1}
                </span>

                <span>{lead.name}</span>
                <span>{lead.email}</span>
                <span>{lead.source}</span>
                <span>
                  {lead.date
                    ? new Date(lead.date).toLocaleDateString("en-GB")
                    : "-"}
                </span>
                <span>{lead.location}</span>
                <span>{lead.language}</span>
                <span>
                  {lead.assignedTo?.firstName || ""}{" "}
                  {lead.assignedTo?.lastName || ""}
                </span>
                <span className="center-text">
                  {lead.status
                    ? lead.status.charAt(0).toUpperCase() + lead.status.slice(1)
                    : "-"}
                </span>
                <span className="center-text">{lead.type || "-"}</span>
                <span className="center-text">
                  {lead.scheduledDate
                    ? new Date(lead.scheduledDate).toLocaleDateString("en-GB")
                    : "-"}
                </span>
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={filteredLeads.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
