import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "../homepage/mainpg";
import CompanyList from "../companies/list";
import JobList from "../jobs/joblist";
import Dets from "../companies/details";
import LoginForm from "../accts/loginfrm";
import UserProfileFrm from "../profiles/usrprofform";
import UserAccountCreationForm from "../accts/creatacctfrm";
import PrivRoute from "./privRt";


function Routes({ login, signup }) {

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <MainPage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <UserAccountCreationForm signup={signup} />
          </Route>

          <PrivRoute exact path="/companies">
            <CompanyList />
          </PrivRoute>

          <PrivRoute exact path="/jobs">
            <JobList />
          </PrivRoute>

          <PrivRoute exact path="/companies/:handle">
            <Dets />
          </PrivRoute>

          <PrivRoute path="/profile">
            <UserProfileFrm />
          </PrivRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
