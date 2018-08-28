import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import dateFormat from "dateformat";
import { deleteHonors } from "../../actions/profile.action";

class Honors extends Component {
  onDeleteClick(id) {
    this.props.deleteHonors(id);
  }
  render() {
    const Honors = this.props.honors.map(proj => (
      <tr key={proj._id}>
        <td>{proj.award}</td>
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
        <h4 className="mb-4"> Honors </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Honors</th>
              <th>Years</th>
              <th />
            </tr>
            {Honors}
          </thead>
        </table>
      </div>
    );
  }
}

Honors.propTypes = {
  deleteHonors: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteHonors }
)(Honors);
