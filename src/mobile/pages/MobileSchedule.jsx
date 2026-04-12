import { useEffect, useState } from "react";
import MobileHeader from "../components/MobileHeader";
import SearchBar from "../../components/SearchBar";
import "../styles/MobileSchedule.css";
import filterIcon from "../icons/filter.svg";
import FilterContextMenu from "../components/FilterContextMenu";
import { FiMapPin } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { getMySchedule } from "../../redux/slices/leadSlice";

const MobileSchedule = () => {
  const [filterMenu, setFilterMenu] = useState(null);

  const dispatch = useDispatch();
  const { schedule = [] } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(getMySchedule());
  }, [dispatch]);

  return (
    <>
      <MobileHeader type="page" title="Schedule" />
      <FilterContextMenu
        menuPosition={filterMenu}
        setMenuPosition={setFilterMenu}
      />
      <div className="schedule-page">
        <div className="schedule-top">
          <SearchBar className="mobile-search" />

          <div
            className="filter-btn"
            onClick={(e) => {
              e.stopPropagation();
              setFilterMenu({
                x: e.clientX,
                y: e.clientY,
              });
            }}
          >
            <img src={filterIcon} alt="filter" />
          </div>
        </div>

        <div className="schedule-list">
          {schedule.map((item, i) => {
            const isUrgent = i === 0;

            return (
              <div
                key={item._id}
                className={`schedule-card ${isUrgent ? "urgent" : ""}`}
              >
                <div className="schedule-row top-row">
                  <div className="left-block">
                    <p className="title">{item.source}</p>
                    <span className="phone">949-365-6533</span>
                  </div>

                  <div className="right-block">
                    <p className="label">Date</p>
                    <span className="schedule-date">
                      {item.scheduledDate
                        ? new Date(item.scheduledDate).toLocaleDateString()
                        : "--"}
                    </span>
                  </div>
                </div>

                <div className="schedule-row bottom-row">
                  <div className="call">
                    <span className="icon">
                      <FiMapPin />
                    </span>
                    <span className="label">Call</span>
                  </div>

                  <div className="user">
                    <span className="avatar">
                      <img src="https://i.pravatar.cc/40" alt="" />
                    </span>
                    <span className="label">{item.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileSchedule;
