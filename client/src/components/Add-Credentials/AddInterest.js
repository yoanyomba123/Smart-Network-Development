import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addInterest } from "../../actions/profile.action";

class AddInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: "",
      errors: {}
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
    const interestData = {
      interests: this.state.interests
    };

    this.props.addInterest(interestData, this.props.history);
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
      <div className="add-interest">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center"> Interests </h1>
              <p className="lead text-center"> Add Interests </p>
              <small className="d-block pb-3">* = Required Fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Interests"
                  name="interest"
                  value={this.state.interests}
                  onChange={this.onChange}
                  error={errors.interests}
                  info="Please Provide Interests As Comma Separated Values (eg. Coding, Running, etc..)"
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

AddInterest.propTypes = {
  addInterest: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  profile: state.profile;
  errors: state.errors;
};

export default connect(
  mapStateToProps,
  { addInterest }
)(withRouter(AddInterest));
