import React, { useState, useContext } from "react";
import Alert from "../common/alert";
import JoblyApi from "../api/api";
import UserContext from "../accts/userCntx";
import useTimedToggle from "../hooks/useTimedMessage";

function UserProfileFrm() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [formInfo, setInfo] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    username: currUser.username,
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [updateConfirmed, setUpdateConfirmed] = useTimedToggle();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { firstName, lastName, email, password, username } = formInfo;
    const profileData = { firstName, lastName, email, password };

    try {
      const updatedUser = await JoblyApi.saveProfile(username, profileData);
      setInfo(f => ({ ...f, password: "" }));
      setErrors([]);
      setUpdateConfirmed(true);
      setCurrUser(updatedUser);
    } catch (err) {
      setErrors(err);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setInfo(f => ({ ...f, [name]: value }));
    setErrors([]);
  };

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formInfo.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formInfo.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formInfo.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formInfo.password}
                onChange={handleInputChange}
              />
            </div>

            {errors.length > 0 && <Alert type="danger" messages={errors} />}
            {updateConfirmed && <Alert type="success" messages={["Profile updated successfully."]} />}

            <button className="btn btn-primary btn-block mt-4">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfileFrm;
