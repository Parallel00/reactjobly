import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import CompCards from "../jobs/CompCards";

function CompanyDetails() {
  const { handle } = useParams();
  const [compDt, setData] = useState(null);

  useEffect(() => {
    function fetchcompDt() {
      const data = await JoblyApi.getCompany(handle);
      setData(data);
    }

    fetchcompDt();
  }, [handle]);

  if (!compDt) return <h3>Please Wait...</h3>;

  return (
    <div className="CompanyDetails col-md-8 offset-md-2">
      <h4>{compDt.name}</h4>
      <p>{compDt.description}</p>
      <CompCards jobs={compDt.jobs} />
    </div>
  );
}

export default CompanyDetails;
