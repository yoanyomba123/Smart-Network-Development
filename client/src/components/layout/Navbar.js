/*jshint esversion: 6 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth.action";
import { clearCurrentProfile } from "../../actions/profile.action";
class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/NewsFeed">
            News Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Connections">
            Connections
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/MyPorfolio">
            My Porfolio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="Gravatar Connected To This Email"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Market
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item">
              <Link className="nav-link" to="/Markets">
                Markets News
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/AnalysteBlogs">
                Analyst Blogs
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/IndustryOutlook">
                Industry Outlook
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/InvestmentIdeas">
                Investment Ideas
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/EarningsTrends">
                Earnings Trends
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/EarningsPreview">
                Earnings Preview
              </Link>
            </li>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Economy
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="nav-item">
              <Link className="nav-link" to="/Economy">
                Economy Outlook
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="nav-item">
              <Link className="nav-link" to="/EcononmyInsights">
                Economic Insights
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="nav-item">
              <Link className="nav-link" to="/CorporateSummary">
                Corporate Summary
              </Link>
            </li>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Derivative Securities
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item">
              <Link className="nav-link" to="/StructuredProducts">
                Structured Producs
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/CurrencyDerivatives">
                Currency Derivatives
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/EquityDerivatives">
                Equity Derivatives
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/InterestRateDerivatives">
                Interest Rate Derivatives
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/CreditDerivatives">
                Credit Derivatives
              </Link>
            </li>
            <div className="dropdown-divider" />
            <li className="dropdown-item">
              <Link className="nav-link" to="/CommodityDerivatives">
                Commodity Derivatives
              </Link>
            </li>
          </div>
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
            Log In
          </Link>
        </li>
      </ul>
    );

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
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
