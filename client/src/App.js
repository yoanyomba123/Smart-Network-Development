import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/Authentication/register";
import Login from "./components/Authentication/login";
import RssFeeds from "./components/Information-Feeds/markets";
// provides app with the store
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth.action";
import "./App.css";
import Dashboard from "./components/Profile/Dashboard";
import CreateProfile from "./components/Create-Profile/CreateProfile";

import { clearCurrentProfile } from "./actions/profile.action";

import PrivateRoute from "./components/Common/privateRoute";
//check for token presence
if (localStorage.jwtToken) {
  // set Auth token to header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticate
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout User
    store.dispatch(logoutUser());
    // clear our profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="bg-light">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/Markets" component={RssFeeds} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Route exact path="/Economy" component={RssFeeds} />
              <Route exact path="/StructuredProducts" component={RssFeeds} />
              <Route exact path="/CurrencyDerivatives" component={RssFeeds} />
              <Route exact path="/EquityDerivatives" component={RssFeeds} />
              <Route
                exact
                path="/InterestRateDerivatives"
                component={RssFeeds}
              />
              <Route exact path="/CreditDerivatives" component={RssFeeds} />
              <Route exact path="/CommodityDerivatives" component={RssFeeds} />
              <Route exact path="/Opinions" component={RssFeeds} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
