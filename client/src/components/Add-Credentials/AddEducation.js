import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profile.action";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      location: "",
      from: "",
      to: "",
      current: false,
      major: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      school: this.state.school,
      degree: this.state.degree,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      major: this.state.major
    };

    this.props.addEducation(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center"> Add Education </h1>
              <p className="lead text-center"> Add Schools Attended </p>
              <small className="d-block pb-3">* = Required Fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date </h6>
                <TextFieldGroup
                  placeholder="from"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <h6>To Date </h6>
                <TextFieldGroup
                  placeholder="to"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current School Of Attendance
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Major"
                  name="major"
                  value={this.state.major}
                  onChange={this.onChange}
                  error={errors.major}
                  info="Provide insights on the major"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  profile: state.profile;
  errors: state.errors;
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
