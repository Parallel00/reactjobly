import React, { useState, useEffect } from "react";
//import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import CardList from "./cardlist";


function JobList() {

  const [jobs, setJobs] = useState(null);

  useEffect(function getAndMountJobs() {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return null;

  return (
      <div className="JobList col-md-8 offset-md-2">
        //<Search searchFor={search} />
        {jobs.length
            ? <CardList jobs={jobs} />
            : <p className="lead">No results match your query.</p>
        }
      </div>
  );
}

export default JobList;
