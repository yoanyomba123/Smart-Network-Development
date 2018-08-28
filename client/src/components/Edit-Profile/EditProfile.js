import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import InputGroup from "../Common/InputGroup";
import SelectListGroup from "../Common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profile.action";
import { isEmpty } from "../../utilities/validation/isEmpty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      certifications: "",
      portfolio: "",
      interests: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  // process new propertis
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // change skills array into comment separeted value
      const skillsCSV = profile.skills.join(",");

      const certificationsCSV = profile.certifications.join(",");

      const portfolioCSV = profile.portfolio.join(",");

      const interestsCSV = profile.interests.join(",");

      // if profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";

      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";

      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : {};
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.linkedin
        : "";
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      // set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        portfolio: portfolioCSV,
        interests: interestsCSV,
        certifications: certificationsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedIn,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedIn,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="Twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="Facebok"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="LinkedIn"
            icon="fab fa-linkedin"
            value={this.state.linkedIn}
            onChange={this.onChange}
            errors={errors.linkedIn}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="Youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="Instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
        </div>
      );
    }
    // create options for slect status
    const options = [
      {
        label: "* Select Professional Status",
        value: 0
      },
      {
        label: "Quantitative Researcher",
        value: "Quantitative Researcher"
      },
      {
        label: "Quantitative Developer",
        value: "Quantitative Developer"
      },
      {
        label: "Quantitative Analyst",
        value: "Quantitative Analyst"
      },
      {
        label: "Trader",
        value: "Trader"
      },
      {
        label: "Algorithmic Trader",
        value: "Algorithmic Trader"
      },
      {
        label: "Quantitative Trader",
        value: "Quantitative Trader"
      },
      {
        label: "Junior Developer",
        value: "Junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "Manager",
        value: "Manager"
      },
      {
        label: "Student/Self Taught",
        value: "Student/Self Taught"
      },
      {
        label: "Instructor",
        value: "Instructor"
      },
      {
        label: "Intern",
        value: "Intern"
      },
      {
        label: "Other",
        value: "Other"
      }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center"> Edit Profile </h1>
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <small className="d-block pb-3"> * = required fields </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Create a unique handle for your profile url. Handle can stem from your full name, company name, or nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="What career do you hold?"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Please Provide Company Name (Your Own Or One You Work For)"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Please Provide A City or a combined set of city and state (eg. New York, NY)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please Provide Skills As Comma Separated Values (eg. C, C++, Java, Matlab)"
                />
                <TextFieldGroup
                  placeholder=" Certifications"
                  name="certifications"
                  value={this.state.certifications}
                  onChange={this.onChange}
                  error={errors.certifications}
                  info="Please Provide Certifications As Comma Separated Values (eg. CFA Level I, Series 7, etc ...)"
                />
                <TextFieldGroup
                  placeholder=" Interest"
                  name="interests"
                  value={this.state.interests}
                  onChange={this.onChange}
                  error={errors.interests}
                  info="Please Provide Skills As Comma Separated Values (eg. C, C++, Java, Matlab)"
                />
                <TextFieldGroup
                  placeholder="Portfolio"
                  name="portfolio"
                  value={this.state.portfolio}
                  onChange={this.onChange}
                  error={errors.portfolio}
                  info="Please Provide Skills As Comma Separated Values (eg. C, C++, Java, Matlab)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Please provide a your github username"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Please Provide A Website (Your Own Or Company Specific)"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Please Provide a Bio"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
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

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
