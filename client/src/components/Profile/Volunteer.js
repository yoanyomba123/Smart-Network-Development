import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import dateFormat from "dateformat";
import { deleteVolunteer } from "../../actions/profile.action";

class Volunteer extends Component {
  onDeleteClick(id) {
    this.props.deleteVolunteer(id);
  }
  render() {
    const volunteer = this.props.volunteer.map(vol => (
      <tr key={vol._id}>
        <td>{vol.nonprofit}</td>
        <td>
          {dateFormat(vol.from, "dd, mmm, yyyy")} -{" "}
          {dateFormat(vol.to, "dd, mmm, yyyy")}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, vol._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4"> Volunteering Experience </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Nonprofit</th>
              <th>Years</th>
              <th />
            </tr>
            {Volunteer}
          </thead>
        </table>
      </div>
    );
  }
}

Volunteer.propTypes = {
  deleteVolunteer: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteVolunteer }
)(Volunteer);
