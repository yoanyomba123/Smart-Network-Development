import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="text-center">
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" class="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fas fa-black-tie text-info mr-1" /> Add Experience
        </Link>
        <Link to="/add-volunteer" className="btn btn-light">
          <i className="fas fa-server text-info mr-1" /> Add Volunteering
          Experience
        </Link>
      </div>
      <div className="btn-group mb-4" role="group">
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" /> Add Education
        </Link>
        <Link to="/add-projects" className="btn btn-light">
          <i className="fas fa-lock text-info mr-1" /> Add Projects
        </Link>
        <Link to="/add-honors" className="btn btn-light">
          <i className="fas fa-fire text-info mr-1" /> Add Honors
        </Link>
      </div>
    </div>
  );
};

export default ProfileActions;
