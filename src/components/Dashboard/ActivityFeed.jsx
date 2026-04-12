import React from "react";

const ActivityFeed = ({ activities }) => {
  return (
    <div className="activity-box">
      <h3>Recent Activity Feed</h3>
      <div className="activity-list">
        {activities && activities.length > 0 ? (
          activities.map((a, i) => (
            <div key={i} className="activity-item">
              <span className="dot"></span>
              <p>{a}</p>
            </div>
          ))
        ) : (
          <p>No activity yet</p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
