import React from "react";
import assigned from "../../assets/icons/assigned.svg";
import unassigned from "../../assets/icons/unassigned.svg";
import active from "../../assets/icons/active.svg";
import conversion from "../../assets/icons/conversion.svg";

const KPISection = ({ stats }) => {
  const cards = [
    { title: "Unassigned Leads", value: stats.unassigned, icon: unassigned },
    {
      title: "Assigned This Week",
      value: stats.assignedThisWeek,
      icon: assigned,
    },
    { title: "Active Salespeople", value: stats.activeUsers, icon: active },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: conversion,
    },
  ];
  return (
    <>
      {cards.map((card, i) => (
        <div key={i} className="kpi-card">
          <div className="kpi-row">
            <img src={card.icon} alt="icon" />
            <div className="kpi-text">
              <p>{card.title}</p>
              <h2>{card.value}</h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default KPISection;
