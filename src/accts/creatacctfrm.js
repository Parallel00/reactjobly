import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/alert";

function UserAccountCreationForm({ signup }) {
  const history = useHistory();
  const [usrDt, setUsrDt] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const result = await signup(usrDt);
    result.success ? history.push("/companies") : setFormErrors(result.errors);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUsrDt((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="UserAccountCreationForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Create an Account</h2>
        <div className="contn">
          <div className="contn-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={usrDt.username}
                  onChange={handleChange}
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
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={usrDt.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={usrDt.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={usrDt.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.length > 0 && <Alert type="danger" messages={formErrors} />}
              <button type="submit" className="btn btn-primary float-right">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountCreationForm;
