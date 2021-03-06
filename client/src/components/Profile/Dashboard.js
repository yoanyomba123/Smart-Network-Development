import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile.action";
import Spinner from "../Common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Volunteer from "./Volunteer";
import Project from "./Project";
import Honors from "./Honors";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            {" "}
            <p className="lead text-muted">
              {" "}
              Welcome <Link to={`/profile/${profile.handle}`}>
                {user.name}
              </Link>{" "}
            </p>
            <ProfileActions />
            <hr />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <br />
            <br />
            <Volunteer volunteer={profile.volunteer} />
            <Project project={profile.projects} />
            <Honors honors={profile.honors} />
            {/* TODO : exp , education , .... */}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              {" "}
              Delete My Account
            </button>
          </div>
        );
      } else {
        // user is logged in but lack profile
        dashboardContent = (
          <div className="container text-center">
            <p className="lead text-muted"> Welcome {user.name} </p>
            <p> You have not yet Created a profile, please make one </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center"> My Profile </h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
