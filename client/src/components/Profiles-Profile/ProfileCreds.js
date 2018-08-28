import React, { Component } from "react";
import dateFormat from "dateformat";

class ProfileCreds extends Component {
  render() {
    const {
      experience,
      education,
      honors,
      certifications,
      interests,
      volunteer,
      projects
    } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4> {exp.company}</h4>
        <p>
          {dateFormat(exp.from, "dd, mmm, yyyy")} -{" "}
          {dateFormat(exp.to, "dd, mmm, yyyy")}
        </p>
        <p>
          <strong> Position Held </strong>
          {exp.title}
        </p>
        <p>
          {exp.location == "" ? null : (
            <span>
              {" "}
              <strong> Location </strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description == "" ? null : (
            <span>
              {" "}
              <strong> Description </strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4> {edu.school}</h4>
        <p>
          {dateFormat(edu.from, "dd, mmm, yyyy")} -{" "}
          {dateFormat(edu.to, "dd, mmm, yyyy")}
        </p>
        <p>
          <strong> Degree</strong>
          {edu.degree}
        </p>
        <p>
          {edu.location == "" ? null : (
            <span>
              {" "}
              <strong> Location </strong>
              {edu.location}
            </span>
          )}
        </p>
        <p>
          {edu.major == "" ? null : (
            <span>
              {" "}
              <strong> Major </strong>
              {edu.major}
            </span>
          )}
        </p>
      </li>
    ));

    const volItems = volunteer.map(vol => (
      <li key={vol._id} className="list-group-item">
        <h4> {vol.nonprofit}</h4>
        <p>
          {dateFormat(vol.from, "dd, mmm, yyyy")} -{" "}
          {dateFormat(vol.to, "dd, mmm, yyyy")}
        </p>

        <p>
          {vol.descripton == "" ? null : (
            <span>
              {" "}
              <strong> Descripton </strong>
              {vol.descripton}
            </span>
          )}
        </p>
      </li>
    ));

    const projItems = projects.map((project, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {project}
      </div>
    ));

    const certItems = certifications.map((certifications, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {certifications}
      </div>
    ));

    const honorItems = honors.map((honors, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {honors}
      </div>
    ));

    const interestItems = interests.map((interests, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {interests}
      </div>
    ));

    return (
      <div>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center">Experience </h3>
            {expItems.length > 0 ? (
              <ul className="list-group"> {expItems}</ul>
            ) : (
              <p className="text-center"> No experience Listed</p>
            )}
          </div>

          <div className="col-md-6">
            <h3 className="text-center">Education </h3>
            {eduItems.length > 0 ? (
              <ul className="list-group"> {eduItems}</ul>
            ) : (
              <p className="text-center"> No Education Listed</p>
            )}
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center">Volunteering Experience </h3>
            {volItems.length > 0 ? (
              <ul className="list-group"> {volItems}</ul>
            ) : (
              <p className="text-center">No volunteering experience Listed</p>
            )}
          </div>

          <div className="col-md-6">
            <h3 className="text-center">Certifications</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {certItems}
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center">Projects</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {projItems}
            </div>
          </div>

          <div className="col-md-6">
            <h3 className="text-center">Awards</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {honorItems}
            </div>
          </div>
        </div>

        <hr />

        <div className="col-md-12">
          <h3 className="text-center">Interests</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {interestItems}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
