import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  deleteEmployees,
} from "../../redux/slices/employeeSlice";
import AddEmployeeModal from "../../components/Modal/AddEmployeeModal";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import "../../styles/Employees.css";
import { fetchEmployeeStats } from "../../redux/slices/dashboardSlice";
import API from "../../services/api";
import ContextMenu from "../../components/ContextMenu";
import { HiDotsVertical } from "react-icons/hi";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState({});
  const { employees } = useSelector((state) => state.employees);

  const { employeeStats = [] } = useSelector((state) => state.dashboard);

  const { query, page: searchPage } = useSelector((state) => state.search);

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchEmployeeStats());
  }, [dispatch]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selected.length === paginatedEmployees.length) {
      setSelected([]);
    } else {
      const allIds = paginatedEmployees.map((emp) => emp._id);
      setSelected(allIds);
    }
  };
  const sortedEmployees = [...employees].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const mergedEmployees = sortedEmployees.map((emp) => {
    const stat = employeeStats.find((s) => s._id === emp._id);

    return {
      ...emp,
      assignedLeadsCount: stat?.assignedLeadsCount || 0,
      closedLeadsCount: stat?.closedLeadsCount || 0,
    };
  });
  const activeQuery = searchPage === "/employees" ? query : "";

  const filteredEmployees = mergedEmployees.filter(
    (emp) =>
      !activeQuery ||
      `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.language}`
        .toLowerCase()
        .includes(activeQuery.toLowerCase()),
  );
  const itemsPerPage = 8;
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  useEffect(() => {
    if (searchPage === "/employees") {
      setPage(1);
    }
  }, [query, searchPage]);
  console.log(
    "FINAL ORDER:",
    employees.map((e) => ({
      name: e.firstName,
      createdAt: e.createdAt,
    })),
  );

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await API.put(`/employees/${id}/status`, {
        status: newStatus,
      });
      dispatch(fetchEmployees());
      dispatch(fetchEmployeeStats());
    } catch (error) {
      console.log("Status update failed", error);
    }
  };
  return (
    <Layout>
      <div className="employee-container">
        <div className="employee-header">
          <div className="breadcrumb">
            <span onClick={() => navigate("/")} className="home-link">
              Home
            </span>
            <div className="divider">&gt;</div>
            <span>Employees</span>
          </div>

          <button
            className="add-employee-btn"
            onClick={() => setShowModal(true)}
          >
            Add Employees
          </button>
        </div>

        {showModal && <AddEmployeeModal close={() => setShowModal(false)} />}
        <div className="employee-card">
          <div className="table-header">
            <span className="center checkbox-cell">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={
                    paginatedEmployees.length > 0 &&
                    selected.length === paginatedEmployees.length
                  }
                  onChange={handleSelectAll}
                />
                <span className="checkmark"></span>
              </label>
            </span>
            <span>Name</span>
            <span>Employee ID</span>
            <span className="center">Assigned Leads</span>
            <span className="center">Closed Leads</span>
            <span className="center">Status</span>
            <span></span>
          </div>

          <ContextMenu
            menuPosition={menuPosition}
            setMenuPosition={setMenuPosition}
            selectedCount={selected.length}
            onDelete={() => {
              if (selected.length > 0) {
                dispatch(deleteEmployees(selected));
                setSelected([]);
              }
            }}
          />
          {paginatedEmployees.map((user) => (
            <div
              className="table-row"
              key={user._id}
              onClick={() => setMenuPosition({})}
            >
              <span className="checkbox-cell">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.includes(user._id)}
                    onChange={() => handleSelect(user._id)}
                  />
                  <span className="checkmark"></span>
                </label>
              </span>

              <div className="name-cell">
                <div className="avatar">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </div>

                <div className="name-info">
                  <p className="emp-name">
                    {user.firstName} {user.lastName}
                  </p>
                  <span className="emp-email">{user.email}</span>
                </div>
              </div>

              <span className="emp-id">
                #{user._id.slice(-12).toUpperCase()}
              </span>

              <span className="center">{user.assignedLeadsCount || 0}</span>

              <span className="center">{user.closedLeadsCount || 0}</span>

              <span className="center">
                <span
                  className={
                    user.status === "active"
                      ? "status active"
                      : "status inactive"
                  }
                  onClick={() => handleStatusToggle(user._id, user.status)}
                >
                  ● {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </span>

              <span
                className={`dots ${selected.includes(user._id) ? "active" : "disabled"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!selected.includes(user._id)) return;

                  setMenuPosition({
                    left: e.clientX,
                    top: e.clientY,
                  });
                }}
              >
                <HiDotsVertical />
              </span>
            </div>
          ))}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={filteredEmployees.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Layout>
  );
};

export default Employees;
