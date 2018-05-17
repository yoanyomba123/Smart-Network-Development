/*jshint esversion: 6 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light navbar-clear mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h3>Fin-Social</h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Profiles
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Markets">
                  Markets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Econonmy">
                  Economy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Derivatives">
                  Derivative Securities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Opinions">
                  Opinions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/FundFilings">
                  Fund Filings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Crypto">
                  Cryptocurrencies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
