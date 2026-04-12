import MobileHeader from "../components/MobileHeader";
import "../styles/Home.css";
import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.authReducer);
  const userId = user?._id;
  const [attendance, setAttendance] = useState(null);
  const [breakData, setBreakData] = useState(null);
  const [breakLogs, setBreakLogs] = useState([]);
  const [activities, setActivities] = useState([]);

  const fetchActivities = useCallback(async () => {
    try {
      const { data } = await API.get("/activity/my", {
        headers: { userid: userId },
      });

      setActivities(data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchActivities();
    }
  }, [userId, fetchActivities]);
  const formatTime = (time) => {
    if (!time) return "--:--";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchTodayStatus = useCallback(async () => {
    try {
      const { data } = await API.get("/attendance/today", {
        headers: { userid: userId },
      });
      setAttendance(data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchTodayStatus();
    }
  }, [userId, fetchTodayStatus]);

  const handleCheckIn = async () => {
    try {
      const { data } = await API.post(
        "/attendance/toggle",
        {},
        {
          headers: { userid: userId },
        },
      );

      setAttendance(data);
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
    }
  };

  const fetchBreakData = useCallback(async () => {
    try {
      const { data } = await API.get("/break/today", {
        headers: { userid: userId },
      });

      setBreakData(data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  const fetchBreakLogs = useCallback(async () => {
    try {
      const { data } = await API.get("/break/logs", {
        headers: { userid: userId },
      });

      setBreakLogs(data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBreakData();
      fetchBreakLogs();
    }
  }, [userId, fetchBreakData, fetchBreakLogs]);

  const handleBreakClick = async () => {
    try {
      const { data } = await API.post(
        "/break/toggle",
        {},
        {
          headers: { userid: userId },
        },
      );

      setBreakData(data);
      fetchBreakLogs();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return Math.floor(diff / 60) + " min ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " hr ago";

    return Math.floor(diff / 86400) + " day ago";
  };

  return (
    <>
      <MobileHeader type="home" name="Rajesh Mehta" />
      <div className="home">
        <section>
          <div className="timing-section">
            <h3 className="section-title">Timings</h3>

            <div className="timing-card">
              <div className="timing-row">
                {/* LEFT SIDE */}
                <div className="timing-left">
                  <div className="time-block">
                    <p>Check in</p>
                    <span>{formatTime(attendance?.checkInTime)}</span>
                  </div>

                  <div className="time-block">
                    <p>Check Out</p>
                    <span>{formatTime(attendance?.checkOutTime)}</span>
                  </div>
                </div>

                <div
                  className={`status-pill ${attendance?.checkOutTime ? "red" : attendance?.checkInTime ? "green" : ""}`}
                  onClick={handleCheckIn}
                ></div>
              </div>
            </div>
          </div>

          <div className="break-section">
            <div className="break-logs-container">
              <div className="break-card">
                <div className="break-row">
                  <div className="break-left">
                    <div className="time-block">
                      <p>Break</p>
                      <span>{formatTime(breakData?.breakStart)}</span>
                    </div>

                    <div className="time-block">
                      <p>Ended</p>
                      <span>{formatTime(breakData?.breakEnd)}</span>
                    </div>
                  </div>

                  <div
                    className={`status-pill ${breakData?.breakEnd ? "red" : breakData?.breakStart ? "green" : ""}`}
                    onClick={breakData?.breakEnd ? undefined : handleBreakClick}
                  ></div>
                </div>
              </div>

              <div className="break-logs">
                {breakLogs.map((item) => (
                  <div key={item._id} className="break-item">
                    <div className="break-item-left">
                      <div>
                        <p>Break</p>
                        <p>{formatTime(item.breakStart)}</p>
                      </div>
                      <div>
                        <p>Ended</p>
                        <p>{formatTime(item.breakEnd)}</p>
                      </div>
                    </div>
                    <div className="break-date">
                      <p>Date</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recent-activity-section">
            <h3 className="section-title">Recent Activity</h3>

            <div className="recent-activity-box">
              <div className="recent-activity-list">
                {activities && activities.length > 0 ? (
                  activities.slice(0, 7).map((a) => (
                    <div key={a._id} className="recent-activity-item">
                      <span className="dot"></span>
                      <p>
                        <span style={{ marginRight: "6px" }}>
                          {a.message} -{" "}
                          <span style={{ fontSize: "12px", color: "#999" }}>
                            {getTimeAgo(a.createdAt)}
                          </span>
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="empty">No activity yet</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
