import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import dateFormat from "dateformat";
import { deleteProject } from "../../actions/profile.action";

class Project extends Component {
  onDeleteClick(id) {
    this.props.deleteProject(id);
  }
  render() {
    const Project = this.props.project.map(proj => (
      <tr key={proj._id}>
        <td>{proj.projecttitle}</td>
        <td>
          {dateFormat(proj.from, "dd, mmm, yyyy")} -{" "}
          {dateFormat(proj.to, "dd, mmm, yyyy")}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, proj._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4"> Projects </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Years</th>
              <th />
            </tr>
            {Project}
          </thead>
        </table>
      </div>
    );
  }
}

Project.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProject }
)(Project);
