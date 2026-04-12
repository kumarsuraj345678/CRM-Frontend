import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import KPISection from "../../components/Dashboard/KPISection";
import SalesChart from "../../components/Dashboard/SalesChart";
import ActivityFeed from "../../components/Dashboard/ActivityFeed";
import SalesPeopleTable from "../../components/Dashboard/SalesPeopleTable";
import {
  fetchDashboardStats,
  fetchSalesData,
  fetchActivities,
  fetchEmployeeStats,
} from "../../redux/slices/dashboardSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { stats, salesData, activities } = useSelector(
    (state) => state.dashboard,
  );
  const { employeeStats } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchSalesData());
    dispatch(fetchActivities());
    dispatch(fetchEmployeeStats());
  }, [dispatch]);

  const { query, page: searchPage } = useSelector((state) => state.search);
  const activeQuery = searchPage === "/dashboard" ? query : "";
  const filteredEmployees = employeeStats.filter((emp) => {
    if (!activeQuery) return true;
    const text = `${emp.firstName} ${emp.lastName} ${emp.email}`;
    return text.toLowerCase().includes(activeQuery.toLowerCase());
  });
  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="breadcrumb">
            <span onClick={() => navigate("/dashboard")} className="home-link">
              Home
            </span>
            <div className="divider">&gt;</div>
            <span>Dashboard</span>
          </div>{" "}
        </div>
        <div className="kpi-container">
          <KPISection stats={stats} />
        </div>
        <div className="dashboard-grid">
          <SalesChart data={salesData} />

          <ActivityFeed activities={activities} />
        </div>
        <SalesPeopleTable employees={filteredEmployees} />
      </div>
    </Layout>
  );
};

export default Dashboard;
