/*jshint esversion: 6 */

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Fin-Social</h1>
                <p className="lead"> Mind In Hand</p>
                <hr />
                <Link className="btn btn-lg btn-info mr-2" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-lg btn-light" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}