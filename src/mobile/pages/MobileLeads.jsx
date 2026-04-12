import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import MobileHeader from "../components/MobileHeader";
import "../styles/MobileLeads.css";
import schedule from "../icons/schedule.svg";
import leadType from "../icons/leadType.svg";
import dateTime from "../icons/dateTime.svg";
import leadStatus from "../icons/leadStatus.svg";
import { useEffect, useState } from "react";
import TypeContextMenu from "../components/TypeContextMenu";
import DateContextMenu from "../components/DateContextMenu";
import StatusContextMenu from "../components/StatusContextMenu";

import { useDispatch } from "react-redux";
import API from "../../services/api";
import { fetchMyLeads, updateLeadLocal } from "../../redux/slices/leadSlice";

const MobileLeads = () => {
  const dispatch = useDispatch();
  const [activeLead, setActiveLead] = useState(null);

  const [typeMenu, setTypeMenu] = useState(null);
  const [dateMenu, setDateMenu] = useState(null);
  const [statusMenu, setStatusMenu] = useState(null);

  const { leads } = useSelector((state) => state.leads);

  const myLeads = leads;

  const { query } = useSelector((state) => state.search);

  const filteredMyLeads = myLeads.filter((lead) => {
    if (!query) return true;

    return (
      lead.name.toLowerCase().includes(query.toLowerCase()) ||
      lead.email.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleUpdateLead = async (leadId, updates) => {
    try {
      dispatch(updateLeadLocal({ id: leadId, updates }));

      await API.put(`/leads/${leadId}`, updates);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const token = localStorage.getItem("employeeToken");

  useEffect(() => {
    if (token) {
      dispatch(fetchMyLeads());
    }
  }, [token, dispatch]);

  return (
    <>
      <MobileHeader type="page" title="Leads" />
      <div className="leads-page">
        <section>
          <div className="search-box">
            <SearchBar className="mobile-search" />
          </div>
          <TypeContextMenu
            menuPosition={typeMenu}
            setMenuPosition={setTypeMenu}
            onSelectType={(type) => {
              if (!activeLead) return;
              handleUpdateLead(activeLead._id, { type });
              setTypeMenu(null);
            }}
          />
          <DateContextMenu
            menuPosition={dateMenu}
            setMenuPosition={setDateMenu}
            onSave={({ date, time }) => {
              if (!activeLead) return;
              handleUpdateLead(activeLead._id, {
                scheduledDate: date,
                scheduledTime: time,
              });
              setDateMenu(null);
            }}
          />
          <StatusContextMenu
            menuPosition={statusMenu}
            setMenuPosition={setStatusMenu}
            onSave={(status) => {
              if (!activeLead) return;
              handleUpdateLead(activeLead._id, { status });
              setStatusMenu(null);
            }}
          />
          <div className="leads-list">
            {filteredMyLeads.map((lead, i) => {
              const typeClass = lead.type.toLowerCase();
              return (
                <div
                  key={i}
                  className={`m-lead-card ${lead.status === "Closed" ? "closed" : ""}`}
                >
                  <div className={`lead-strip ${typeClass}`}></div>

                  <div className="lead-content">
                    <div className="lead-top">
                      <div>
                        <h4>
                          {lead.name || `${lead.firstName} ${lead.lastName}`}
                        </h4>
                        <p>{lead.email}</p>
                      </div>

                      <div className={`status-circle ${typeClass}`}>
                        {lead.status}
                      </div>
                    </div>

                    <div className="lead-bottom">
                      <span className="date">
                        <img src={schedule} alt="date" className="date-icon" />
                        <span>
                          {lead.scheduledDate
                            ? new Date(lead.scheduledDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "2-digit",
                                },
                              )
                            : "--"}
                        </span>
                      </span>

                      <div className="icons">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLead(lead);
                            setTypeMenu({
                              x: e.clientX,
                              y: e.clientY,
                              lead,
                            });
                          }}
                        >
                          <img src={leadType} alt="" />
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLead(lead);
                            setDateMenu({
                              x: e.clientX,
                              y: e.clientY,
                              lead,
                            });
                          }}
                        >
                          <img src={dateTime} alt="" />
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLead(lead);
                            setStatusMenu({
                              x: e.clientX,
                              y: e.clientY,
                              lead,
                            });
                          }}
                        >
                          <img src={leadStatus} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredMyLeads.length === 0 && (
            <p className="no-data">No leads found</p>
          )}
        </section>
      </div>
    </>
  );
};

export default MobileLeads;
