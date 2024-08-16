import React, { useContext, useState, useEffect } from "react";
import "./OccuCard.css";
import UserContext from "../accts/UserContext";

function OccuCard({ id, title, salary, equity, companyName }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const appliedStatus = hasAppliedToJob(id);
    setIsApplied(appliedStatus);
  }, [id, hasAppliedToJob]);

  const handleJobApply = async () => {
    if (isApplied) return;
    await applyToJob(id);
    setIsApplied(true);
  };

  return (
    <div className="OccuCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleJobApply}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

function formatSalary(salary) {
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default OccuCard;
