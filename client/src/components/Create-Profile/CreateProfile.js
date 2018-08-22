import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import InputGroup from "../Common/InputGroup";
import SelectListGroup from "../Common/SelectListGroup";

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

  onSubmit(e) {
    e.preventDefault();
    console.log("submit");
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
            <div classname="col-md-8 m-auto">
              <h1 className="display-4 text-center"> Create Your Profile </h1>
              <p className="lead text-center">
                {" "}
                Let's get some information to make a profile that shines
              </p>
              <small className="d-block pb-3"> * = required fields </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile Handle"
                  name="Handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Create a unique handle for your profile url. Handle can stem from your full name, company name, or nickname"
                />
                <SelectListGroup
                  placeholder="Job Status"
                  name="Job Status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="What career do you hold?"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Please Provide Company Name (Your Own Or One You Work For)"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Please Provide A City or a combined set of city and state (eg. New York, NY)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="Skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
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
                  name="Website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Please Provide A Website (Your Own Or Company Specific)"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="Bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Please Provide a Bio"
                />
                <div className="mb-3">
                  <button
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(CreateProfile);
