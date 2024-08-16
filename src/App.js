import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes/nav";
import Routes from "./routes/routes";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [isInfoLoaded, setIsInfoLoaded] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function loadUserInfo() {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
          setAppliedJobIds(new Set(user.applications));
        } catch (err) {
          console.error("Error loading user information:", err);
          setCurrentUser(null);
        }
      }
      setIsInfoLoaded(true);
    }

    setIsInfoLoaded(false);
    loadUserInfo();
  }, [token]);

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const handleSignup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup failed:", errors);
      return { success: false, errors };
    }
  };

  const handleLogin = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login failed:", errors);
      return { success: false, errors };
    }
  };

  const hasAppliedToJob = (jobId) => appliedJobIds.has(jobId);

  const applyToJob = async (jobId) => {
    if (!hasAppliedToJob(jobId)) {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setAppliedJobIds(new Set([...appliedJobIds, jobId]));
    }
  };

  if (!isInfoLoaded) return <h3>Loading...</h3>;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          hasAppliedToJob,
          applyToJob,
        }}
      >
        <div className="App">
          <Navigation logout={handleLogout} />
          <Routes login={handleLogin} signup={handleSignup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
