import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/alert";

function LoginForm({ login }) {
  const history = useHistory();
  const [usrDt, setUsrDt] = useState({ username: "", password: "" });
  const [errs, setErrs] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const result = await login(usrDt);
    result.success ? history.push("/companies") : seterrs(result.errors);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUsrDt((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Login</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={usrDt.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={usrDt.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
              {errs.length > 0 && <Alert type="danger" messages={errs} />}
              <button className="btn btn-primary float-right" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
