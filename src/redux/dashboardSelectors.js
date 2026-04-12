export const getDashboardStats = (employees, leads) => {
  const unassigned = leads.filter((l) => !l.assignedTo).length;

  const thisWeek = new Date();
  const weekStart = new Date(thisWeek.setDate(thisWeek.getDate() - 7));

  const assignedThisWeek = leads.filter(
    (l) => new Date(l.assignedAt) >= weekStart,
  ).length;

  const activeSales = employees.filter((e) => e.status === "Active").length;

  const assignedLeads = leads.filter((l) => l.assignedTo).length;
  const closedLeads = leads.filter((l) => l.status === "Closed").length;

  const conversionRate = assignedLeads
    ? Math.round((closedLeads / assignedLeads) * 100)
    : 0;

  return {
    unassigned,
    assignedThisWeek,
    activeSales,
    conversionRate,
  };
};
