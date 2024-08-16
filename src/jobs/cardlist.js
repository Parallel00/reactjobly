import React from "react";
import OccuCard from "./occucard";


function CardList({ jobs, apply }) {

  return (
      <div className="crdList">
        {jobs.map(job => (
            <OccuCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
        ))}
      </div>
  );
}

export default CardList;
