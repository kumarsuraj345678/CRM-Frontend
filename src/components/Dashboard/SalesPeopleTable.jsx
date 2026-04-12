import React from "react";

const SalesPeopleTable = ({ employees }) => {
  return (
    <div className="dashboard-employee-card">
      <div className="dashboard-table-header">
        <span>Name</span>
        <span>Employee ID</span>
        <span className="center">Assigned Leads</span>
        <span className="center">Closed Leads</span>
        <span className="center">Status</span>
        <span></span>
      </div>
      <div className="dashboard-table-body">
        {employees.map((user) => (
          <div className="dashboard-table-row" key={user._id}>
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

            <span className="emp-id">#{user._id.slice(-12).toUpperCase()}</span>

            <span className="center">{user.assignedLeadsCount || 0}</span>

            <span className="center">{user.closedLeadsCount || 0}</span>

            <span className="center">
              <span
                className={
                  user.status === "active" ? "status active" : "status inactive"
                }
              >
                ● {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesPeopleTable;
