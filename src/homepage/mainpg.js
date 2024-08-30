import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./mainpg.css";
import UserContext from "../accts/userCntx";


function MainPage() {
  const { currUsr } = useContext(UserContext);

  return (
      <div className="MainPage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Jobly</h1>
          <p className="lead">All the jobs in one, convenient place.</p>
          {currUsr
              ? <h2>
                Welcome Back, {currUsr.firstName || currUsr.username}.
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Sign in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Create an account
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default MainPage;
